import { motion } from 'motion/react'
import { ArrowUpRight, Layers } from 'lucide-react'
import LayerStack from './LayerStack'
import MagneticButton from './MagneticButton'
import { trackEvent } from '../lib/analytics'

const ticker = [
  '136K+ FOLLOWERS', '1.35M+ CONTENT VIEWS', '83% AGED 18–34',
  '7.8% U.S. AUDIENCE', '863K REEL VIEWS', '47K+ INTERACTIONS',
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-44">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-0 h-[360px] w-[360px] rounded-full bg-coral/10 blur-[100px]" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-xs font-mono text-ink-dim"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            OPEN FOR Q3 2026 PARTNERSHIPS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 100, damping: 16 }}
            className="font-display text-[9.5vw] sm:text-5xl lg:text-[3.4rem] font-medium leading-[1.05] tracking-tight text-ink"
          >
            Where creative brands meet one of the biggest
            <span className="text-cyan"> Photoshop and design</span> communities online.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 max-w-md text-lg text-ink-dim"
          >
            The Photoshop Guide connects brands with a large, focused audience
            of designers, editors, creators, and Photoshop users who actively
            follow content around visual creativity, editing, and better
            design workflows.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-4 max-w-md text-sm text-ink-faint leading-relaxed"
          >
            If your brand helps people create, edit, design, or improve their
            workflow, The Photoshop Guide is the right place to be seen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#contact"
              onClick={() => trackEvent('partner_cta_clicked')}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-cyan active:scale-[0.97]"
            >
              Partner With Us
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <a
              href="#packages"
              onClick={() => trackEvent('view_packages_clicked')}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink-dim hover:text-ink hover:border-ink-dim transition-colors"
            >
              <Layers className="h-4 w-4" />
              View Packages
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 90, damping: 16 }}
        >
          <LayerStack />
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <div className="relative mt-20 border-y border-line bg-panel/60 py-4">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-xs tracking-widest text-ink-faint">
                {t}
                <span className="text-cyan">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
