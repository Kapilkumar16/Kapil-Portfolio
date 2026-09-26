import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { Spec } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import './ui.css'

/** The 4px M tricolor. Brand identity only — never a button or a fill. */
export function MStripe({ className = '' }: { className?: string }) {
  return (
    <div className={`m-stripe ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'outline' | 'solid'
  size?: 'md' | 'sm'
}

export function Button({ children, variant = 'outline', size = 'md', className = '', ...rest }: ButtonProps) {
  return (
    <a className={`btn btn--${variant} btn--${size} ${className}`} {...externalProps(rest.href)} {...rest}>
      {children}
    </a>
  )
}

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  icon?: 'arrow' | 'download'
}

export function TextLink({ children, icon = 'arrow', className = '', ...rest }: TextLinkProps) {
  return (
    <a className={`text-link ${className}`} {...externalProps(rest.href)} {...rest}>
      <span>{children}</span>
      {icon === 'arrow' ? <ArrowIcon /> : <DownloadIcon />}
    </a>
  )
}

export function SpecGrid({ specs, variant = 'default' }: { specs: Spec[]; variant?: 'default' | 'compact' }) {
  return (
    <dl className={`spec-grid spec-grid--${variant}`}>
      {specs.map((spec) => (
        <div className="spec-cell" key={spec.label}>
          <dt className="label spec-cell__label">{spec.label}</dt>
          <dd className="spec-cell__value">{spec.value}</dd>
          {spec.note && <dd className="caption spec-cell__note">{spec.note}</dd>}
        </div>
      ))}
    </dl>
  )
}

/** Fades its children up the first time they scroll into view. */
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

function externalProps(href?: string) {
  return href && /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noreferrer' } : {}
}

export function ArrowIcon() {
  return (
    <svg className="icon-arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg className="icon-arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2v9M4 7l4 4 4-4M2 14h12" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  )
}

export function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    </svg>
  )
}
