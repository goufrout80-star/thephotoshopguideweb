import { motion, useTransform } from 'motion/react'

const accents = {
  cyan: { text: 'text-cyan', glow: 'bg-cyan', ring: '#34d3ff' },
  coral: { text: 'text-coral', glow: 'bg-coral', ring: '#ff6b4a' },
  gold: { text: 'text-gold', glow: 'bg-gold', ring: '#ffb84d' },
  green: { text: 'text-green', glow: 'bg-green', ring: '#4ade80' },
}

export default function ResultStatCard({ value, label, progress, color = 'cyan', delay = 0 }) {
  const accent = accents[color]

  // At progress 0 the number is a blown-apart RGB misregistration (like a
  // channel-offset print error); it snaps into sharp, saturated focus by 100.
  const textShadow = useTransform(progress, (p) => {
    const offset = ((100 - p) / 100) * 7
    return `-${offset}px 0 0 rgba(255,80,80,0.7), ${offset}px 0 0 rgba(52,211,255,0.7)`
  })
  const filterBlur = useTransform(progress, (p) => `blur(${((100 - p) / 100) * 1.5}px)`)
  const glowOpacity = useTransform(progress, [0, 100], [0, 0.55])
  const ringOpacity = useTransform(progress, [0, 100], [0, 1])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 120, damping: 16 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-panel p-6"
    >
      <motion.div
        style={{ opacity: ringOpacity, borderColor: accent.ring }}
        className="pointer-events-none absolute inset-0 rounded-2xl border-2"
      />
      <motion.div
        style={{ opacity: glowOpacity }}
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full ${accent.glow} blur-2xl`}
      />
      <motion.div
        style={{ textShadow, filter: filterBlur }}
        className={`relative font-display text-3xl ${accent.text}`}
      >
        {value}
      </motion.div>
      <div className="relative mt-2 text-sm text-ink-dim">{label}</div>
    </motion.div>
  )
}
