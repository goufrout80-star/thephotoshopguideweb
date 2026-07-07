import { motion } from 'motion/react'
import BeforeAfterSlider from './BeforeAfterSlider'
import SectionHeading from './SectionHeading'
import { resultsMain, resultsSupporting } from '../data/content'

export default function Results() {
  return (
    <section id="results" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Results"
        title="Built to get brands seen, understood, and remembered."
        desc="Creative audiences don't respond to generic ads. They respond to content that shows them what a product can actually do — content our audience already watches, saves, and shares."
      />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        >
          <BeforeAfterSlider />
          <p className="mt-3 text-center text-xs font-mono text-ink-faint">
            Drag the handle — an illustrative look at the kind of transformation we teach
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {resultsMain.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 120, damping: 16 }}
              className="rounded-2xl border border-line bg-panel p-6"
            >
              <div className="font-display text-3xl text-cyan">{r.value}</div>
              <div className="mt-2 text-sm text-ink-dim">{r.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
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

      <p className="mt-10 max-w-2xl text-ink-dim leading-relaxed">
        Your brand isn't just posted — it's positioned, explained, and
        showcased to a creative audience that's already looking for tools
        that help them create better work.
      </p>
    </section>
  )
}
