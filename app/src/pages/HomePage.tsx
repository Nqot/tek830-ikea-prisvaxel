import { Arrow } from '../components/Layout'
import { Furniture } from '../components/Furniture'
import { alternative, finalPrice, original } from '../data/demo'
import { money } from '../lib/format'

export function HomePage() {
  return <>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">Thoughtful choices. Everyday budgets.</p><h1>A better choice.<br />Within reach.</h1><p className="hero-description">The lower-impact option should fit your budget, too. Prisväxeln brings a considered alternative within reach of the purchase you already planned.</p><a className="button" href="#/emma">Explore Emma’s example <Arrow /></a><p className="hero-footnote">One planned purchase. A different possibility.</p></div>
      <figure className="hero-figure"><Furniture room /><figcaption><div><span className="caption-label">Meet the alternative</span><strong>Considered storage</strong><span>Same storage needs. A more accessible price.</span></div><div className="figure-price"><strong>{money(finalPrice(alternative))}</strong><span>Illustrative offer</span></div></figcaption></figure>
    </section>
    <div className="context-line"><span>Designed around Emma, 32</span><span>Inspired by IKEA Challenge 1</span><span>Built for everyday decisions</span></div>
    <section className="section split-section" id="idea" tabIndex={-1}>
      <div><p className="eyebrow">The starting point</p><h2>Good intentions.<br />A real-life budget.</h2></div>
      <div className="reading-copy"><p>Emma is planning a home for her young family. She wants to make more sustainable choices, but the household budget comes first.</p><p>Our example starts with a storage cabinet she already needs. A comparable option has a lower modelled footprint, but its regular price is too high. A targeted offer closes that gap.</p><a className="text-link" href="#/project">Get to know the project <Arrow /></a></div>
    </section>
    <section className="section" aria-labelledby="how-heading"><div className="section-heading"><div><p className="eyebrow">How Prisväxeln works</p><h2 id="how-heading">A small switch. A clear reason.</h2></div><p>A customer-facing comparison, supported by a carefully scoped offer.</p></div>
      <div className="steps-grid">{[
        ['01', 'Start with a real need', 'A planned product, a household budget and the practical things that matter.'],
        ['02', 'Make the alternative affordable', 'IKEA sets a product offer. Emma compares the final price and what she gets.'],
        ['03', 'Keep the whole picture in view', 'IKEA considers total emissions and materials, including any extra purchases.'],
      ].map(([step, title, copy]) => <article className="step" key={step}><span className="step-number">{step}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="section example-section"><div><p className="eyebrow">One example, made tangible</p><h2>Fits her home.<br />And her {money(900)} budget.</h2><p>Two doors. Two adjustable shelves. The same dimensions. Emma can see the trade-offs before making her choice.</p><a className="text-link" href="#/emma">Compare the two options <Arrow /></a></div><div className="price-comparison"><div><span>Original choice</span><strong>{money(original.price)}</strong></div><div><span>Alternative, before the offer</span><strong>{money(alternative.price)}</strong></div><div className="highlight-row"><span>Alternative, with Prisväxeln</span><strong>{money(finalPrice(alternative))}</strong></div><p>Fictional products and prices, used to explain the concept.</p></div></section>
    <section className="section split-section"><div><p className="eyebrow">Affordability with boundaries</p><h2>Lower per product<br />is only half the story.</h2></div><div className="reading-copy"><p>Lower prices can mean more purchases. So a lower footprint per cabinet does not automatically mean a lower footprint overall.</p><p>The IKEA view makes this tension visible: compare two demand scenarios against the same climate, material and campaign budget limits.</p><a className="text-link" href="#/ikea">See the IKEA perspective <Arrow /></a></div></section>
    <section className="closing-section"><p className="eyebrow">Take a closer look</p><h2>See the choice through Emma’s eyes.</h2><a className="button" href="#/emma">Open the prototype <Arrow /></a><p className="muted">A visual concept with a simple, working comparison.</p></section>
  </>
}
