import './Redline.css'

/**
 * ApplyPilot's tailor view as a photographed document: a word-level redline,
 * the verifier's verdicts, the match breakdown and the parse-back report.
 * Weights are the real defaults from app/matching/score.py; scores are examples.
 */

const DIMENSIONS: [string, number, number][] = [
  ['Required skills', 0.28, 0.86],
  ['Relevance', 0.2, 0.74],
  ['Location', 0.14, 1],
  ['Seniority', 0.13, 0.9],
  ['Title', 0.12, 0.68],
  ['Preferred skills', 0.07, 0.57],
  ['Keywords', 0.03, 0.8],
  ['Education', 0.03, 1],
]

export function Redline() {
  return (
    <div className="redline" role="img" aria-label="Illustration of ApplyPilot's tailor view: a résumé bullet redline, verifier verdicts, match dimensions and a parse-back report">
      <div className="redline__sheet" aria-hidden="true">
        <header className="redline__head">
          <span className="redline__tab is-active">Tailor</span>
          <span className="redline__tab">Match</span>
          <span className="redline__tab">Report</span>
          <span className="redline__job">Backend Engineer, GenAI · Bengaluru</span>
        </header>

        <div className="redline__row">
          <p className="redline__text">
            <del>Built</del> <ins>Designed</ins> a RAG service for <del>documents</del>{' '}
            <ins>contract analysis</ins>, with SSE streaming and a regex fallback that holds under rate limits.
          </p>
          <div className="redline__meta">
            <span>−2 +3 · 14 kept</span>
            <span className="verdict verdict--ok">Supported · 2 facts</span>
          </div>
        </div>

        <div className="redline__row">
          <p className="redline__text">
            Cut p95 query latency <ins>by 40%</ins> with Redis caching across the analysis layer.
          </p>
          <div className="redline__meta">
            <span>−0 +2 · 11 kept</span>
            <span className="verdict verdict--blocked">Blocked · “40%” has no evidence</span>
          </div>
        </div>

        <div className="redline__split">
          <div className="redline__dims">
            <p className="redline__heading">Match · 8 dimensions</p>
            {DIMENSIONS.map(([name, weight, score]) => (
              <div className="redline__dim" key={name}>
                <span>{name}</span>
                <span className="redline__weight">{weight.toFixed(2)}</span>
                <span className="redline__track">
                  <span style={{ width: `${score * 100}%` }} />
                </span>
              </div>
            ))}
          </div>

          <div className="redline__report">
            <p className="redline__heading">Parse-back</p>
            <div className="redline__finding">
              <span>Parser A</span>
              <strong>98%</strong>
              <em>Measured</em>
            </div>
            <div className="redline__finding">
              <span>Parser B</span>
              <strong>96%</strong>
              <em>Measured</em>
            </div>
            <div className="redline__finding">
              <span>Hidden text</span>
              <strong>0</strong>
              <em>Measured</em>
            </div>
            <div className="redline__finding is-unknown">
              <span>ATS rank</span>
              <strong>—</strong>
              <em>Not measurable</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
