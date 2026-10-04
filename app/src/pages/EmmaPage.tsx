import { useRef } from 'react'
import { DemoHeader } from '../components/Layout'
import { ProductCard } from '../components/ProductCard'
import { finalPrice, original, products } from '../data/demo'
import { money } from '../lib/format'

interface EmmaPageProps {
  budget: string
  onBudgetChange: (value: string) => void
  selected: string | null
  onSelect: (id: string | null) => void
}

export function EmmaPage({ budget, onBudgetChange, selected, onSelect }: EmmaPageProps) {
  const summaryRef = useRef<HTMLElement>(null)
  const amount = budget.trim() === '' ? NaN : Number(budget)
  const validBudget = Number.isFinite(amount) && amount >= 0 && amount <= 100000 && Number.isInteger(amount)
  const selectedProduct = products.find((product) => product.id === selected)
  const choose = (id: string) => {
    onSelect(id)
    requestAnimationFrame(() => { summaryRef.current?.focus(); summaryRef.current?.scrollIntoView({ block: 'center' }) })
  }

  return <>
    <DemoHeader active="emma" />
    <section className="page-intro"><p className="eyebrow">Emma’s example · Storage for a family home</p><h1>A choice that fits.</h1><p>You’ve found a cabinet for your home. Here’s another way to meet the same need, with a price that fits your budget.</p></section>
    <div className="customer-steps" aria-label="The customer journey"><span><b>01</b> Your needs</span><span><b>02</b> Compare options</span><span><b>03</b> Your choice</span></div>
    <section className="needs-panel" aria-labelledby="needs-heading"><div><h2 id="needs-heading">A place for the everyday.</h2><p>One cabinet · Up to 80 cm wide · Two adjustable shelves</p><span className="muted">Fixed needs for this example. Both products meet them.</span></div><div className="budget-field"><label htmlFor="budget">Your maximum budget (SEK)</label><input id="budget" type="number" min="0" max="100000" step="1" value={budget} aria-invalid={!validBudget} aria-describedby="budget-help" onChange={(event) => { onBudgetChange(event.target.value); onSelect(null) }} /><p id="budget-help">{validBudget ? 'Try 850 kr to see what fits.' : 'Enter a whole amount from 0 to 100,000 kr.'}</p></div></section>
    <div className="comparison-intro"><h2>Same need. Two options.</h2><a href="#/method">How we compare</a></div>
    <div role="status" className="budget-status">{validBudget && amount < 849 ? 'Neither option fits this budget. You can keep exploring without selecting a product.' : !validBudget ? 'Add a valid budget to select an option.' : `${products.filter((product) => finalPrice(product) <= amount).length} of 2 options fit your budget.`}</div>
    <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} budget={validBudget ? amount : NaN} selected={selected === product.id} onSelect={() => choose(product.id)} />)}</div>
    <div className="comparison-note"><p><strong>Why is there a 150 kr offer?</strong> In this concept, IKEA allocates a limited campaign budget to make this alternative more affordable. The same product offer applies to everyone; your budget does not change its price.</p><p>All products and environmental values are illustrative. The comparison assumes the same useful life and delivery conditions. <a href="#/method">Read the assumptions.</a></p></div>
    <section ref={summaryRef} tabIndex={-1} className="selection-summary" aria-labelledby="selection-heading"><div><p className="eyebrow">03 · Your choice</p><h2 id="selection-heading">{selectedProduct ? 'A little more clarity.' : 'Your decision, at your pace.'}</h2><p>{selectedProduct ? 'Your example selection is ready. No order has been placed.' : 'Choose an option above to see the price and comparison together.'}</p></div><div aria-live="polite">{selectedProduct ? <><h3>{selectedProduct.name}</h3><dl className="spec-list"><div><dt>Your total · 1 cabinet</dt><dd>{money(finalPrice(selectedProduct))}</dd></div><div><dt>Remaining budget</dt><dd>{money(amount - finalPrice(selectedProduct))}</dd></div><div><dt>Compared with the original price</dt><dd>{selectedProduct.id === 'original' ? 'Unchanged' : `${money(original.price - finalPrice(selectedProduct))} less`}</dd></div><div><dt>Modelled climate difference</dt><dd>{original.climateKg - selectedProduct.climateKg} kg CO₂e lower</dd></div></dl><button className="text-button" onClick={() => onSelect(null)}>Clear my selection</button></> : <div className="empty-selection"><span>One need. One product.</span><p>Your choice will appear here.</p></div>}</div></section>
    <section className="section compact-section"><h2>What happens behind the offer?</h2><p>IKEA also needs to consider the campaign’s total impact. More purchases can change the result.</p><a className="text-link" href="#/ikea">View the IKEA example ↗</a></section>
  </>
}
