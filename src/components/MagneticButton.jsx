import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const tags = { a: motion.a, button: motion.button }

export default function MagneticButton({ as = 'a', className = '', children, strength = 0.35, ...props }) {
  const MotionTag = tags[as]
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
