import { useEffect, useState } from 'react'
import { nav, profile, resume } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { Button, GitHubIcon, LinkedInIcon, MStripe } from './ui'
import './Nav.css'

const sectionIds = ['top', ...nav.map((item) => item.id)]

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label={`${profile.name} — back to top`}>
      <span className="logo__mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="logo__word">{profile.name}</span>
    </a>
  )
}

export function Nav() {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`top-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container top-nav__inner">
        <Logo />

        <nav className="top-nav__menu" aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`top-nav__link ${active === item.id ? 'is-active' : ''}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="top-nav__actions">
          <a className="top-nav__icon" href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a className="top-nav__icon" href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <Button href={resume.href} download={resume.filename} size="sm" className="top-nav__resume">
            Résumé
          </Button>
          <button
            className="top-nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <MStripe />
        <nav className="container mobile-menu__links" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="display-sm" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="container mobile-menu__foot">
          <a className="label" href={resume.href} download={resume.filename} onClick={() => setOpen(false)}>
            Résumé
          </a>
          <a className="label" href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="label" href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  )
}
