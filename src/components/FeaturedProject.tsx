import type { ReactNode } from 'react'
import type { Featured } from '../data/content'
import { Button, MStripe, Reveal, SpecGrid } from './ui'
import './FeaturedProject.css'

type Props = {
  project: Featured
  figure: string
  visual: ReactNode
}

/** A flagship project: photo band, the three claims, specs, then engineering notes. */
export function FeaturedProject({ project, figure, visual }: Props) {
  const titleId = `${project.id}-title`

  return (
    <section id={project.id} aria-labelledby={titleId}>
      <div className="photo-band photo-band--stack featured__band">
        <div className="photo-band__media">{visual}</div>
        <div className="container photo-band__content">
          <MStripe className="featured__stripe" />
          <p className="label featured__eyebrow">{project.eyebrow}</p>
          <h2 id={titleId} className="display-xl">
            {project.title}
          </h2>
        </div>
        <p className="caption photo-band__caption">
          Fig. {figure} — {project.caption}
        </p>
      </div>

      <div className="container section featured__body">
        <Reveal className="featured__intro">
          <p className="title-md">{project.lead}</p>
          <p className="body-sm featured__status">{project.status}</p>
          <div className="featured__actions">
            <Button href={project.link.href}>{project.link.label}</Button>
          </div>
          <p className="caption featured__stack">{project.stack.join('  ·  ')}</p>
        </Reveal>

        <ol className="featured__claims">
          {project.claims.map((claim, i) => (
            <li key={claim.title}>
              <Reveal className="claim">
                <span className="label claim__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-sm">{claim.title}</h3>
                <p>{claim.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <div className="container">
        <Reveal>
          <SpecGrid specs={project.specs} variant="compact" />
        </Reveal>
      </div>

      <div className="container section">
        <Reveal className="featured__notes-head">
          <h3 className="display-md">Under the hood.</h3>
          <p className="body-sm">{project.notesLead}</p>
        </Reveal>
        <ul className="notes-grid">
          {project.notes.map((note) => (
            <li key={note.title}>
              <Reveal className="note-card">
                <p className="label note-card__tag">{note.tag}</p>
                <h4 className="title-lg">{note.title}</h4>
                <p className="body-sm">{note.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
