import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

export function useCountUp(target, { duration = 1.4, decimals = 0 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()
  return { ref, display }
}
