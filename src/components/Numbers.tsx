import { numbers } from '../data/content'
import { Reveal, SpecGrid } from './ui'

export function Numbers() {
  return (
    <section id="numbers" className="section" aria-labelledby="numbers-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="numbers-title" className="display-lg">
            {numbers.title}
          </h2>
          <p className="title-md">{numbers.lead}</p>
        </Reveal>
        <Reveal>
          <SpecGrid specs={numbers.specs} />
        </Reveal>
      </div>
    </section>
  )
}
