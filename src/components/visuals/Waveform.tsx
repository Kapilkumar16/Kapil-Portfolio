import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../hooks/useInView'

/**
 * The hero "photograph": a voice-agent call rendered as a live waveform.
 * Agent turns are bright, caller turns are dimmer, and a playhead sweeps
 * the call like a telemetry trace. Deterministic — the same call every load.
 */

type Turn = { who: 'Agent' | 'Caller'; start: number; end: number }

const CALL_SECONDS = 390
const SWEEP_MS = 36000
const HOLD_MS = 2400

// Turn boundaries in seconds — a scheduling call: greet, ask, confirm, transfer.
const TURNS: Turn[] = [
  [3, 22, 'Agent'],
  [25, 44, 'Caller'],
  [46, 78, 'Agent'],
  [81, 96, 'Caller'],
  [98, 131, 'Agent'],
  [134, 158, 'Caller'],
  [160, 204, 'Agent'],
  [207, 219, 'Caller'],
  [221, 262, 'Agent'],
  [265, 291, 'Caller'],
  [293, 331, 'Agent'],
  [334, 347, 'Caller'],
  [349, 384, 'Agent'],
].map(([start, end, who]) => ({ who: who as Turn['who'], start: +start / CALL_SECONDS, end: +end / CALL_SECONDS }))

function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function noise(x: number) {
  const i = Math.floor(x)
  const f = x - i
  const s = f * f * (3 - 2 * f)
  return hash(i) * (1 - s) + hash(i + 1) * s
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function amplitude(t: number) {
  const turn = TURNS.find((tr) => t >= tr.start && t <= tr.end)
  if (!turn) return { amp: 0.015 + noise(t * 900) * 0.02, turn: null }

  const edge = 0.004
  const envelope = smoothstep(turn.start, turn.start + edge, t) * (1 - smoothstep(turn.end - edge, turn.end, t))
  const syllable = 0.35 + 0.65 * Math.pow(noise(t * 1400), 1.4)
  const words = 0.3 + 0.7 * smoothstep(0.25, 0.55, noise(t * 260 + 17))
  const phrase = 0.55 + 0.45 * noise(t * 40 + (turn.who === 'Agent' ? 3 : 9))
  const level = turn.who === 'Agent' ? 1 : 0.72
  return { amp: envelope * syllable * words * phrase * level, turn }
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function Waveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = prefersReducedMotion()
    let width = 0
    let height = 0
    let frame = 0
    let running = false
    let startedAt = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (progress: number) => {
      ctx.clearRect(0, 0, width, height)
      const mobile = width < 768
      const centerY = height * (mobile ? 0.26 : 0.32)
      const maxAmp = height * (mobile ? 0.14 : 0.18)
      const pitch = mobile ? 4 : 5
      const barW = 2
      const bars = Math.floor(width / pitch)
      const playX = progress * width

      // Baseline hairline.
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, centerY, width, 1)

      for (let i = 0; i < bars; i++) {
        const x = i * pitch
        const t = x / width
        const { amp, turn } = amplitude(t)
        const h = Math.max(1, amp * maxAmp)
        const played = x < playX
        const agent = turn?.who === 'Agent'
        const fade = smoothstep(0, 0.06, t) * (1 - smoothstep(0.94, 1, t))

        ctx.fillStyle = played ? (agent ? '#ffffff' : '#8a8a8a') : agent ? '#3c3c3c' : '#262626'
        ctx.globalAlpha = fade
        ctx.fillRect(x, centerY - h, barW, h)
        // Reflection below the baseline, like a car on wet asphalt.
        ctx.globalAlpha = fade * 0.35
        ctx.fillRect(x, centerY + 2, barW, h * 0.8)
      }
      ctx.globalAlpha = 1

      // Turn labels.
      ctx.font = '700 11px Inter, sans-serif'
      ctx.textBaseline = 'alphabetic'
      for (const turn of TURNS) {
        const x = turn.start * width
        if ((turn.end - turn.start) * width < 56) continue
        const active = playX >= x && playX <= turn.end * width
        ctx.fillStyle = active ? '#ffffff' : '#555555'
        ctx.fillText(turn.who.toUpperCase(), x, centerY - maxAmp - 20)
        ctx.fillStyle = active ? '#ffffff' : '#262626'
        ctx.fillRect(x, centerY - maxAmp - 14, Math.max(0, (turn.end - turn.start) * width), 1)
      }

      // Timeline ticks every 30s.
      ctx.font = '400 11px Inter, sans-serif'
      const tickY = centerY + maxAmp * 0.8 + 24
      for (let s = 0; s <= CALL_SECONDS; s += 30) {
        const x = (s / CALL_SECONDS) * width
        const major = s % 60 === 0
        ctx.fillStyle = '#3c3c3c'
        ctx.fillRect(x, tickY, 1, major ? 8 : 4)
        if (major && !mobile && x > 24 && x < width - 48) {
          ctx.fillStyle = '#555555'
          ctx.fillText(formatTime(s), x + 6, tickY + 9)
        }
      }

      // Playhead.
      if (progress > 0) {
        const top = centerY - maxAmp - 52
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(Math.round(playX), top, 1, tickY - top + 8)
        ctx.font = '700 12px Inter, sans-serif'
        const label = formatTime(progress * CALL_SECONDS)
        const labelX = Math.min(playX + 8, width - 44)
        ctx.fillText(label, labelX, top + 12)
      }
    }

    const tick = (now: number) => {
      const elapsed = (now - startedAt) % (SWEEP_MS + HOLD_MS)
      draw(Math.min(1, elapsed / SWEEP_MS))
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    resize()
    draw(reduced ? 0.62 : 0)

    const ro = new ResizeObserver(() => {
      resize()
      if (!running) draw(reduced ? 0.62 : 0)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    // Redraw once fonts land so the canvas labels use Inter.
    document.fonts?.ready.then(() => !running && draw(reduced ? 0.62 : 0))
    startedAt = performance.now()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="waveform" role="img" aria-label="Animated waveform of a voice agent call, alternating between agent and caller turns" />
}
