import { useState } from 'react'
import { contact, profile } from '../data/content'
import { Button, TextLink } from './ui'
import { Circuit } from './visuals/Circuit'
import './Contact.css'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="photo-band contact" aria-labelledby="contact-title">
      <div className="photo-band__media">
        <Circuit />
      </div>
      <div className="container contact__content">
        <p className="label contact__eyebrow">Contact</p>
        <h2 id="contact-title" className="display-lg">
          {contact.title}
        </h2>
        <p className="title-md contact__lead">{contact.lead}</p>
        <div className="contact__actions">
          <Button href={`mailto:${profile.email}`}>Email me</Button>
          <button type="button" className="text-link contact__copy" onClick={copyEmail}>
            <span>{copied ? 'Copied' : profile.email}</span>
          </button>
        </div>
        <div className="contact__links">
          <TextLink href={profile.links.linkedin}>LinkedIn</TextLink>
          <TextLink href={profile.links.github}>GitHub</TextLink>
        </div>
        <p className="visually-hidden" aria-live="polite">
          {copied ? 'Email address copied to clipboard' : ''}
        </p>
      </div>
    </section>
  )
}
