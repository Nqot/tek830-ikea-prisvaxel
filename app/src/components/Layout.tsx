import type { ReactNode } from 'react'

export function Arrow({ direction = 'right' }: { direction?: 'right' | 'left' }) {
  return <span aria-hidden="true" className="arrow">{direction === 'right' ? '↗' : '←'}</span>
}

export function Layout({ children, path }: { children: ReactNode; path: string }) {
  return <>
    <a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); document.getElementById('main')?.focus() }}>Skip to content</a>
    <div className="project-strip"><div className="container">A student concept for more affordable, lower-impact choices.<span>TEK830 · Sustainable digitalization</span></div></div>
    <header className="site-header container">
      <a className="wordmark" href="#/" aria-label="Prisväxeln home">prisväxeln<span className="brand-stop">.</span></a>
      <nav aria-label="Main navigation">
        <a href="#/?section=idea" aria-current={path === '/' ? 'page' : undefined}>The idea</a>
        <a href="#/project" aria-current={path === '/project' ? 'page' : undefined}>Our project</a>
        <a className="nav-prototype" href="#/emma" aria-current={path === '/emma' ? 'page' : undefined}>Explore prototype <Arrow /></a>
      </nav>
    </header>
    <main id="main" tabIndex={-1} className="container">{children}</main>
    <footer className="site-footer"><div className="container footer-grid">
      <div className="footer-brand"><a className="wordmark" href="#/">prisväxeln<span className="brand-stop">.</span></a><p>Make the considered choice<br />easier to reach.</p></div>
      <nav className="footer-links" aria-label="Project links"><span className="footer-heading">Explore</span><a href="#/emma">Customer prototype</a><a href="#/ikea">IKEA perspective</a><a href="#/method">Data & assumptions</a><a href="#/project">About the project</a></nav>
      <div className="footer-project"><span className="footer-heading">A student project</span><p>Chalmers · TEK830<br />Sustainable digitalization · 2026</p><p className="footer-note">Independent concept. Not an official IKEA service.</p></div>
    </div><div className="container footer-bottom"><span>Prisväxeln · A concept prototype</span><a href="#/project?section=ai">How we used AI</a></div></footer>
  </>
}

export function DemoHeader({ active }: { active: 'emma' | 'ikea' }) {
  return <div className="demo-bar">
    <nav aria-label="Prototype views"><a href="#/emma" aria-current={active === 'emma' ? 'page' : undefined}>For the customer</a><a href="#/ikea" aria-current={active === 'ikea' ? 'page' : undefined}>For IKEA</a></nav>
    <span className="demo-label">Prototype · Example data</span>
  </div>
}
