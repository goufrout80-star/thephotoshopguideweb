import Nav from './components/Nav'
import Hero from './components/Hero'
import StatsSection from './components/StatsSection'
import Pillars from './components/Pillars'
import CaseStudy from './components/CaseStudy'
import Partners from './components/Partners'
import Packages from './components/Packages'
import ContactFooter from './components/ContactFooter'
import ScrollProgress from './components/ScrollProgress'
import BrushCursor from './components/BrushCursor'
import ToolDock from './components/ToolDock'
import { ToolProvider } from './context/ToolContext'

function App() {
  return (
    <ToolProvider>
      <div className="min-h-screen bg-canvas">
        <div className="grain-overlay" />
        <ScrollProgress />
        <BrushCursor />
        <ToolDock />
        <Nav />
        <Hero />
        <StatsSection />
        <Pillars />
        <CaseStudy />
        <Partners />
        <Packages />
        <ContactFooter />
      </div>
    </ToolProvider>
  )
}

export default App
