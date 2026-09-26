/**
 * The contact band's "photograph": a circuit at night, with light streaks
 * running the racing line. The infield is left empty for the headline.
 */

const TRACK =
  'M300,470 C300,560 380,580 460,580 L1080,580 C1180,580 1220,560 1260,520 C1300,480 1340,500 1380,520 ' +
  'C1460,560 1520,520 1520,440 L1520,220 C1520,130 1460,90 1380,90 L1120,90 C1060,90 1040,130 1000,160 ' +
  'C960,190 900,190 860,160 C820,130 780,90 700,90 L420,90 C330,90 300,140 300,220 L300,300 ' +
  'C300,340 260,360 240,380 C200,420 240,470 300,470 Z'

export function Circuit() {
  return (
    <svg
      className="circuit"
      viewBox="0 0 1600 670"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A racing circuit drawn in thin lines, with streaks of light moving along the track"
    >
      <path d={TRACK} fill="none" stroke="#141414" strokeWidth="26" strokeLinejoin="round" />
      <path d={TRACK} fill="none" stroke="#262626" strokeWidth="1" />
      <path d={TRACK} fill="none" stroke="#3c3c3c" strokeWidth="1" strokeDasharray="2 10" />

      {/* Start / finish */}
      <g transform="translate(720 566)">
        {Array.from({ length: 4 }, (_, i) => (
          <rect key={i} x={i % 2 ? 7 : 0} y={i * 7} width="7" height="7" fill="#fff" />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <rect key={`b${i}`} x={i % 2 ? 0 : 7} y={i * 7} width="7" height="7" fill="#3c3c3c" />
        ))}
      </g>

      <g className="circuit__labels">
        <text x="742" y="620">START / FINISH</text>
        <text x="1548" y="330">S1</text>
        <text x="1240" y="70">S2</text>
        <text x="200" y="300">S3</text>
      </g>

      <path d={TRACK} pathLength={1000} className="circuit__streak circuit__streak--trail" />
      <path d={TRACK} pathLength={1000} className="circuit__streak" />
    </svg>
  )
}
