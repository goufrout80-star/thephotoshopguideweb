import { motion } from 'motion/react'
import { Check, ArrowUpRight } from 'lucide-react'
import { packages, customPartnership } from '../data/content'
import SectionHeading from './SectionHeading'
import { trackEvent } from '../lib/analytics'

export default function Packages() {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Packages"
        title="Choose the collaboration format that fits your campaign."
        desc="Whether your brand already has campaign content ready or needs a custom creative concept built around the product, every collaboration is shaped to place your brand in front of a focused Photoshop and design audience."
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 110, damping: 16 }}
            className={`relative flex flex-col rounded-2xl border p-7 ${
              pkg.highlight
                ? 'border-cyan/40 bg-panel-2 shadow-[0_0_60px_-20px_rgba(52,211,255,0.35)]'
                : 'border-line bg-panel'
            }`}
          >
            {pkg.highlight && (
              <span className="absolute -top-3 left-7 rounded-full bg-cyan px-3 py-1 text-[11px] font-semibold text-canvas">
                MOST BOOKED
              </span>
            )}
            <h3 className="font-display text-xl text-ink">{pkg.name}</h3>
            <div className="mt-2 font-mono text-2xl text-cyan">{pkg.price}</div>
            <p className="mt-4 text-sm text-ink-dim leading-relaxed">{pkg.desc}</p>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Best for</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {pkg.bestFor.map((f) => (
                  <span key={f} className="rounded-full border border-line bg-panel-2 px-3 py-1 text-xs text-ink-dim">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex-1">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Can include</h4>
              <ul className="mt-3 space-y-3">
                {pkg.canInclude.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-dim">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              onClick={() => trackEvent('package_selected', { package: pkg.name })}
              className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                pkg.highlight
                  ? 'bg-cyan text-canvas hover:bg-ink'
                  : 'border border-line text-ink hover:bg-panel-2'
              }`}
            >
              Start a Custom Campaign
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 110, damping: 16 }}
        className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-panel p-8 sm:p-10"
      >
        <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl text-ink">{customPartnership.name}</h3>
            <p className="mt-3 max-w-2xl text-sm text-ink-dim leading-relaxed">{customPartnership.desc}</p>
          </div>
          <a
            href="#contact"
            onClick={() => trackEvent('package_selected', { package: 'Custom Partnership' })}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-cyan px-6 py-3.5 text-sm font-semibold text-canvas hover:bg-ink transition-colors"
          >
            {customPartnership.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
