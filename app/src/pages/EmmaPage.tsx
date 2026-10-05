import { useRef, useState, type FormEvent } from 'react'
import { DemoHeader } from '../components/Layout'
import { ProductCard } from '../components/ProductCard'
import { finalPrice, meetsProductNeeds, original, products } from '../data/demo'
import { money } from '../lib/format'

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

export function EmmaPage({ budget, onBudgetChange, maxWidth, onMaxWidthChange, minimumShelves, onMinimumShelvesChange, offerDiscount, selected, onSelect }: EmmaPageProps) {
  const summaryRef = useRef<HTMLElement>(null)
  const [hasSearched, setHasSearched] = useState(true)
  const amount = budget.trim() === '' ? NaN : Number(budget)
  const validBudget = Number.isFinite(amount) && amount >= 0 && amount <= 100000 && Number.isInteger(amount)
  const matchingProducts = products.filter((product) => meetsProductNeeds(product, Number(maxWidth), Number(minimumShelves)))
  const fitsNeed = matchingProducts.length > 0
  const affordableCount = matchingProducts.filter((product) => finalPrice(product, offerDiscount) <= amount).length
  const selectedProduct = products.find((product) => product.id === selected)
  const choose = (id: string) => {
    onSelect(id)
    requestAnimationFrame(() => { summaryRef.current?.focus(); summaryRef.current?.scrollIntoView({ block: 'center' }) })
  }
  const updateCriteria = (update: () => void) => {
    update()
    onSelect(null)
    setHasSearched(false)
  }
  const findMatches = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validBudget) setHasSearched(true)
  }
  const selectedPrice = selectedProduct ? finalPrice(selectedProduct, offerDiscount) : 0
  const climateDifference = selectedProduct ? original.climateKg - selectedProduct.climateKg : 0

  return <>
    <DemoHeader active="emma" />
    <section className="page-intro"><p className="eyebrow">Emma’s example · One product category</p><h1>A choice that fits.</h1><p>Emma is looking for a storage cabinet. She sets her practical requirements and budget, then compares the options that fit.</p></section>
    <div className="customer-steps" aria-label="The customer journey"><span><b>01</b> Your needs</span><span><b>02</b> Matching options</span><span><b>03</b> Your choice</span></div>
    <form className="needs-panel needs-form" onSubmit={findMatches}>
      <div className="needs-fields">
        <div className="category-scope"><span className="field-label">Product category</span><div className="scope-value"><span>Storage cabinet</span><span className="tag">Only category in this demo</span></div><p className="field-help">IKEA has prepared one example product pair for this category.</p></div>
        <div className="criteria-grid">
          <div className="form-field"><label htmlFor="max-width">Maximum width</label><select id="max-width" value={maxWidth} onChange={(event) => updateCriteria(() => onMaxWidthChange(event.target.value))}><option value="60">60 cm</option><option value="80">80 cm</option><option value="100">100 cm</option></select></div>
          <div className="form-field"><label htmlFor="shelves">At least this many adjustable shelves</label><select id="shelves" value={minimumShelves} onChange={(event) => updateCriteria(() => onMinimumShelvesChange(event.target.value))}><option value="1">1 shelf</option><option value="2">2 shelves</option><option value="3">3 shelves</option></select></div>
          <div className="form-field budget-field"><label htmlFor="budget">Maximum budget (SEK)</label><input id="budget" type="number" min="0" max="100000" step="1" value={budget} aria-invalid={!validBudget} aria-describedby="budget-help" onChange={(event) => updateCriteria(() => onBudgetChange(event.target.value))} /><p className="field-help" id="budget-help">The same offer applies to everyone. Your budget only filters the results.</p></div>
        </div>
      </div>
      <div className="needs-action"><button className="button" type="submit" disabled={!validBudget}>Find matching options <span aria-hidden="true">→</span></button><span className="field-help">Your needs stay in this demo.</span></div>
    </form>
    <section className="matching-section" aria-labelledby="matches-heading">
      <div className="comparison-intro"><div><p className="eyebrow">02 · Your results</p><h2 id="matches-heading">{fitsNeed ? 'Same need. Two options.' : 'No match for these requirements.'}</h2></div><a href="#/method">How we compare</a></div>
      <div className="budget-status" aria-live="polite" aria-atomic="true">{!validBudget ? 'Enter a valid budget to check which options fit.' : !hasSearched ? 'Update your criteria and select “Find matching options” to refresh the results.' : !fitsNeed ? 'The example cabinet is 80 cm wide and has two adjustable shelves. Try a maximum width of 80 cm or more and ask for no more than two shelves.' : affordableCount === 0 ? 'Both products fit your practical requirements, but neither fits this budget. The offer may not close every price gap.' : `${matchingProducts.length} products meet your practical requirements. ${affordableCount} ${affordableCount === 1 ? 'fits' : 'fit'} your budget.`}</div>
      {hasSearched && fitsNeed && <div className="product-grid">{matchingProducts.map((product) => <ProductCard key={product.id} product={product} budget={validBudget ? amount : NaN} discount={offerDiscount} selected={selected === product.id} onSelect={() => choose(product.id)} />)}</div>}
    </section>
    <div className="comparison-note"><p><strong>How is the option chosen?</strong> In a real pilot, IKEA would review products against shared requirements before publishing the offer. This demo has one fictional product pair. The prepared {money(offerDiscount)} offer is the same for everyone and does not change based on your budget.</p><p>Products and environmental values are illustrative. Both are assumed to meet the same requirements and have the same useful life. <a href="#/method">Read the assumptions.</a></p></div>
    <section ref={summaryRef} tabIndex={-1} className="selection-summary" aria-labelledby="selection-heading"><div><p className="eyebrow">03 · Your choice</p><h2 id="selection-heading">{selectedProduct ? 'A little more clarity.' : 'Your decision, at your pace.'}</h2><p>{selectedProduct ? 'Your example selection is ready. No order has been placed.' : 'Choose an option above to see the price and comparison together.'}</p></div><div aria-live="polite">{selectedProduct ? <><h3>{selectedProduct.name}</h3><dl className="spec-list"><div><dt>Your total · 1 cabinet</dt><dd>{money(selectedPrice)}</dd></div><div><dt>Remaining budget</dt><dd>{money(amount - selectedPrice)}</dd></div><div><dt>Compared with the original choice</dt><dd>{selectedProduct.id === 'original' ? 'Your original choice' : `${money(original.price - selectedPrice)} less`}</dd></div><div><dt>Modelled climate difference</dt><dd>{climateDifference === 0 ? 'No difference in this example' : `${Math.abs(climateDifference)} kg CO₂e ${climateDifference > 0 ? 'lower' : 'higher'}`}</dd></div></dl><button className="text-button" onClick={() => onSelect(null)}>Clear my selection</button></> : <div className="empty-selection"><span>One need. One product pair.</span><p>Your choice will appear here.</p></div>}</div></section>
    <section className="section compact-section"><h2>What happens before you search?</h2><p>IKEA reviews a product pair and sets one offer in advance. The IKEA view then explores how greater demand could affect total campaign impact.</p><a className="text-link" href="#/ikea">View the IKEA example ↗</a></section>
  </>
}
