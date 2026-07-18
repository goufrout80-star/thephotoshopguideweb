import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

// Text-only boot screen. Only appears during a genuine first load: if the
// document is already complete when React mounts (warm cache, instant
// revisit, bfcache restore), it never renders at all. A hard 4s cap
// guarantees it can never trap the page behind a stuck loader.
export default function Loader() {
  const [show, setShow] = useState(
    () => typeof document !== 'undefined' && document.readyState !== 'complete'
  )
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!show) return
    const done = () => setShow(false)
    window.addEventListener('load', done, { once: true })
    const cap = setTimeout(done, 4000)
    return () => {
      window.removeEventListener('load', done)
      clearTimeout(cap)
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: reducedMotion ? 0.1 : 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-canvas"
          aria-label="Loading"
          role="status"
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink"
            >
              The Photoshop Guide
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.4 }}
            className="font-mono text-xs tracking-widest text-ink-faint uppercase"
          >
            Preparing the canvas
          </motion.p>

          {/* Swatch strip — the palette loads in, one chip at a time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.5 }}
            className="flex items-center gap-2"
          >
            {['bg-cyan', 'bg-coral', 'bg-gold', 'bg-green'].map((c, i) => (
              <motion.span
                key={c}
                animate={reducedMotion ? {} : { opacity: [0.15, 1, 0.15], scale: [1, 1.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                className={`h-2 w-2 rounded-full ${c}`}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
