import type { Product } from '../types/domain'
import { finalPrice } from '../data/demo'
import { money } from '../lib/format'
import { Furniture } from './Furniture'

export function ProductCard({ product, budget, discount, selected, onSelect }: { product: Product; budget: number; discount: number; selected: boolean; onSelect: () => void }) {
  const price = finalPrice(product, discount)
  const affordable = Number.isFinite(budget) && price <= budget
  const isAlternative = product.id === 'alternative'
  const offerAvailable = isAlternative && discount > 0
  return <article className={`product-card ${selected ? 'is-selected' : ''}`}>
    <div className="product-heading"><span>{isAlternative ? 'Comparable alternative' : 'Starting option'}</span>{offerAvailable && <span className="tag">Example offer</span>}</div>
    <Furniture variant={product.illustration} />
    <div className="product-body"><h2>{product.name}</h2><p className="muted">{product.description} · {product.finish}</p>
      <div className="product-price"><strong>{money(price)}</strong>{offerAvailable && <span>Regular price <s>{money(product.price)}</s></span>}</div>
      <p className="budget-message">{!Number.isFinite(budget) ? 'Enter a valid budget to compare' : affordable ? price === budget ? 'Exactly within your budget' : `${money(budget - price)} left in your budget` : `${money(price - budget)} above your budget`}</p>
      <dl className="spec-list"><div><dt>Size (W × D × H)</dt><dd>{product.width} × {product.depth} × {product.height} cm</dd></div><div><dt>Storage</dt><dd>{product.capacity}</dd></div><div><dt>Modelled climate footprint</dt><dd>{product.climateKg} kg CO₂e</dd></div><div><dt>Modelled virgin material</dt><dd>{product.virginMaterialKg} kg</dd></div></dl>
      <button className={isAlternative ? 'button full-width' : 'button button-secondary full-width'} disabled={!affordable || selected} onClick={onSelect}>{selected ? 'Selected for your example' : isAlternative ? 'Choose this alternative' : 'Choose the starting option'}</button>
    </div>
  </article>
}
