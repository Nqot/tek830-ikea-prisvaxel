import { DemoHeader } from '../components/Layout'
import { alternative, baseline, finalPrice, limits, offerDiscountOptions, scenarios } from '../data/demo'
import { money, number } from '../lib/format'
import type { CampaignScenario } from '../types/domain'

export function IkeaPage({ scenario, onScenarioChange, offerDiscount, onOfferDiscountChange }: { scenario: CampaignScenario['id']; onScenarioChange: (id: CampaignScenario['id']) => void; offerDiscount: number; onOfferDiscountChange: (value: number) => void }) {
  const current = scenarios[scenario]
  const alternativeUnits = 60 + current.additionalPurchases
  const discountSpend = alternativeUnits * offerDiscount
  const campaignRevenue = 40 * 899 + alternativeUnits * finalPrice(alternative, offerDiscount)
  const climateWithinLimit = current.climateKg <= limits.climateKg
  const materialWithinLimit = current.materialKg <= limits.materialKg
  const discountWithinLimit = discountSpend <= limits.discountBudget
  const withinLimits = climateWithinLimit && materialWithinLimit && discountWithinLimit
  const reasons = [
    !climateWithinLimit && 'climate impact is above its example limit',
    !materialWithinLimit && 'virgin material use is above its example limit',
    !discountWithinLimit && 'discount allocation is above its example budget',
  ].filter(Boolean)
  const explanation = withinLimits
    ? 'This scenario stays within all three example limits. It is a candidate for further evaluation, not proof of real-world impact.'
    : `Review this scenario: ${reasons.join(', ')}. Additional purchases outweigh the modelled benefit of switching.`
  const metrics = [
    { label: 'Total climate footprint', base: baseline.climateKg, value: current.climateKg, limit: limits.climateKg, unit: 'kg CO₂e' },
    { label: 'Total virgin material', base: baseline.materialKg, value: current.materialKg, limit: limits.materialKg, unit: 'kg' },
  ]

  return <>
    <DemoHeader active="ikea" />
    <section className="page-intro"><p className="eyebrow">IKEA perspective · Illustrative campaign</p><h1>Prepare the offer.<br />Check the whole picture.</h1><p>A category team reviews comparable options and sets an offer before Emma searches. Here, a shared product pair and one campaign setting power both demo views.</p></section>
    <section className="offer-workflow" aria-label="How the offer reaches Emma"><article><span className="step-number">01 · IKEA prepares</span><h2>Review a comparable product pair.</h2><p>Storage cabinet · same example size · two adjustable shelves</p></article><span className="workflow-arrow" aria-hidden="true">→</span><article><span className="step-number">02 · Emma compares</span><h2>Set one offer for all customers.</h2><p>Emma’s budget filters the options. It does not change the offer.</p></article><span className="workflow-arrow" aria-hidden="true">→</span><article><span className="step-number">03 · IKEA reviews</span><h2>Watch total campaign impact.</h2><p>Switching and any additional purchases matter.</p></article></section>
    <section className="offer-panel"><div><span className="tag">Example campaign · Not live</span><h2>Considered storage</h2><p>A prepared alternative for the storage cabinet category.</p><dl className="offer-details"><div><dt>Reviewed example size</dt><dd>80 × 40 × 90 cm</dd></div><div><dt>Storage</dt><dd>Two adjustable shelves</dd></div></dl><a href="#/emma">See the customer view ↗</a></div><div className="offer-config"><label htmlFor="offer-discount">Set the offer available to every customer</label><select id="offer-discount" value={offerDiscount} onChange={(event) => onOfferDiscountChange(Number(event.target.value))}>{offerDiscountOptions.map((discount) => <option key={discount} value={discount}>{discount === 0 ? 'No discount' : `${money(discount)} off`}</option>)}</select><p className="field-help">This updates the customer view in this browser demo. It does not publish a real IKEA offer.</p><dl className="offer-numbers"><div><dt>Regular price</dt><dd>{money(alternative.price)}</dd></div><div><dt>Customer offer</dt><dd>{offerDiscount ? `−${money(offerDiscount)}` : 'None'}</dd></div><div><dt>Customer pays</dt><dd>{money(finalPrice(alternative, offerDiscount))}</dd></div></dl></div></section>
    <section className="section scenario-section"><div className="section-heading"><div><p className="eyebrow">Campaign check</p><h2>What if demand changes?</h2></div><p>Explore two fixed demand scenarios. They do not change when the offer or Emma’s selection changes.</p></div>
      <fieldset className="scenario-picker"><legend>Select a demand scenario</legend>{Object.values(scenarios).map((item) => <label key={item.id} className={scenario === item.id ? 'scenario-option active' : 'scenario-option'}><input type="radio" name="scenario" value={item.id} checked={scenario === item.id} onChange={() => onScenarioChange(item.id)} /><span><strong>{item.label}</strong><span>{item.additionalPurchases} additional purchases</span></span></label>)}</fieldset>
      <div aria-live="polite" aria-atomic="true" className="scenario-result">
        <div className="metric-grid"><div><span>Products sold</span><strong>{current.units}</strong><span>Baseline: {baseline.units} products</span></div><div><span>Modelled emissions</span><strong>{number(current.climateKg)} <small>kg CO₂e</small></strong><span>{number(Math.abs(current.climateKg - baseline.climateKg))} kg {current.climateKg < baseline.climateKg ? 'below' : 'above'} baseline</span></div><div><span>Discount allocation</span><strong>{money(discountSpend)}</strong><span>Budget: {money(limits.discountBudget)}</span></div></div>
        <div className="impact-table-wrap"><table className="impact-table"><caption>Campaign totals and limits · all values simulated</caption><thead><tr><th scope="col">Measure</th><th scope="col">Without offer</th><th scope="col">With offer</th><th scope="col">Campaign limit</th></tr></thead><tbody>{metrics.map((metric) => <tr key={metric.label}><th scope="row">{metric.label}</th><td data-label="Without offer">{number(metric.base)} {metric.unit}</td><td data-label="With offer">{number(metric.value)} {metric.unit}</td><td data-label="Campaign limit">{number(metric.limit)} {metric.unit}<span className="table-status">{metric.value <= metric.limit ? 'Within limit' : 'Limit exceeded'}</span></td></tr>)}<tr><th scope="row">Discount allocation</th><td data-label="Without offer">0 kr</td><td data-label="With offer">{money(discountSpend)}</td><td data-label="Campaign limit">{money(limits.discountBudget)}<span className="table-status">{discountWithinLimit ? 'Within limit' : 'Limit exceeded'}</span></td></tr><tr><th scope="row">Sales revenue</th><td data-label="Without offer">{money(baseline.revenue)}</td><td data-label="With offer">{money(campaignRevenue)}</td><td data-label="Campaign limit">Not a profit measure</td></tr></tbody></table></div>
        <div className="decision-panel"><span className="decision-marker" aria-hidden="true">{withinLimits ? '✓' : '!'}</span><div><h3>{withinLimits ? 'Within the example limits' : 'Review before proceeding'}</h3><p>{explanation}</p></div></div>
      </div>
      <p className="data-note">The model assumes 40 original purchases and 60 switches, plus the additional purchases selected above. Emissions and material totals are fixed examples. Discount allocation and sales revenue respond to the offer amount. Real customer actions do not change campaign totals.</p>
    </section>
    <section className="section split-section"><div><p className="eyebrow">The decision behind the discount</p><h2>Growth needs<br />a boundary.</h2></div><div className="reading-copy"><p>The example limits are set 10% below the original climate and material totals. These are teaching assumptions, not IKEA targets.</p><p>Real evaluation would also require verified product data, actual costs and margins, and evidence of which purchases the offer changes.</p><a className="text-link" href="#/method">See the model and its limits ↗</a></div></section>
  </>
}
