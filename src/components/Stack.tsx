import { useRef, useState, type KeyboardEvent } from 'react'
import { resume, stack } from '../data/content'
import { Button, Reveal } from './ui'
import './Stack.css'

export function Stack() {
  const [activeId, setActiveId] = useState(stack[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = stack.find((group) => group.id === activeId) ?? stack[0]

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = stack.findIndex((group) => group.id === activeId)
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const next = (index + delta + stack.length) % stack.length
    setActiveId(stack[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="stack" className="section stack" aria-labelledby="stack-title">
      <div className="container stack__layout">
        <div className="stack__main">
          <Reveal className="section-head">
            <h2 id="stack-title" className="display-lg">
              The stack.
            </h2>
            <p className="title-md">Each tool listed with where it has actually been used.</p>
          </Reveal>

          <div className="tabs" role="tablist" aria-label="Skill categories" onKeyDown={onKeyDown}>
            {stack.map((group, i) => {
              const selected = group.id === activeId
              return (
                <button
                  key={group.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`tab-${group.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${group.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`tab ${selected ? 'is-active' : ''}`}
                  onClick={() => setActiveId(group.id)}
                >
                  {group.label}
                </button>
              )
            })}
          </div>

          <ul
            key={active.id}
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className="skill-grid"
          >
            {active.skills.map((skill) => (
              <li key={skill.name} className="skill">
                <span className="skill__name">{skill.name}</span>
                <span className="body-sm skill__where">{skill.where}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside id="resume" className="resume-card" aria-labelledby="resume-title">
          <h3 id="resume-title" className="display-sm">
            Résumé.
          </h3>
          <p className="body-sm">Experience, projects, skills and education on one page.</p>
          <p className="caption resume-card__file">{resume.filename} · PDF</p>
          <Button href={resume.href} download={resume.filename} className="resume-card__btn">
            Download résumé
          </Button>
        </aside>
      </div>
    </section>
  )
}
