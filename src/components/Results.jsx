import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useMotionValueEvent } from 'motion/react'
import BeforeAfterSlider from './BeforeAfterSlider'
import ResultStatCard from './ResultStatCard'
import SectionHeading from './SectionHeading'
import { resultsMain, resultsSupporting } from '../data/content'

export default function Results() {
  const progress = useMotionValue(0)
  const readoutRef = useRef(null)

  // progress: 0 = fully "before", 100 = fully "after" — everything below
  // reacts to how far the drag has revealed the edit.
  const coloredGlowOpacity = useTransform(progress, [0, 100], [0, 0.9])
  const grayGlowOpacity = useTransform(progress, [0, 100], [0.5, 0])

  useMotionValueEvent(progress, 'change', (v) => {
    if (readoutRef.current) {
      readoutRef.current.textContent = `GRADE +${Math.round(v)}%`
    }
  })

  return (
    <section id="results" className="relative mx-auto max-w-6xl px-6 py-24">
      {/* Ambient glow that crossfades from dull gray to cyan/coral as the
          drag reveals more of the "after" image — the section grades itself. */}
      <motion.div
        style={{ opacity: grayGlowOpacity }}
        className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-ink-faint/20 blur-[110px]"
      />
      <motion.div
        style={{ opacity: coloredGlowOpacity }}
        className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-cyan/40 to-coral/40 blur-[110px]"
      />

      <SectionHeading
        eyebrow="Results"
        title="Built to get brands seen, understood, and remembered."
        desc="Creative audiences don't respond to generic ads. They respond to content that shows them what a product can actually do — content our audience already watches, saves, and shares."
      />

      <div className="relative mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        >
          <BeforeAfterSlider progress={progress} />
          <div className="mt-3 flex items-center justify-center gap-3 text-xs font-mono text-ink-faint">
            <span>Drag the handle — an illustrative look at the kind of transformation we teach</span>
            <span ref={readoutRef} className="shrink-0 rounded-full border border-line bg-panel px-2 py-0.5 text-cyan">
              GRADE +0%
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {resultsMain.map((r, i) => (
            <ResultStatCard
              key={r.label}
              value={r.value}
              label={r.label}
              progress={progress}
              color={['cyan', 'coral', 'gold', 'green'][i % 4]}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {resultsSupporting.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 120, damping: 16 }}
            className="rounded-2xl border border-line bg-panel/60 p-5"
          >
            <div className="font-display text-xl text-ink">{r.value}</div>
            <div className="mt-1 text-xs text-ink-faint">{r.label}</div>
          </motion.div>
        ))}
      </div>

      <p className="relative mt-10 max-w-2xl text-ink-dim leading-relaxed">
        Your brand isn't just posted — it's positioned, explained, and
        showcased to a creative audience that's already looking for tools
        that help them create better work.
      </p>
    </section>
  )
}
