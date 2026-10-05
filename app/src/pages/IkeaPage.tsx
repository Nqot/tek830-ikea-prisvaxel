import { DemoHeader } from '../components/Layout'
import { alternative, baseline, campaignAssumptions, evaluateCampaign, finalPrice, limits, offerDiscountOptions, scenarios } from '../data/demo'
import { money, number } from '../lib/format'
import type { CampaignScenario } from '../types/domain'

interface IkeaPageProps {
  scenario: CampaignScenario['id']
  onScenarioChange: (id: CampaignScenario['id']) => void
  offerDiscount: number
  onOfferDiscountChange: (value: number) => void
}

export function IkeaPage({ scenario, onScenarioChange, offerDiscount, onOfferDiscountChange }: IkeaPageProps) {
  const demand = scenarios[scenario]
  const result = evaluateCampaign(demand, offerDiscount)
  const withinLimits = result.climateWithinLimit && result.materialWithinLimit && result.discountWithinLimit
  const reasons = [
    !result.climateWithinLimit && 'climate impact exceeds the example limit',
    !result.materialWithinLimit && 'virgin material use exceeds the example limit',
    !result.discountWithinLimit && 'discount allocation exceeds the example budget',
  ].filter(Boolean)
  const explanation = withinLimits
    ? 'The stated assumptions meet these three limits. This does not establish profitability or overall sustainability; product evidence and a controlled pilot would still be needed.'
    : `Review the scenario: ${reasons.join('; ')}. Adjust the plan or choose not to proceed.`
  const metrics = [
    { label: 'Total climate footprint', base: baseline.climateKg, value: result.climateKg, limit: limits.climateKg, unit: 'kg CO₂e' },
    { label: 'Total virgin material', base: baseline.materialKg, value: result.materialKg, limit: limits.materialKg, unit: 'kg' },
  ]

  return <>
    <DemoHeader active="ikea" />
    <section className="page-intro">
      <p className="eyebrow">IKEA perspective · Campaign planning example</p>
      <h1>Test the offer.<br />Check the whole picture.</h1>
      <p>Before starting a campaign, a category team could use Prisväxeln to explore whether a discount makes a lower-impact alternative affordable — and what happens if demand grows.</p>
    </section>
    <section className="offer-workflow" aria-label="Proposed campaign process">
      <article><span className="step-number">01 · Prepare</span><h2>Review the product pair.</h2><p>Check that it meets the same need and that environmental claims have reliable evidence.</p></article>
      <span className="workflow-arrow" aria-hidden="true">→</span>
      <article><span className="step-number">02 · Explore here</span><h2>Test offer and demand scenarios.</h2><p>Compare affordability, campaign spend and total environmental impact before a pilot.</p></article>
      <span className="workflow-arrow" aria-hidden="true">→</span>
      <article><span className="step-number">03 · A future pilot</span><h2>Evaluate before expanding.</h2><p>Customers see the chosen offer. IKEA measures real outcomes and decides whether to continue.</p></article>
    </section>

    <section className="offer-panel" aria-labelledby="offer-heading">
      <div>
        <span className="tag">Prepared example · Not a live campaign</span>
        <h2 id="offer-heading">{alternative.name}</h2>
        <p>Same storage need, lower example climate and virgin material figures, but a higher regular price. That price gap is the reason to test an offer.</p>
        <dl className="offer-details">
          <div><dt>Size (W × D × H)</dt><dd>{alternative.width} × {alternative.depth} × {alternative.height} cm</dd></div>
          <div><dt>Storage</dt><dd>{alternative.capacity}</dd></div>
        </dl>
        <a href="#/method?section=data">Review the product assumptions ↗</a>
      </div>
      <div className="offer-config">
        <label htmlFor="offer-discount">Try a discount on the alternative</label>
        <select id="offer-discount" value={offerDiscount} aria-describedby="offer-help" onChange={(event) => onOfferDiscountChange(Number(event.target.value))}>
          {offerDiscountOptions.map((discount) => <option key={discount} value={discount}>{discount === 0 ? 'No discount' : `${money(discount)} off`}</option>)}
        </select>
        <p className="field-help" id="offer-help">The same price appears in the customer demo. This does not publish an offer or predict sales.</p>
        <dl className="offer-numbers" aria-live="polite" aria-atomic="true">
          <div><dt>Regular price</dt><dd>{money(alternative.price)}</dd></div>
          <div><dt>Discount</dt><dd>{offerDiscount ? `−${money(offerDiscount)}` : 'None'}</dd></div>
          <div><dt>Customer pays</dt><dd>{money(finalPrice(alternative, offerDiscount))}</dd></div>
        </dl>
        <a className="text-link" href="#/emma">See this price in Emma’s view ↗</a>
      </div>
    </section>

    <section className="section scenario-section">
      <div className="section-heading">
        <div><p className="eyebrow">Campaign check</p><h2>What if demand changes?</h2></div>
        <p>Choose an assumption about additional purchases. A larger discount does not automatically mean more sales in this model.</p>
      </div>
      <fieldset className="scenario-picker">
        <legend>Select a demand scenario</legend>
        {Object.values(scenarios).map((item) => <label key={item.id} className={scenario === item.id ? 'scenario-option active' : 'scenario-option'}>
          <input type="radio" name="scenario" value={item.id} checked={scenario === item.id} onChange={() => onScenarioChange(item.id)} />
          <span><strong>{item.label}</strong><span>{item.additionalPurchases} additional purchases</span></span>
        </label>)}
      </fieldset>
      <p className="scenario-assumption">
        Both scenarios assume {campaignAssumptions.switches} customers switch from the starting cabinet to the alternative.
        {' '}{offerDiscount === 0 ? 'No discount is applied. The assumed switches remain; they are not evidence that customers would switch at full price.' : 'The extra purchases are added to those planned purchases; they are not switches.'}
      </p>
      <p className="sr-only" role="status">{demand.label}. {number(result.climateKg)} kg CO₂e. Discount allocation {money(result.discountSpend)}. {withinLimits ? 'Within the three example limits.' : 'One or more example limits exceeded.'}</p>
      <div className="scenario-result">
        <div className="metric-grid">
          <div><span>Assumed products sold</span><strong>{result.units}</strong><span>Baseline: {baseline.units} products</span></div>
          <div><span>Modelled emissions</span><strong>{number(result.climateKg)} <small>kg CO₂e</small></strong><span>{number(Math.abs(result.climateKg - baseline.climateKg))} kg {result.climateKg < baseline.climateKg ? 'below' : 'above'} baseline</span></div>
          <div><span>Discount allocation</span><strong>{money(result.discountSpend)}</strong><span>Example budget: {money(limits.discountBudget)}</span></div>
        </div>
        <div className="impact-table-wrap">
          <table className="impact-table">
            <caption>Baseline: 100 starting cabinets. Selected scenario: {result.originalUnits} starting cabinets + {result.alternativeUnits} alternatives. All values are examples.</caption>
            <thead><tr><th scope="col">Measure</th><th scope="col">Baseline</th><th scope="col">Selected scenario</th><th scope="col">Example limit</th></tr></thead>
            <tbody>
              {metrics.map((metric) => <tr key={metric.label}>
                <th scope="row">{metric.label}</th>
                <td data-label="Baseline">{number(metric.base)} {metric.unit}</td>
                <td data-label="Selected scenario">{number(metric.value)} {metric.unit}</td>
                <td data-label="Example limit">{number(metric.limit)} {metric.unit}<span className="table-status">{metric.value <= metric.limit ? 'Within limit' : 'Limit exceeded'}</span></td>
              </tr>)}
              <tr><th scope="row">Discount allocation</th><td data-label="Baseline">0 kr</td><td data-label="Selected scenario">{money(result.discountSpend)}</td><td data-label="Example limit">{money(limits.discountBudget)}<span className="table-status">{result.discountWithinLimit ? 'Within limit' : 'Limit exceeded'}</span></td></tr>
              <tr><th scope="row">Sales revenue</th><td data-label="Baseline">{money(baseline.revenue)}</td><td data-label="Selected scenario">{money(result.revenue)}</td><td data-label="Example limit">Profit not assessed</td></tr>
            </tbody>
          </table>
        </div>
        <div className="decision-panel">
          <span className="decision-marker" aria-hidden="true">{withinLimits ? '✓' : '!'}</span>
          <div><h3>{withinLimits ? 'Within the example limits' : 'Review before proceeding'}</h3><p>{explanation}</p></div>
        </div>
      </div>
      <p className="data-note">Changing the discount updates prices, discount allocation and revenue. Changing the demand scenario updates the assumed purchases and environmental totals. Emma’s demo selection does not affect these assumptions.</p>
    </section>

    <section className="section split-section">
      <div><p className="eyebrow">Why IKEA would use this</p><h2>A clearer decision.<br />Before a bigger commitment.</h2></div>
      <div className="reading-copy">
        <p>The tool could help a team compare possible campaigns, spot when extra purchases erase the environmental benefit, and avoid expanding an offer that exceeds its limits.</p>
        <p>A discount is a cost, not a promise of profit. Some customers may have bought the product anyway. IKEA would need product costs, margins and evidence of changed purchasing behaviour before deciding whether a campaign is financially worthwhile.</p>
        <p>A real pilot would compare actual results with a suitable control, then continue, change or stop the offer. The limits here are teaching assumptions, not IKEA targets.</p>
        <a className="text-link" href="#/method?section=model">See the model and its limits ↗</a>
      </div>
    </section>
  </>
}
