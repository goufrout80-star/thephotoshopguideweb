import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { packages } from '../data/content'
import SectionHeading from './SectionHeading'
import { trackEvent } from '../lib/analytics'

export default function Packages() {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Packages"
        title="Three ways to work together."
        desc="Every campaign starts with a call to align on creative and goals — pricing flexes with usage rights and exclusivity."
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
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
            <ul className="mt-6 space-y-3 flex-1">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink-dim">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => trackEvent('package_selected', { package: pkg.name })}
              className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                pkg.highlight
                  ? 'bg-cyan text-canvas hover:bg-ink'
                  : 'border border-line text-ink hover:bg-panel-2'
              }`}
            >
              Start a brief
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
