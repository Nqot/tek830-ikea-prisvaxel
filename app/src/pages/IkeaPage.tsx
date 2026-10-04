import { DemoHeader } from '../components/Layout'
import { alternative, baseline, finalPrice, limits, scenarios } from '../data/demo'
import { money, number } from '../lib/format'
import type { CampaignScenario } from '../types/domain'

export function IkeaPage({ scenario, onScenarioChange }: { scenario: CampaignScenario['id']; onScenarioChange: (id: CampaignScenario['id']) => void }) {
  const current = scenarios[scenario]
  const metrics = [
    { label: 'Total climate footprint', base: baseline.climateKg, value: current.climateKg, limit: limits.climateKg, unit: 'kg CO₂e' },
    { label: 'Total virgin material', base: baseline.materialKg, value: current.materialKg, limit: limits.materialKg, unit: 'kg' },
  ]
  return <>
    <DemoHeader active="ikea" />
    <section className="page-intro"><p className="eyebrow">IKEA perspective · Illustrative campaign</p><h1>Make the offer.<br />See the whole picture.</h1><p>A more accessible price is the starting point. Check what happens to total impact when customers switch—and when more people buy.</p></section>
    <section className="offer-panel"><div><span className="tag">Example offer · Not live</span><h2>Considered storage</h2><p>A lower price for a comparable storage option.</p><a href="#/emma">See the customer view ↗</a></div><dl className="offer-numbers"><div><dt>Regular price</dt><dd>{money(alternative.price)}</dd></div><div><dt>Product discount</dt><dd>{money(alternative.discount)}</dd></div><div><dt>Customer pays</dt><dd>{money(finalPrice(alternative))}</dd></div></dl></section>
    <section className="section scenario-section"><div className="section-heading"><div><p className="eyebrow">Campaign check</p><h2>What if demand changes?</h2></div><p>Explore two fixed scenarios. These are examples, not demand forecasts.</p></div>
      <fieldset className="scenario-picker"><legend>Select a demand scenario</legend>{Object.values(scenarios).map((item) => <label key={item.id} className={scenario === item.id ? 'scenario-option active' : 'scenario-option'}><input type="radio" name="scenario" value={item.id} checked={scenario === item.id} onChange={() => onScenarioChange(item.id)} /><span><strong>{item.label}</strong><span>{item.additionalPurchases} additional purchases</span></span></label>)}</fieldset>
      <div aria-live="polite" aria-atomic="true" className="scenario-result">
        <div className="metric-grid"><div><span>Products sold</span><strong>{current.units}</strong><span>Baseline: {baseline.units} products</span></div><div><span>Modelled emissions</span><strong>{number(current.climateKg)} <small>kg CO₂e</small></strong><span>{number(Math.abs(current.climateKg - baseline.climateKg))} kg {current.climateKg < baseline.climateKg ? 'below' : 'above'} baseline</span></div><div><span>Discount allocation</span><strong>{money(current.discountSpend)}</strong><span>Budget: {money(limits.discountBudget)}</span></div></div>
        <div className="impact-table-wrap"><table className="impact-table"><caption>Campaign totals and limits · all values simulated</caption><thead><tr><th scope="col">Measure</th><th scope="col">Without offer</th><th scope="col">With offer</th><th scope="col">Campaign limit</th></tr></thead><tbody>{metrics.map((metric) => <tr key={metric.label}><th scope="row">{metric.label}</th><td data-label="Without offer">{number(metric.base)} {metric.unit}</td><td data-label="With offer">{number(metric.value)} {metric.unit}</td><td data-label="Campaign limit">{number(metric.limit)} {metric.unit}<span className="table-status">{metric.value <= metric.limit ? 'Within limit' : 'Limit exceeded'}</span></td></tr>)}<tr><th scope="row">Discount allocation</th><td data-label="Without offer">0 kr</td><td data-label="With offer">{money(current.discountSpend)}</td><td data-label="Campaign limit">{money(limits.discountBudget)}<span className="table-status">{current.discountSpend <= limits.discountBudget ? 'Within limit' : 'Limit exceeded'}</span></td></tr><tr><th scope="row">Sales revenue</th><td data-label="Without offer">{money(baseline.revenue)}</td><td data-label="With offer">{money(current.revenue)}</td><td data-label="Campaign limit">Not a profit measure</td></tr></tbody></table></div>
        <div className="decision-panel"><span className="decision-marker" aria-hidden="true">{current.withinLimits ? '✓' : '!'}</span><div><h3>{current.withinLimits ? 'Within the example limits' : 'Review before proceeding'}</h3><p>{current.explanation}</p></div></div>
      </div>
      <p className="data-note">Both scenarios assume 40 original purchases and 60 switches, plus the additional purchases selected above. Real customer actions in this demo do not change these scenarios.</p>
    </section>
    <section className="section split-section"><div><p className="eyebrow">The decision behind the discount</p><h2>Growth needs<br />a boundary.</h2></div><div className="reading-copy"><p>The example limits are set 10% below the original climate and material totals. These are teaching assumptions, not IKEA targets.</p><p>A real decision would also require verified product data, costs, margins and evidence of which purchases the offer actually changes.</p><a className="text-link" href="#/method">See the model and its limits ↗</a></div></section>
  </>
}
