import { motion } from 'motion/react'

export default function SectionHeading({ eyebrow, title, desc, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-xs tracking-widest text-cyan uppercase"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-3 font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink"
      >
        {title}
      </motion.h2>
      {desc && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-ink-dim max-w-xl leading-relaxed"
        >
          {desc}
        </motion.p>
      )}
    </div>
  )
}
