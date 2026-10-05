import { Arrow } from '../components/Layout'
import { Furniture } from '../components/Furniture'
import { alternative, finalPrice, original } from '../data/demo'
import { money } from '../lib/format'

export function HomePage({ offerDiscount = alternative.discount }: { offerDiscount?: number }) {
  const offeredPrice = finalPrice(alternative, offerDiscount)
  return <>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">Thoughtful choices. Everyday budgets.</p><h1>A better choice.<br />Within reach.</h1><p className="hero-description">Emma needs a storage cabinet. A comparable option has a lower modelled footprint, but its regular price is above her budget. Prisväxeln shows how an IKEA offer could bring that option within reach.</p><a className="button" href="#/emma">Explore Emma’s example <Arrow /></a><p className="hero-footnote">One planned purchase. A different possibility.</p></div>
      <figure className="hero-figure"><Furniture room /><figcaption><div><span className="caption-label">Meet the alternative</span><strong>Considered storage</strong><span>Same storage needs. A more accessible price.</span></div><div className="figure-price"><strong>{money(finalPrice(alternative, offerDiscount))}</strong><span>Illustrative offer</span></div></figcaption></figure>
    </section>
    <div className="context-line"><span>Designed around Emma, 32</span><span>Inspired by IKEA Challenge 1</span><span>Built for everyday decisions</span></div>
    <section className="section split-section" id="idea" tabIndex={-1}>
      <div><p className="eyebrow">The starting point</p><h2>Good intentions.<br />A real-life budget.</h2></div>
      <div className="reading-copy"><p>Emma is planning a home for her young family. She wants to make more sustainable choices, but the household budget comes first.</p><p>Picture her comparing two cabinets that meet the same storage needs. The option with a lower modelled footprint costs 999 kr. Her budget is 900 kr, so the alternative is just out of reach. Her original choice costs 899 kr.</p><p>Prisväxeln explores a third possibility. IKEA’s current example offer brings the comparable option to {money(offeredPrice)}. {offeredPrice <= 900 ? `It fits Emma’s budget and costs ${money(899 - offeredPrice)} less than her original choice.` : 'It remains above Emma’s example budget.'} She can compare the products and decide for herself.</p><a className="text-link" href="#/project">Get to know the project <Arrow /></a></div>
    </section>
    <section className="section" aria-labelledby="how-heading"><div className="section-heading"><div><p className="eyebrow">How Prisväxeln works</p><h2 id="how-heading">A small switch. A clear reason.</h2></div><p>A customer-facing comparison, supported by a carefully scoped offer.</p></div>
      <div className="steps-grid">{[
        ['01', 'IKEA reviews a product pair', 'The category team checks that the products meet the same practical needs, then sets one offer for all customers.'],
        ['02', 'Emma checks what fits', 'She enters her space requirements and budget, sees suitable options and compares the final prices.'],
        ['03', 'IKEA considers total demand', 'The team explores switches and additional purchases against example climate, material and campaign limits.'],
      ].map(([step, title, copy]) => <article className="step" key={step}><span className="step-number">{step}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="section example-section"><div><p className="eyebrow">One example, made tangible</p><h2>Fits her home.<br />And her {money(900)} budget.</h2><p>Two doors. Two adjustable shelves. The same dimensions. Emma can see the trade-offs before making her choice.</p><a className="text-link" href="#/emma">Compare the two options <Arrow /></a></div><div className="price-comparison"><div><span>Original choice</span><strong>{money(original.price)}</strong></div><div><span>Alternative, before the offer</span><strong>{money(alternative.price)}</strong></div><div className="highlight-row"><span>Alternative, with the current offer</span><strong>{money(offeredPrice)}</strong></div><p>Fictional products and prices, used to explain the concept.</p></div></section>
    <section className="section split-section"><div><p className="eyebrow">Affordability with boundaries</p><h2>Lower per product<br />is only half the story.</h2></div><div className="reading-copy"><p>Lower prices can mean more purchases. So a lower footprint per cabinet does not automatically mean a lower footprint overall.</p><p>The IKEA view makes this tension visible: compare two demand scenarios against the same climate, material and campaign budget limits.</p><a className="text-link" href="#/ikea">See the IKEA perspective <Arrow /></a></div></section>
    <section className="closing-section"><p className="eyebrow">Take a closer look</p><h2>See the choice through Emma’s eyes.</h2><a className="button" href="#/emma">Open the prototype <Arrow /></a><p className="muted">A visual concept with a simple, working comparison.</p></section>
  </>
}
