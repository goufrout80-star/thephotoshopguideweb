import { motion } from 'motion/react'
import { ArrowUpRight, PlayCircle } from 'lucide-react'
import LayerStack from './LayerStack'
import MagneticButton from './MagneticButton'
import { trackEvent } from '../lib/analytics'

const ticker = [
  '480K SUBSCRIBERS', '12.4M MONTHLY VIEWS', '91% AVG. RETENTION',
  '6.8% ENGAGEMENT', '3 PLATFORMS', 'MEDIA KIT 2026',
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
            className="font-display text-[13vw] sm:text-6xl lg:text-[4.2rem] font-medium leading-[0.98] tracking-tight text-ink"
          >
            Photoshop,
            <br />
            decoded for
            <br />
            <span className="text-cyan">the next</span> generation.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 max-w-md text-lg text-ink-dim"
          >
            480K creators already trust The Photoshop Guide for tutorials,
            presets, and gear reviews we'd actually recommend to a friend.
            Let's make your product the next thing they fall in love with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="/media-kit.html"
              target="_blank"
              rel="noopener"
              onClick={() => trackEvent('media_kit_opened')}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-canvas transition-colors hover:bg-cyan active:scale-[0.97]"
            >
              Get the media kit
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <a
              href="#case-study"
              onClick={() => trackEvent('past_campaign_clicked')}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink-dim hover:text-ink hover:border-ink-dim transition-colors"
            >
              <PlayCircle className="h-4 w-4" />
              See a past campaign
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
