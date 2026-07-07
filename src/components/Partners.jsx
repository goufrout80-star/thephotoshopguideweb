import { motion } from 'motion/react'
import { Sparkles, Target, MessageSquareQuote } from 'lucide-react'
import SectionHeading from './SectionHeading'

const points = [
  {
    icon: Target,
    text: 'Creative audiences don’t respond to random advertising. They respond to useful ideas, clear demonstrations, and tools that solve real problems inside their workflow.',
  },
  {
    icon: Sparkles,
    text: 'We build the message around what the audience cares about: better design, faster editing, smarter workflows, useful tools, and stronger creative results.',
  },
  {
    icon: MessageSquareQuote,
    text: 'The strongest promotion isn’t just visibility — it’s being shown inside the right creative context, to the right audience, through content they already follow.',
  },
]

export default function Partners() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why Partner With Us"
          title="We make creative products look valuable inside real content."
          desc="Brands work with The Photoshop Guide because we understand how to present a product as part of the creative process — not just a logo placed on the page."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={p.text}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 110, damping: 16 }}
              className="flex flex-col rounded-2xl border border-line bg-panel p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-soft ring-1 ring-cyan/30">
                <p.icon className="h-4 w-4 text-cyan" />
              </span>
              <p className="mt-4 flex-1 text-ink-dim leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
