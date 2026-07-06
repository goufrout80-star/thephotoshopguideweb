import { motion } from 'motion/react'
import { pillars } from '../data/content'
import SectionHeading from './SectionHeading'

export default function Pillars() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="What We Make"
        title="Four content formats, one consistent craft."
        desc="Every format is a different door into the same workflow — which means your product can enter wherever it fits best."
      />

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {pillars.map((p, i) => (
          <motion.div
            key={p.tag}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 110, damping: 16 }}
            className="group relative bg-canvas p-8 transition-colors hover:bg-panel"
          >
            <span className="font-mono text-xs text-ink-faint">{p.tag}</span>
            <h3 className="mt-4 font-display text-2xl text-ink">{p.title}</h3>
            <p className="mt-3 text-ink-dim leading-relaxed">{p.desc}</p>
            <div className="absolute bottom-0 left-8 h-px w-0 bg-cyan transition-all duration-300 group-hover:w-12" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
