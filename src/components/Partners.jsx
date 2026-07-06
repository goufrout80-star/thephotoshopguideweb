import { motion } from 'motion/react'
import { Quote } from 'lucide-react'
import { partners, testimonials } from '../data/content'
import SectionHeading from './SectionHeading'

const accents = [
  { bg: 'bg-cyan-soft', text: 'text-cyan', ring: 'ring-cyan/30' },
  { bg: 'bg-coral-soft', text: 'text-coral', ring: 'ring-coral/30' },
  { bg: 'bg-gold-soft', text: 'text-gold', ring: 'ring-gold/30' },
]

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Partners() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Trusted By" title="Brands who've already made the edit." align="center" />
      </div>

      <div className="relative mt-12 border-y border-line bg-panel/60 py-6">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee-slow items-center gap-10 pr-10">
            {[...partners, ...partners].map((p, i) => {
              const accent = accents[i % accents.length]
              return (
                <span key={i} className="flex items-center gap-2.5 whitespace-nowrap">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${accent.bg} ring-1 ${accent.ring}`}
                  >
                    <span className={`font-display text-xs font-semibold ${accent.text}`}>{initials(p)}</span>
                  </span>
                  <span className="font-display text-lg text-ink-dim">{p}</span>
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
        {testimonials.map((t, i) => {
          const accent = accents[i % accents.length]
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 110, damping: 16 }}
              className="flex flex-col rounded-2xl border border-line bg-panel p-6"
            >
              <Quote className="h-5 w-5 text-cyan" />
              <p className="mt-4 flex-1 text-ink-dim leading-relaxed">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${accent.bg} ring-1 ${accent.ring}`}>
                  <span className={`font-display text-xs font-semibold ${accent.text}`}>{initials(t.name)}</span>
                </span>
                <div>
                  <div className="font-medium text-ink text-sm">{t.name}</div>
                  <div className="text-xs text-ink-faint mt-0.5">{t.role}</div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
