import { hero, profile, resume } from '../data/content'
import { Button, MStripe, TextLink } from './ui'
import { Waveform } from './visuals/Waveform'
import './Hero.css'

export function Hero() {
  return (
    <section id="top" className="photo-band hero" aria-labelledby="hero-title">
      <div className="photo-band__media">
        <Waveform />
      </div>

      <div className="container photo-band__content hero__content">
        <MStripe className="hero__stripe" />
        <p className="label hero__eyebrow">
          {profile.titles.map((title) => (
            <span key={title}>{title}</span>
          ))}
        </p>
        <h1 id="hero-title" className="display-xl">
          {hero.title}
        </h1>
        <p className="title-md hero__lead">{hero.lead}</p>
        <div className="hero__actions">
          <Button href="#applypilot">View work</Button>
          <TextLink href={resume.href} download={resume.filename} icon="download">
            Résumé
          </TextLink>
        </div>
      </div>

      <p className="caption photo-band__caption hero__caption">Fig. 01 — {hero.caption}</p>
    </section>
  )
}
