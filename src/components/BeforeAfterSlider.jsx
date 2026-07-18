import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useTransform, useMotionValueEvent, useReducedMotion, useInView, animate } from 'motion/react'
import { MoveHorizontal } from 'lucide-react'

export default function BeforeAfterSlider({ progress }) {
  const ref = useRef(null)
  const [beforeFailed, setBeforeFailed] = useState(false)
  const [afterFailed, setAfterFailed] = useState(false)
  const [ariaPos, setAriaPos] = useState(Math.round(progress.get()))
  const dragging = useRef(false)
  const interacted = useRef(false)
  const teaseInterval = useRef(null)
  const teaseControls = useRef(null)
  const reducedMotion = useReducedMotion()
  const inView = useInView(ref, { amount: 0.5 })

  useMotionValueEvent(progress, 'change', (v) => {
    const rounded = Math.round(v)
    setAriaPos((prev) => (prev === rounded ? prev : rounded))
  })

  const clipPath = useTransform(progress, (p) => `inset(0 ${100 - p}% 0 0)`)
  const handleLeft = useTransform(progress, (p) => `${p}%`)

  const stopTease = useCallback(() => {
    interacted.current = true
    if (teaseInterval.current) clearInterval(teaseInterval.current)
    teaseControls.current?.stop()
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      progress.set(50)
      return
    }
    if (!inView || interacted.current) return

    teaseInterval.current = setInterval(() => {
      if (interacted.current) return
      // progress: 0 = fully "before", 100 = fully "after" — peek toward
      // "after" and back, never touching it until the user actually drags.
      teaseControls.current = animate(progress, [0, 45, 0], {
        duration: 2.2,
        ease: 'easeInOut',
      })
    }, 5000)

    return () => clearInterval(teaseInterval.current)
  }, [inView, reducedMotion, progress])

  const updateFromClientX = useCallback(
    (clientX) => {
      const rect = ref.current.getBoundingClientRect()
      const pct = ((clientX - rect.left) / rect.width) * 100
      progress.set(Math.min(100, Math.max(0, pct)))
    },
    [progress]
  )

  const onPointerDown = (e) => {
    stopTease()
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX)
  }
  const stopDrag = () => {
    dragging.current = false
  }

  const onKeyDown = (e) => {
    stopTease()
    if (e.key === 'ArrowLeft') progress.set(Math.max(0, progress.get() - 4))
    if (e.key === 'ArrowRight') progress.set(Math.min(100, progress.get() + 4))
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onKeyDown={onKeyDown}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaPos}
      className="relative aspect-16/10 w-full select-none overflow-hidden rounded-2xl border border-line cursor-ew-resize touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
    >
      {/* BEFORE layer — flat, underlit, dull grade */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a3f4a] to-[#22242c] grayscale">
        <div className="absolute left-1/2 top-[20%] h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#6b7180,#565c68_75%)] shadow-[inset_-6px_-8px_16px_rgba(0,0,0,0.4)]" />
        <div className="absolute left-1/2 top-[42%] h-36 w-52 -translate-x-1/2 rounded-t-[4rem] bg-[radial-gradient(circle_at_30%_10%,#5a606c,#4a5058_70%)] shadow-[inset_-8px_-10px_20px_rgba(0,0,0,0.4)]" />

        {/* Real "before" photo — drop a file at public/images/before-after-before.jpg
            and it replaces the illustration above automatically. */}
        {!beforeFailed && (
          <img
            src="/images/before-after-before.jpg"
            alt=""
            onError={() => setBeforeFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-mono text-white/70">BEFORE</span>
      </div>

      {/* AFTER layer — graded, clipped by slider */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff9d6c] via-[#ff6b4a] to-[#1a1030]">
          <div className="absolute left-1/2 top-[20%] h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_28%,#ffe6cc,#e8875f_75%)] shadow-[inset_-6px_-8px_16px_rgba(60,20,10,0.35)]" />
          <div className="absolute left-1/2 top-[42%] h-36 w-52 -translate-x-1/2 rounded-t-[4rem] bg-[radial-gradient(circle_at_30%_8%,#ffdcb8,#d97a52_70%)] shadow-[inset_-8px_-10px_20px_rgba(60,20,10,0.35)]" />

          {/* Real "after" photo — drop a file at public/images/before-after-after.jpg
              (same subject/framing as before-after-before.jpg) and it replaces
              the illustration above automatically. */}
          {!afterFailed && (
            <img
              src="/images/before-after-after.jpg"
              alt=""
              onError={() => setAfterFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-cyan/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-mono text-white">AFTER</span>
      </motion.div>

      {/* Handle */}
      <motion.div
        className="absolute inset-y-0 z-10 flex items-center justify-center"
        style={{ left: handleLeft, transform: 'translateX(-50%)' }}
      >
        <div className="absolute inset-y-0 w-px bg-ink/70" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/40 bg-canvas/90 shadow-lg backdrop-blur">
          <MoveHorizontal className="h-4 w-4 text-ink" />
        </div>
      </motion.div>
    </div>
  )
}
