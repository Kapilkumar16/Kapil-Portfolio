import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { FeaturedProject } from './components/FeaturedProject'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Numbers } from './components/Numbers'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { ExcelScene } from './components/visuals/ExcelScene'
import { Redline } from './components/visuals/Redline'
import { applypilot, excelmind } from './data/content'

// Band rhythm: photo → specs → photo → photo → grid → photo → tabs → photo.
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Numbers />
        <FeaturedProject project={applypilot} figure="02" visual={<Redline />} />
        <FeaturedProject project={excelmind} figure="03" visual={<ExcelScene />} />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
