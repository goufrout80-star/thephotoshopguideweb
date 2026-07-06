import { useEffect, useState } from 'react'

export default function BrushCursor() {
  const [pos, setPos] = useState(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isFine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFine || reduced) return

    const onMove = (e) => {
      const target = e.target.closest('[data-brush-cursor]')
      if (target) {
        setEnabled(true)
        setPos({ x: e.clientX, y: e.clientY })
      } else {
        setEnabled(false)
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  if (!enabled || !pos) return null

  return <div className="brush-cursor" style={{ left: pos.x, top: pos.y }} />
}
