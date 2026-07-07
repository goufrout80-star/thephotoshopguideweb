import { motion } from 'motion/react'
import { useCountUp } from '../hooks/useCountUp'
import { stats, reelStats, demographics } from '../data/content'
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

function Bar({ label, value, i, color = 'bg-coral' }) {
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
        eyebrow="The Audience"
        title="A global creative audience built for brands in design, editing, and visual tools."
        desc="This is not a general lifestyle audience. It's a focused creative community built around Photoshop, design education, visual workflows, and practical creative content."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} i={i} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-panel p-6">
          <h3 className="font-display text-lg text-ink mb-5">Age breakdown</h3>
          <div className="space-y-4">
            {demographics.map((d, i) => (
              <Bar key={d.label} label={d.label} value={d.value} i={i} color="bg-coral" />
            ))}
          </div>
          <p className="mt-5 text-xs text-ink-faint leading-relaxed">
            83% of the audience is between 18 and 34 — especially relevant for brands
            reaching young designers, creators, students, freelancers, and creative professionals.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-6">
          <h3 className="font-display text-lg text-ink mb-5">Reel performance</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {reelStats.map((r) => (
              <div key={r.label}>
                <div className="font-display text-xl text-cyan">{r.value}</div>
                <div className="mt-1 text-xs text-ink-faint">{r.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-ink-faint leading-relaxed">
            Reels generate over 93% of total content views and 99% of total
            interactions — the format already driving the most discovery on the page.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-panel p-6">
          <div className="font-display text-2xl text-ink">Strong U.S. market presence</div>
          <p className="mt-2 text-sm text-ink-dim">
            7.8% of the audience is U.S.-based, with meaningful reach across the rest of the world.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-6">
          <div className="font-display text-2xl text-ink">28% from non-followers</div>
          <p className="mt-2 text-sm text-ink-dim">
            The content continues to reach beyond the existing follower base — discoverable, and capable of introducing brands to new creative audiences.
          </p>
        </div>
      </div>
    </section>
  )
}
