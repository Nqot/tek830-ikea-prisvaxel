import { useRef, useState, type FormEvent } from 'react'
import { DemoHeader } from '../components/Layout'
import { ProductCard } from '../components/ProductCard'
import { exampleNeeds, finalPrice, meetsProductNeeds, original, products } from '../data/demo'
import { money, priceDifference } from '../lib/format'

interface EmmaPageProps {
  budget: string
  onBudgetChange: (value: string) => void
  maxWidth: string
  onMaxWidthChange: (value: string) => void
  minimumShelves: string
  onMinimumShelvesChange: (value: string) => void
  offerDiscount: number
  selected: string | null
  onSelect: (id: string | null) => void
}

export function EmmaPage({
  budget, onBudgetChange, maxWidth, onMaxWidthChange,
  minimumShelves, onMinimumShelvesChange, offerDiscount, selected, onSelect,
}: EmmaPageProps) {
  const summaryRef = useRef<HTMLElement>(null)
  const resultsRef = useRef<HTMLHeadingElement>(null)
  const [hasSearched, setHasSearched] = useState(true)
  const amount = budget.trim() === '' ? NaN : Number(budget)
  const validBudget = Number.isFinite(amount) && amount >= 0 && amount <= 100000 && Number.isInteger(amount)
  const resultsReady = hasSearched && validBudget
  const matchingProducts = products.filter((product) => meetsProductNeeds(product, Number(maxWidth), Number(minimumShelves)))
  const affordableCount = matchingProducts.filter((product) => finalPrice(product, offerDiscount) <= amount).length
  const selectedProduct = resultsReady
    ? matchingProducts.find((product) => product.id === selected && finalPrice(product, offerDiscount) <= amount)
    : undefined

  function choose(id: string) {
    onSelect(id)
    requestAnimationFrame(() => summaryRef.current?.focus())
  }

  function updateCriteria(update: () => void) {
    update()
    onSelect(null)
    setHasSearched(false)
  }

  function findMatches(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (validBudget) {
      setHasSearched(true)
      requestAnimationFrame(() => resultsRef.current?.focus())
    }
  }

  function resetNeeds() {
    onBudgetChange(exampleNeeds.budget)
    onMaxWidthChange(exampleNeeds.maxWidth)
    onMinimumShelvesChange(exampleNeeds.minimumShelves)
    onSelect(null)
    setHasSearched(true)
  }

  const selectedPrice = selectedProduct ? finalPrice(selectedProduct, offerDiscount) : 0
  const climateDifference = selectedProduct ? original.climateKg - selectedProduct.climateKg : 0
  const noMatches = resultsReady && matchingProducts.length === 0
  const resultsHeading = !resultsReady ? 'Your matching options'
    : noMatches ? 'No match for these requirements.'
    : matchingProducts.length === 2 ? 'Same need. Two options.' : 'An option for your needs.'
  const status = !validBudget ? 'Enter a whole-number budget between 0 and 100,000 kr.'
    : !hasSearched ? 'Your requirements have changed. Select “Find matching options” to see your results.'
    : noMatches ? 'Neither example cabinet meets your requirements. Both are 80 cm wide and have two adjustable shelves. Keep the requirements you need; this demo has no other products.'
    : affordableCount === 0 ? 'Both cabinets meet your practical requirements, but neither fits this budget. No suitable purchase is available in this example.'
    : `${matchingProducts.length} products meet your practical requirements. ${affordableCount} ${affordableCount === 1 ? 'fits' : 'fit'} your budget.`

  return <>
    <DemoHeader active="emma" />
    <section className="page-intro">
      <p className="eyebrow">Emma’s example · One product category</p>
      <h1>A choice that fits.</h1>
      <p>Emma needs one storage cabinet. Start with her example requirements, or change them to compare what fits your space and budget.</p>
    </section>
    <div className="customer-steps" aria-label="The customer journey">
      <span><b>01</b> Your needs</span><span><b>02</b> Matching options</span><span><b>03</b> Your choice</span>
    </div>
    <form className="needs-panel needs-form" onSubmit={findMatches} noValidate>
      <div className="needs-fields">
        <div className="category-scope">
          <span className="field-label">Product category</span>
          <div className="scope-value"><span>Storage cabinet</span><span className="tag">One category in this demo</span></div>
          <p className="field-help">A prepared pair: same dimensions, two doors and two adjustable shelves. The starting option is an example, not a product taken from your basket.</p>
        </div>
        <div className="criteria-grid">
          <div className="form-field">
            <label htmlFor="max-width">Maximum width</label>
            <select id="max-width" value={maxWidth} onChange={(event) => updateCriteria(() => onMaxWidthChange(event.target.value))}>
              <option value="60">60 cm</option><option value="80">80 cm</option><option value="100">100 cm</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="shelves">Minimum adjustable shelves</label>
            <select id="shelves" value={minimumShelves} onChange={(event) => updateCriteria(() => onMinimumShelvesChange(event.target.value))}>
              <option value="1">1 shelf</option><option value="2">2 shelves</option><option value="3">3 shelves</option>
            </select>
          </div>
          <div className="form-field budget-field">
            <label htmlFor="budget">Maximum budget (SEK)</label>
            <input id="budget" type="number" inputMode="numeric" min="0" max="100000" step="1" required value={budget}
              aria-invalid={!validBudget} aria-describedby={validBudget ? 'budget-help' : 'budget-help budget-error'}
              onChange={(event) => updateCriteria(() => onBudgetChange(event.target.value))} />
            <p className="field-help" id="budget-help">Your budget checks affordability. It does not set your price.</p>
            {!validBudget && <p className="field-error" id="budget-error">Enter a whole number from 0 to 100,000.</p>}
          </div>
        </div>
      </div>
      <div className="needs-action">
        <button className="button" type="submit" disabled={!validBudget}>Find matching options <span aria-hidden="true">→</span></button>
        <button className="text-button" type="button" onClick={resetNeeds}>Reset to Emma’s needs</button>
        <span className="field-help">Your entries stay in this browser session.</span>
      </div>
    </form>

    <section className="matching-section" aria-labelledby="matches-heading">
      <div className="comparison-intro">
        <div><p className="eyebrow">02 · Your results</p><h2 ref={resultsRef} tabIndex={-1} id="matches-heading">{resultsHeading}</h2></div>
        <a href="#/method?section=data">How we compare</a>
      </div>
      <p className="budget-status" role="status">{status}</p>
      {resultsReady && !noMatches && <div className="product-grid">
        {matchingProducts.map((product) => <ProductCard key={product.id} product={product} budget={amount}
          discount={offerDiscount} selected={selected === product.id} onSelect={() => choose(product.id)} />)}
      </div>}
    </section>
    <div className="comparison-note">
      <p><strong>Why this alternative?</strong> It has lower example climate and virgin material figures for the same assumed useful life.
        {' '}{offerDiscount > 0 ? `The ${money(offerDiscount)} discount is set in the IKEA view and is the same for everyone.` : 'No discount is currently selected in the IKEA view. Both products show their regular price.'}</p>
      <p>Both products and their environmental values are fictional. Lower climate impact alone does not establish overall sustainability. <a href="#/method?section=sustainability">What we assess.</a></p>
    </div>

    <section ref={summaryRef} tabIndex={-1} className="selection-summary" aria-labelledby="selection-heading">
      <div>
        <p className="eyebrow">03 · Your choice</p>
        <h2 id="selection-heading">{selectedProduct ? 'Your example choice.' : 'Your decision, at your pace.'}</h2>
        <p>{selectedProduct ? 'No order has been placed. This selection is not sent to IKEA and does not change the campaign scenarios.' : 'Choose a suitable option above to see its price and comparison together. You can also leave without choosing.'}</p>
      </div>
      <div>{selectedProduct ? <>
        <h3>{selectedProduct.name}</h3>
        <dl className="spec-list">
          <div><dt>Your total · 1 cabinet</dt><dd>{money(selectedPrice)}</dd></div>
          <div><dt>Remaining budget</dt><dd>{money(amount - selectedPrice)}</dd></div>
          <div><dt>Compared with the starting option</dt><dd>{priceDifference(selectedPrice, original.price)}</dd></div>
          <div><dt>Modelled climate difference</dt><dd>{climateDifference === 0 ? 'No difference in this example' : `${Math.abs(climateDifference)} kg CO₂e ${climateDifference > 0 ? 'lower' : 'higher'}`}</dd></div>
        </dl>
        <button className="text-button" onClick={() => onSelect(null)}>Clear my selection</button>
      </> : <div className="empty-selection"><span>One need. One product pair.</span><p>Your choice will appear here.</p></div>}</div>
    </section>
    <section className="section compact-section">
      <h2>Where does the offer come from?</h2>
      <p>IKEA would first review comparable products, then test possible offers against cost and environmental limits. Try changing the offer in the IKEA view and return here to see the same price.</p>
      <a className="text-link" href="#/ikea">Explore the IKEA scenario ↗</a>
    </section>
  </>
}
