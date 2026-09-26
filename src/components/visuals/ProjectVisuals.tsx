import type { ProjectVisual } from '../../data/content'
import './ProjectVisuals.css'

/** 16:9 technical "photographs" for the project cards. Figures are illustrative. */

const W = 640
const H = 360

function rand(seed: number) {
  const x = Math.sin(seed * 91.7 + 7.3) * 10000
  return x - Math.floor(x)
}

function ContractDoc() {
  const lines = Array.from({ length: 15 }, (_, i) => i)
  const flagged: Record<number, { label: string; level: string; color: string }> = {
    2: { label: 'INDEMNIFICATION', level: 'HIGH', color: '#f4b400' },
    7: { label: 'AUTO-RENEWAL', level: 'MED', color: '#bbbbbb' },
    11: { label: 'TERMINATION', level: 'LOW', color: '#7e7e7e' },
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pv" fill="#bbbbbb" aria-hidden="true">
      <rect width={W} height={H} fill="#000" />
      {/* Page */}
      <rect x="40" y="24" width="300" height="360" fill="#0d0d0d" stroke="#262626" />
      <text x="64" y="56" className="pv-label" fill="#fff">
        MASTER SERVICES AGREEMENT
      </text>
      <text x="64" y="72" className="pv-small" fill="#555">
        PDF · 14 PAGES · 212 CHUNKS EMBEDDED
      </text>
      {lines.map((i) => {
        const y = 96 + i * 16
        const w = i % 5 === 4 ? 120 : 200 + rand(i + 3) * 52
        const flag = flagged[i]
        return (
          <g key={i}>
            {flag && <rect x="56" y={y - 6} width="268" height="30" fill="none" stroke={flag.color} />}
            <rect x="64" y={y} width={w} height="4" fill={flag ? '#bbbbbb' : '#2b2b2b'} />
            {flag && <rect x="64" y={y + 10} width={w * 0.7} height="4" fill="#7e7e7e" />}
          </g>
        )
      })}
      {Object.entries(flagged).map(([i, flag]) => {
        const y = 96 + Number(i) * 16 + 10
        return (
          <g key={i}>
            <line x1="324" x2="364" y1={y} y2={y} stroke={flag.color} />
            <text x="372" y={y - 2} className="pv-label" fill={flag.color}>
              {flag.label}
            </text>
            <text x="372" y={y + 13} className="pv-small" fill="#7e7e7e">
              RISK · {flag.level}
            </text>
          </g>
        )
      })}

      {/* Streamed answer */}
      <rect x="372" y="250" width="236" height="84" fill="#1a1a1a" />
      <text x="388" y="274" className="pv-small" fill="#7e7e7e">
        Q · WHAT IS THE NOTICE PERIOD?
      </text>
      <text x="388" y="298" className="pv-body" fill="#e6e6e6">
        60 days, in writing (§ 9.2)
      </text>
      <rect x="566" y="287" width="8" height="14" fill="#fff" className="pv-cursor" />
      <text x="388" y="320" className="pv-small" fill="#555">
        SSE · LLM → REGEX FALLBACK
      </text>
    </svg>
  )
}

function Telemetry() {
  const points = (seed: number, base: number, amp: number) =>
    Array.from({ length: 49 }, (_, i) => {
      const v = base + Math.sin(i / 4 + seed) * amp * 0.5 + (rand(i + seed * 13) - 0.5) * amp
      return `${300 + i * 6.5},${Math.max(0, Math.min(1, v))}`
    })

  const toPath = (pts: string[], top: number, h: number) =>
    pts
      .map((p, i) => {
        const [x, v] = p.split(',').map(Number)
        return `${i ? 'L' : 'M'}${x.toFixed(1)},${(top + h - v * h).toFixed(1)}`
      })
      .join(' ')

  const cpu = toPath(points(1, 0.46, 0.5), 60, 110)
  const mem = toPath(points(4, 0.62, 0.12), 214, 90)

  const tree = [
    { pid: '1', name: 'systemd', depth: 0 },
    { pid: '812', name: 'monitor-agent', depth: 1 },
    { pid: '944', name: 'gunicorn', depth: 1 },
    { pid: '951', name: 'worker', depth: 2 },
    { pid: '952', name: 'worker', depth: 2 },
    { pid: '1207', name: 'daphne', depth: 1 },
    { pid: '1311', name: 'redis-server', depth: 1 },
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pv" fill="#bbbbbb" aria-hidden="true">
      <rect width={W} height={H} fill="#0d0d0d" />

      {/* Process tree */}
      <text x="32" y="44" className="pv-label" fill="#fff">
        PID TREE · HOST-07
      </text>
      {tree.map((p, i) => {
        const y = 76 + i * 30
        const x = 40 + p.depth * 20
        return (
          <g key={p.pid}>
            {p.depth > 0 && <path d={`M${x - 12},${y - 22} V${y - 4} H${x - 2}`} fill="none" stroke="#3c3c3c" />}
            <rect x={x} y={y - 9} width="6" height="6" fill={i === 1 ? '#fff' : '#3c3c3c'} />
            <text x={x + 14} y={y - 2} className="pv-small" fill={i === 1 ? '#fff' : '#bbbbbb'}>
              {p.pid}
            </text>
            <text x={x + 52} y={y - 2} className="pv-small" fill="#7e7e7e">
              {p.name}
            </text>
          </g>
        )
      })}

      {/* Charts */}
      {[60, 214].map((top, i) => (
        <g key={top}>
          {[0, 1, 2, 3].map((g) => (
            <line key={g} x1="300" x2="612" y1={top + g * (i ? 30 : 36.7)} y2={top + g * (i ? 30 : 36.7)} stroke="#1a1a1a" />
          ))}
        </g>
      ))}
      <text x="300" y="44" className="pv-label" fill="#fff">
        CPU %
      </text>
      <text x="612" y="44" textAnchor="end" className="pv-strong" fill="#fff">
        47.2
      </text>
      <path d={cpu} fill="none" stroke="#fff" strokeWidth="1.5" className="pv-trace" />
      <text x="300" y="200" className="pv-label" fill="#bbbbbb">
        MEMORY
      </text>
      <text x="612" y="200" textAnchor="end" className="pv-strong" fill="#bbbbbb">
        6.1 GB
      </text>
      <path d={mem} fill="none" stroke="#7e7e7e" strokeWidth="1.5" />

      <circle cx="306" cy="334" r="3" fill="#0fa336" className="pv-live" />
      <text x="316" y="338" className="pv-small" fill="#7e7e7e">
        WEBSOCKET · CHANNELS + REDIS · LIVE
      </text>
    </svg>
  )
}

export function ProjectVisualArt({ kind }: { kind: ProjectVisual }) {
  if (kind === 'contract') return <ContractDoc />
  return <Telemetry />
}
