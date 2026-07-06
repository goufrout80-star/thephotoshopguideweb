import { motion } from 'motion/react'
import { useCountUp } from '../hooks/useCountUp'
import { stats, platforms, demographics, geo } from '../data/content'
import SectionHeading from './SectionHeading'

function StatCard({ stat, i }) {
  const decimals = String(stat.value).includes('.') ? 1 : 0
  const { ref, display } = useCountUp(stat.value, { decimals })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, type: 'spring', stiffness: 120, damping: 16 }}
      className="rounded-2xl border border-line bg-panel p-6"
    >
      <div className="font-display text-4xl font-medium text-ink tabular-nums">
        {display}
        <span className="text-cyan">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-sm text-ink-dim">{stat.label}</div>
      <div className="mt-1 text-xs font-mono text-ink-faint">{stat.sub}</div>
    </motion.div>
  )
}

function Bar({ label, value, i, color = 'bg-cyan' }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="text-ink-dim">{label}</span>
        <span className="font-mono text-ink-faint">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-panel-2 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: value / 100 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section id="audience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="The Numbers"
        title="An audience that actually opens Photoshop."
        desc="Not just impressions — creators, students, and working designers who follow through on what they watch."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} i={i} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-2xl border border-line bg-panel p-6">
          <h3 className="font-display text-lg text-ink mb-5">Platform split</h3>
          <div className="space-y-4">
            {platforms.map((p, i) => (
              <Bar key={p.name} label={p.name} value={p.value} i={i} color="bg-cyan" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 rounded-2xl border border-line bg-panel p-6">
          <h3 className="font-display text-lg text-ink mb-5">Age breakdown</h3>
          <div className="space-y-4">
            {demographics.map((d, i) => (
              <Bar key={d.label} label={d.label} value={d.value} i={i} color="bg-coral" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 rounded-2xl border border-line bg-panel p-6">
          <h3 className="font-display text-lg text-ink mb-5">Top geographies</h3>
          <div className="space-y-4">
            {geo.map((g, i) => (
              <Bar key={g.label} label={g.label} value={g.value} i={i} color="bg-gold" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
