import { motion } from 'motion/react'
import BeforeAfterSlider from './BeforeAfterSlider'
import SectionHeading from './SectionHeading'

const results = [
  { value: '214K', label: 'Views in first 7 days' },
  { value: '18.4K', label: 'Link clicks' },
  { value: '9.7%', label: 'Click-through rate' },
  { value: '3.1x', label: 'ROAS reported by partner' },
]

export default function CaseStudy() {
  return (
    <section id="case-study" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Case Study"
        title="Drag to see what a sponsored tutorial actually delivers."
        desc="FrameWorks Presets sponsored a 12-minute portrait retouching tutorial. This is the transformation taught in that video — and the numbers it drove."
      />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        >
          <BeforeAfterSlider />
          <p className="mt-3 text-center text-xs font-mono text-ink-faint">Drag the handle — this comparison is live</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {results.map((r, i) => (
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
    </section>
  )
}
