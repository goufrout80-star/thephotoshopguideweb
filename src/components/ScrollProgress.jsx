import { motion, useScroll, useSpring } from 'motion/react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        // The site's 70/10/10/10 palette, literally: 70% blue, then
        // red → yellow → green closing out the bar.
        background:
          'linear-gradient(90deg, var(--color-cyan) 0%, var(--color-cyan) 70%, var(--color-coral) 78%, var(--color-gold) 88%, var(--color-green) 100%)',
      }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
    />
  )
}
