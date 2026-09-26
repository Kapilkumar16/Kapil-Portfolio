import './ExcelScene.css'

/**
 * ExcelMind as a photograph: a sheet of millions of rows receding into the
 * dark, and the chat panel answering a question over it through the guard.
 * Figures are examples.
 */

const COLUMNS = ['REGION', 'CATEGORY', 'SKU', 'QUARTER', 'UNITS', 'REVENUE', 'MARGIN', 'CHANNEL']
const HOT = 5
const ROWS = 30

function rand(seed: number) {
  const x = Math.sin(seed * 78.233 + 12.9898) * 43758.5453
  return x - Math.floor(x)
}

const RESULTS: [string, number, string][] = [
  ['Electronics', 1, '+18.4%'],
  ['Home', 0.61, '+11.2%'],
  ['Apparel', 0.43, '+7.9%'],
  ['Grocery', 0.17, '+3.1%'],
  ['Toys', 0.08, '−2.4%'],
]

function Sheet() {
  const colW = 200
  const rowH = 32
  return (
    <svg className="xscene__sheet" viewBox={`0 0 ${COLUMNS.length * colW} ${(ROWS + 1) * rowH}`} aria-hidden="true">
      <rect width="100%" height={rowH} fill="#1a1a1a" />
      {COLUMNS.map((name, c) => (
        <text key={name} x={c * colW + 16} y={21} className={c === HOT ? 'is-hot' : ''}>
          {name}
        </text>
      ))}
      {Array.from({ length: ROWS }, (_, r) => (
        <g key={r} transform={`translate(0 ${(r + 1) * rowH})`}>
          <line x1="0" x2={COLUMNS.length * colW} y1={rowH} y2={rowH} stroke="#1a1a1a" />
          {COLUMNS.map((name, c) => (
            <rect
              key={name}
              x={c * colW + 16}
              y={13}
              width={24 + rand(r * 11 + c) * (colW - 64)}
              height={6}
              fill={c === HOT ? '#e6e6e6' : '#2b2b2b'}
            />
          ))}
        </g>
      ))}
      {COLUMNS.map((name, c) => (
        <line key={name} x1={c * colW} x2={c * colW} y1="0" y2={(ROWS + 1) * rowH} stroke="#1a1a1a" />
      ))}
      <rect x={HOT * colW} y="0" width={colW} height={(ROWS + 1) * rowH} fill="none" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}

export function ExcelScene() {
  return (
    <div className="xscene" role="img" aria-label="Illustration of ExcelMind: a large spreadsheet receding into the distance, with a chat panel answering a question through a guarded SQL query">
      <div className="xscene__floor" aria-hidden="true">
        <Sheet />
      </div>

      <div className="xscene__panel" aria-hidden="true">
        <header className="xscene__head">
          <span className="xscene__tab is-active">Chat</span>
          <span className="xscene__tab">Viewer</span>
          <span className="xscene__tab">Dashboard</span>
          <span className="xscene__file">sales_2025.xlsx · 2,418,660 rows</span>
        </header>

        <p className="xscene__question">Which category grew most quarter over quarter?</p>

        <div className="xscene__stages">
          <span>Embed</span>
          <span>Retrieve</span>
          <span>SQL</span>
          <span className="is-ok">Guard ✓</span>
          <span className="is-ok">DuckDB · 84 ms</span>
        </div>

        <pre className="xscene__sql">
          <b>SELECT</b> category, quarter, <b>SUM</b>(revenue) <b>AS</b> rev{'\n'}
          <b>FROM</b> <mark>data</mark>{'\n'}
          <b>GROUP BY</b> category, quarter <b>ORDER BY</b> rev <b>DESC</b>
        </pre>
        <p className="xscene__bound">FROM bound to read_parquet('azure://…/sheet.parquet')</p>

        <div className="xscene__chart">
          {RESULTS.map(([name, share, delta]) => (
            <div className="xscene__bar" key={name}>
              <span>{name}</span>
              <span className="xscene__track">
                <span style={{ width: `${share * 100}%` }} />
              </span>
              <span className="xscene__delta">{delta}</span>
            </div>
          ))}
        </div>

        <p className="xscene__answer">
          Electronics grew most, up 18.4% on Q2, driven by the online channel
          <span className="xscene__cursor" />
        </p>
      </div>
    </div>
  )
}
