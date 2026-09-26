import { applypilot, excelmind, nav, profile, projects, resume } from '../data/content'
import { Logo } from './Nav'
import { MStripe } from './ui'
import './Footer.css'

export function Footer() {
  const columns = [
    {
      title: 'Work',
      links: [
        { label: 'ApplyPilot', href: applypilot.link.href },
        { label: 'ExcelMind', href: excelmind.link.href },
        ...projects.map((p) => ({ label: p.title, href: p.links[0].href })),
      ],
    },
    {
      title: 'On this page',
      links: nav.map((item) => ({ label: item.label, href: `#${item.id}` })),
    },
    {
      title: 'Elsewhere',
      links: [
        { label: 'GitHub', href: profile.links.github },
        { label: 'LinkedIn', href: profile.links.linkedin },
        { label: 'Email', href: `mailto:${profile.email}` },
        { label: 'Résumé (PDF)', href: resume.href },
      ],
    },
  ]

  return (
    <footer className="footer">
      <MStripe />
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo />
          <p className="body-sm">
            {profile.role}. {profile.location}.
          </p>
        </div>
        <nav className="footer__columns" aria-label="Footer">
          {columns.map((col) => (
            <div key={col.title} className="footer__col">
              <p className="label footer__title">{col.title}</p>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(/^https?:/.test(link.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                      {...(link.href === resume.href ? { download: resume.filename } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="footer__bottom caption">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Built with React, TypeScript and Vite</span>
        </div>
      </div>
    </footer>
  )
}
