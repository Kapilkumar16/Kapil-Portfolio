import { projects } from '../data/content'
import { Reveal, TextLink } from './ui'
import { ProjectVisualArt } from './visuals/ProjectVisuals'
import './Projects.css'

export function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="projects-title" className="display-lg">
            More projects.
          </h2>
          <p className="title-md">A RAG service and a realtime monitoring system, built end to end.</p>
        </Reveal>

        <ul className="project-grid">
          {projects.map((project) => (
            <li key={project.id}>
              <Reveal className="project-card">
                <article>
                  <div className="project-card__media">
                    <ProjectVisualArt kind={project.visual} />
                  </div>
                  <div className="project-card__body">
                    <p className="label project-card__tag">
                      {project.tag} <span>· {project.year}</span>
                    </p>
                    <h3 className="title-lg">{project.title}</h3>
                    <p className="body-sm">{project.body}</p>
                    <p className="caption project-card__stack">{project.stack.join(' · ')}</p>
                    <div className="project-card__links">
                      {project.links.map((link) => (
                        <TextLink key={link.href} href={link.href}>
                          {link.label}
                        </TextLink>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
