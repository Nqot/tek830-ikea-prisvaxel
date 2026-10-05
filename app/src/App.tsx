import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { EmmaPage } from './pages/EmmaPage'
import { IkeaPage } from './pages/IkeaPage'
import { ProjectPage } from './pages/ProjectPage'
import { MethodPage } from './pages/MethodPage'
import './App.css'

const titles: Record<string, string> = {
  '/': 'Better choices within reach', '/emma': 'Explore your options',
  '/ikea': 'Plan an offer', '/project': 'About the project', '/method': 'Our data & assumptions',
}

export default function App() {
  const [location, setLocation] = useState(() => window.location.hash.slice(1) || '/')
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [budget, setBudget] = useState('900')
  const [maxWidth, setMaxWidth] = useState('80')
  const [minimumShelves, setMinimumShelves] = useState('2')
  const [offerDiscount, setOfferDiscount] = useState(150)
  const [scenario, setScenario] = useState<'planned' | 'growth'>('planned')
  const [path, query = ''] = location.split('?')

  useEffect(() => {
    const update = () => setLocation(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  useEffect(() => {
    document.title = `${titles[path] || 'Page not found'} · Prisväxeln`
    const section = new URLSearchParams(query).get('section')
    const target = section ? document.getElementById(section) : document.getElementById('main')
    if (section && target) target.scrollIntoView()
    else window.scrollTo(0, 0)
    target?.focus({ preventScroll: true })
  }, [path, query])

  let page
  switch (path) {
    case '/': page = <HomePage offerDiscount={offerDiscount} />; break
    case '/emma': page = <EmmaPage budget={budget} onBudgetChange={setBudget} maxWidth={maxWidth} onMaxWidthChange={setMaxWidth} minimumShelves={minimumShelves} onMinimumShelvesChange={setMinimumShelves} offerDiscount={offerDiscount} selected={selectedProduct} onSelect={setSelectedProduct} />; break
    case '/ikea': page = <IkeaPage scenario={scenario} onScenarioChange={setScenario} offerDiscount={offerDiscount} onOfferDiscountChange={(value) => { setOfferDiscount(value); setSelectedProduct(null) }} />; break
    case '/project': page = <ProjectPage />; break
    case '/method': page = <MethodPage />; break
    default: page = <section className="page-intro"><p className="eyebrow">Page not found</p><h1>Let’s get you back.</h1><a className="button" href="#/">Back to Prisväxeln</a></section>
  }
  return <Layout path={path}>{page}</Layout>
}
