import { useEffect, useRef } from 'react'
import { prefersReducedMotion, useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'

/**
 * The experience band's "photograph": the LangGraph scheduling agent on top,
 * and the VoiceQA loop underneath that calls it, scores it and tunes it.
 */

type Node = { x: number; y: number; w: number; h: number; title: string; sub?: string; hot?: boolean }

const NODES: Node[] = [
  // Production lane
  { x: 560, y: 170, w: 180, h: 56, title: 'Inbound call', sub: 'Full-duplex voice' },
  { x: 800, y: 170, w: 180, h: 56, title: 'Intent router', sub: 'LangGraph state', hot: true },
  { x: 1050, y: 90, w: 150, h: 44, title: 'Book' },
  { x: 1050, y: 170, w: 150, h: 44, title: 'Reschedule' },
  { x: 1050, y: 250, w: 150, h: 44, title: 'Transfer' },
  { x: 1260, y: 170, w: 150, h: 56, title: 'Tool calls', sub: 'Calendar · CRM' },
  { x: 1440, y: 170, w: 130, h: 56, title: 'Resolved', sub: '20 → 8 min' },
  // Evaluation lane
  { x: 560, y: 440, w: 160, h: 56, title: 'Scenario file', sub: 'One per agent' },
  { x: 775, y: 440, w: 160, h: 56, title: 'Test call', sub: 'Scripted caller' },
  { x: 990, y: 440, w: 160, h: 56, title: 'Transcript', sub: 'Webhook ingest' },
  { x: 1205, y: 440, w: 160, h: 56, title: 'LLM analysis', sub: 'Stage 1 · free-form', hot: true },
  { x: 1420, y: 440, w: 160, h: 56, title: 'Pass / fail', sub: 'Stage 2 · rubric' },
  { x: 1420, y: 580, w: 160, h: 56, title: 'PostgreSQL', sub: 'Pass rates · trends' },
]

const EDGES: { d: string; dashed?: boolean }[] = [
  { d: 'M740,170 H800' },
  { d: 'M980,170 C1015,170 1015,90 1050,90' },
  { d: 'M980,170 H1050' },
  { d: 'M980,170 C1015,170 1015,250 1050,250' },
  { d: 'M1200,90 C1230,90 1230,170 1260,170' },
  { d: 'M1200,170 H1260' },
  { d: 'M1200,250 C1230,250 1230,170 1260,170' },
  { d: 'M1410,170 H1440' },
  { d: 'M720,440 H775' },
  { d: 'M935,440 H990' },
  { d: 'M1150,440 H1205' },
  { d: 'M1365,440 H1420' },
  { d: 'M1500,468 V552' },
  { d: 'M855,412 V305 H650 V198', dashed: true },
  { d: 'M1500,412 V330 H890 V198', dashed: true },
]

export function AgentGraph() {
  const svgRef = useRef<SVGSVGElement>(null)
  const inView = useInView(svgRef)
  const mobile = useMediaQuery('(max-width: 767px)')
  const animate = !prefersReducedMotion()

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !animate) return
    if (inView) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [inView, animate])

  return (
    <svg
      ref={svgRef}
      className="agent-graph"
      viewBox={mobile ? '520 40 1080 620' : '0 0 1600 720'}
      preserveAspectRatio={mobile ? 'xMidYMid meet' : 'xMaxYMid slice'}
      role="img"
      aria-label="Diagram: a LangGraph scheduling agent routes inbound calls to booking, rescheduling and transfer tools, while VoiceQA fires test calls, scores transcripts in two LLM stages, stores results and feeds tuning back to the agent"
    >
      <defs>
        <pattern id="ag-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#0f0f0f" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="1600" height="720" fill="url(#ag-grid)" />

      <text x="560" y="116" className="ag-lane">
        Production — scheduling agent
      </text>
      <text x="560" y="392" className="ag-lane">
        VoiceQA — evaluation loop
      </text>
      <text x="668" y="296" className="ag-note">
        Test calls
      </text>
      <text x="1010" y="322" className="ag-note">
        Tune personas · routing · tools
      </text>

      {EDGES.map((edge) => (
        <path
          key={edge.d}
          d={edge.d}
          fill="none"
          stroke={edge.dashed ? '#555' : '#3c3c3c'}
          strokeWidth="1.5"
          strokeDasharray={edge.dashed ? '6 6' : undefined}
        />
      ))}

      {NODES.map((node) => (
        <g key={node.title} transform={`translate(${node.x} ${node.y - node.h / 2})`}>
          <rect width={node.w} height={node.h} fill="#0d0d0d" stroke={node.hot ? '#ffffff' : '#3c3c3c'} />
          <text x="14" y={node.sub ? 24 : node.h / 2 + 5} className="ag-title">
            {node.title}
          </text>
          {node.sub && (
            <text x="14" y="42" className="ag-sub">
              {node.sub}
            </text>
          )}
        </g>
      ))}

      {animate &&
        EDGES.map((edge, i) => (
          <rect key={`p-${edge.d}`} x="-3" y="-3" width="6" height="6" fill="#fff">
            <animateMotion dur={edge.dashed ? '4.5s' : '2.4s'} begin={`-${((i * 0.37) % 2.4).toFixed(2)}s`} repeatCount="indefinite" path={edge.d} />
          </rect>
        ))}
    </svg>
  )
}
