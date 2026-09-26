import { experience } from '../data/content'
import { Reveal } from './ui'
import { AgentGraph } from './visuals/AgentGraph'
import './Experience.css'

export function Experience() {
  const { education, certifications } = experience

  return (
    <section id="experience" aria-labelledby="experience-title">
      <div className="photo-band photo-band--stack experience__band">
        <div className="photo-band__media">
          <AgentGraph />
        </div>
        <div className="container photo-band__content">
          <p className="label experience__eyebrow">{experience.eyebrow}</p>
          <h2 id="experience-title" className="display-xl">
            {experience.title}
          </h2>
        </div>
        <p className="caption photo-band__caption">Fig. 04 — {experience.caption}</p>
      </div>

      <div className="container section experience__body">
        <ol className="roles">
          {experience.roles.map((role) => (
            <li key={role.company}>
              <Reveal className="role">
                <header className="role__head">
                  <h3 className="title-lg">{role.company}</h3>
                  <p className="role__title">{role.title}</p>
                  <p className="caption">
                    {role.dates} · {role.location}
                  </p>
                </header>
                <ul className="role__bullets">
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="credentials">
          <div className="credential">
            <p className="label credential__label">Education</p>
            <p className="title-lg">{education.school}</p>
            <p>{education.degree}</p>
            <p className="caption">
              {education.dates} · {education.location}
            </p>
          </div>
          <div className="credential">
            <p className="label credential__label">Certifications</p>
            <ul className="credential__list">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <span className="credential__name">{cert.name}</span>
                  <span className="caption">{cert.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
