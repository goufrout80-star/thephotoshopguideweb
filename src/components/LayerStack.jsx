import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { Sliders, Palette, Wand2, Image, Sparkles, Type as TypeIcon } from 'lucide-react'
import { useTool } from '../context/ToolContext'

// `tag` = Photoshop-style layer color label (the colored strip layers get
// in the real Layers panel) — carries the site's 4-color system diegetically.
const layers = [
  { icon: Image, label: 'Background', tone: 'bg-panel-2', tag: 'bg-cyan', offset: 0 },
  { icon: Wand2, label: 'Retouch — Skin', tone: 'bg-panel-2', tag: 'bg-green', offset: 1 },
  { icon: Palette, label: 'Color Grade', tone: 'bg-coral-soft', tag: 'bg-coral', offset: 2 },
  { icon: Sliders, label: 'Curves + Dodge', tone: 'bg-gold-soft', tag: 'bg-gold', offset: 3 },
]

const toolCopy = {
  move: 'Move — drag the canvas to look around',
  lasso: 'Lasso — selecting the subject',
  wand: 'Magic Wand — analyzing the full image',
  brush: 'Brush — retouching skin tones',
  eraser: 'Eraser — revealing the layer below',
  eyedropper: 'Eyedropper — click the photo to sample its real color',
  type: 'Type — adding a headline layer',
  crop: 'Crop — framing the composition',
}

function hexFromRgb(r, g, b) {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

export default function LayerStack() {
  const ref = useRef(null)
  const photoRef = useRef(null)
  const imgElRef = useRef(null)
  const canvasRef = useRef(null)
  const { activeTool } = useTool()
  const [photoFailed, setPhotoFailed] = useState(false)
  const [photoReady, setPhotoReady] = useState(false)
  const [pickedColor, setPickedColor] = useState(null)
  const [pickPos, setPickPos] = useState({ x: 50, y: 70 })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const handlePhotoLoad = () => {
    const img = imgElRef.current
    const canvas = canvasRef.current
    if (!img || !canvas) return
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    canvas.getContext('2d').drawImage(img, 0, 0)
    setPhotoReady(true)
  }

  const handlePhotoClick = (e) => {
    if (activeTool !== 'eyedropper') return
    const img = imgElRef.current
    const canvas = canvasRef.current
    if (!img || !canvas || !photoReady) return

    const rect = photoRef.current.getBoundingClientRect()
    const xPct = ((e.clientX - rect.left) / rect.width) * 100
    const yPct = ((e.clientY - rect.top) / rect.height) * 100
    setPickPos({ x: xPct, y: yPct })

    // object-cover: map the click point in the displayed box to the
    // equivalent pixel in the source image, accounting for center-crop.
    const scale = Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight)
    const displayedW = img.naturalWidth * scale
    const displayedH = img.naturalHeight * scale
    const offsetX = (displayedW - rect.width) / 2
    const offsetY = (displayedH - rect.height) / 2
    const srcX = Math.min(img.naturalWidth - 1, Math.max(0, ((e.clientX - rect.left) + offsetX) / scale))
    const srcY = Math.min(img.naturalHeight - 1, Math.max(0, ((e.clientY - rect.top) + offsetY) / scale))

    const [r, g, b] = canvas.getContext('2d').getImageData(Math.floor(srcX), Math.floor(srcY), 1, 1).data
    setPickedColor(hexFromRgb(r, g, b))
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto aspect-4/5 w-full max-w-md [perspective:1400px]"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* Canvas frame */}
        <div className="absolute inset-0 rounded-2xl border border-line bg-panel shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]" />

        {/* Ruler ticks — top + left, evoking the Photoshop canvas ruler */}
        <div className="pointer-events-none absolute inset-x-6 top-1.5 flex h-4 items-end justify-between">
          {Array.from({ length: 17 }).map((_, i) => (
            <span key={i} className="w-px bg-ink-faint/40" style={{ height: i % 4 === 0 ? 7 : 4 }} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-6 left-1.5 flex w-4 flex-col items-end justify-between">
          {Array.from({ length: 13 }).map((_, i) => (
            <span key={i} className="h-px bg-ink-faint/40" style={{ width: i % 4 === 0 ? 7 : 4 }} />
          ))}
        </div>

        {/* Portrait silhouette to imply an edited photo */}
        <div
          ref={photoRef}
          data-brush-cursor={activeTool !== 'eyedropper' || undefined}
          onClick={handlePhotoClick}
          className={`absolute inset-6 rounded-xl overflow-hidden bg-gradient-to-b from-panel-2 to-canvas-soft ${
            activeTool === 'eyedropper' ? 'cursor-crosshair' : 'cursor-none'
          }`}
        >
          {activeTool === 'eraser' && <div className="absolute inset-0 checkerboard" />}

          <motion.div
            animate={{ opacity: activeTool === 'eraser' ? 0.35 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-cyan/10 via-transparent to-transparent" />
            <div className="absolute left-1/2 top-[18%] h-28 w-28 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--color-line),var(--color-panel-2)_75%)] shadow-[inset_-6px_-8px_16px_rgba(0,0,0,0.35)]" />
            <div className="absolute left-1/2 top-[42%] h-40 w-56 -translate-x-1/2 rounded-t-[5rem] bg-[radial-gradient(circle_at_30%_10%,var(--color-line),var(--color-panel-2)_70%)] shadow-[inset_-8px_-10px_20px_rgba(0,0,0,0.35)]" />

            {/* Real hero photo — drop a file at public/images/hero-portrait.jpg
                and it replaces the illustration above automatically. Falls
                back silently (no broken-image icon) until that file exists. */}
            {!photoFailed && (
              <img
                ref={imgElRef}
                src="/images/hero-portrait.jpg"
                alt=""
                onLoad={handlePhotoLoad}
                onError={() => setPhotoFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {/* Hidden sampling canvas — never rendered, used only to read real pixel colors for the eyedropper */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Rim light + vignette for a more photographic feel */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(245,242,234,0.12),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,transparent_45%,rgba(0,0,0,0.4)_100%)]" />
          </motion.div>

          <AnimatePresence>
            {activeTool === 'wand' && (
              <motion.div
                key="wand-analysis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                {/* Full-frame tint pulsing while the whole photo is "analyzed" */}
                <motion.div
                  animate={{ opacity: [0.08, 0.22, 0.08] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-cyan"
                />
                {/* Scan line sweeping top to bottom across the entire image */}
                <motion.div
                  initial={{ top: '-5%' }}
                  animate={{ top: '105%' }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan/60 to-transparent"
                />
                {/* Selection edge marching around the full frame once the pass completes */}
                <svg className="absolute inset-0 h-full w-full">
                  <rect
                    x="2%"
                    y="2%"
                    width="96%"
                    height="96%"
                    rx="10"
                    fill="none"
                    stroke="var(--color-cyan)"
                    strokeWidth="1.5"
                    className="marching-ants"
                  />
                </svg>
              </motion.div>
            )}

            {activeTool === 'lasso' && (
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <rect
                  x="10%"
                  y="12%"
                  width="80%"
                  height="76%"
                  rx="14"
                  fill="none"
                  stroke="#f5f2ea"
                  strokeWidth="1.5"
                  className="marching-ants"
                />
              </motion.svg>
            )}

            {activeTool === 'brush' && (
              <motion.svg
                key="brush-stroke"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <motion.path
                  d="M 30% 60% Q 45% 40%, 60% 55% T 85% 45%"
                  fill="none"
                  stroke="var(--color-cyan)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.9 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 0.4 }}
                />
              </motion.svg>
            )}

            {activeTool === 'crop' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute left-1/3 top-0 h-full w-px bg-ink/40" />
                <div className="absolute left-2/3 top-0 h-full w-px bg-ink/40" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-ink/40" />
                <div className="absolute top-2/3 left-0 w-full h-px bg-ink/40" />
                {['top-1 left-1 border-t border-l', 'top-1 right-1 border-t border-r', 'bottom-1 left-1 border-b border-l', 'bottom-1 right-1 border-b border-r'].map(
                  (pos) => (
                    <div key={pos} className={`absolute h-4 w-4 border-ink ${pos}`} />
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {activeTool === 'eyedropper' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ left: `${pickPos.x}%`, top: `${pickPos.y}%` }}
              className="pointer-events-none absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink shadow-[0_0_0_1px_rgba(0,0,0,0.4)]"
            >
              <span
                className="absolute inset-1 rounded-full border border-white/30"
                style={{ background: pickedColor ?? 'transparent' }}
              />
              {pickedColor && (
                <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-panel/95 px-2 py-1 text-[10px] font-mono text-ink-dim shadow-lg">
                  {pickedColor}
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* Tool status chip */}
        <motion.div
          key={activeTool}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ translateZ: 110 }}
          className="absolute right-3 top-9 max-w-[62%] rounded-md border border-line bg-panel/90 px-2.5 py-1.5 text-[10px] font-mono text-ink-dim backdrop-blur-md shadow-lg"
        >
          {toolCopy[activeTool]}
        </motion.div>

        {/* Swatches cluster — a nod to the Photoshop color picker. The last
            swatch reflects whatever color the eyedropper last sampled from
            the real photo, once one's been picked. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, type: 'spring', stiffness: 140, damping: 16 }}
          style={{ translateZ: 120 }}
          className="absolute left-3 bottom-3 flex items-center gap-1.5 rounded-lg border border-line bg-panel/90 px-2.5 py-2 backdrop-blur-md shadow-lg"
        >
          {['#34d3ff', '#ff6b4a', '#ffb84d', '#4ade80'].map((c) => (
            <span key={c} className="h-3.5 w-3.5 rounded-full border border-white/10" style={{ background: c }} />
          ))}
          {pickedColor && (
            <motion.span
              key={pickedColor}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              title={pickedColor}
              className="h-3.5 w-3.5 rounded-full ring-2 ring-cyan ring-offset-1 ring-offset-panel"
              style={{ background: pickedColor }}
            />
          )}
        </motion.div>

        {activeTool === 'wand' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ translateZ: 130 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan"
          >
            <Sparkles className="h-6 w-6 animate-pulse" strokeWidth={1.5} />
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: 24, y: -16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 140, damping: 16 }}
              style={{ translateZ: 30 + i * 22, top: `${10 + i * 16}%` }}
              className={`absolute right-[-14px] flex items-center gap-2 overflow-hidden rounded-lg border border-line ${layer.tone} px-3 py-2 backdrop-blur-md shadow-lg`}
            >
              <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 ${layer.tag}`} />
              <layer.icon className="ml-1 h-3.5 w-3.5 text-ink-dim" strokeWidth={2} />
              <span className="text-[11px] font-mono text-ink-dim whitespace-nowrap">{layer.label}</span>
            </motion.div>
          ))}

          {activeTool === 'type' && (
            <motion.div
              key="type-layer"
              initial={{ opacity: 0, x: 24, y: -16, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 160, damping: 16 }}
              style={{ translateZ: 30 + layers.length * 22, top: `${10 + layers.length * 16}%` }}
              className="absolute right-[-14px] flex items-center gap-2 rounded-lg border border-cyan/40 bg-cyan-soft px-3 py-2 backdrop-blur-md shadow-lg"
            >
              <TypeIcon className="h-3.5 w-3.5 text-cyan" strokeWidth={2} />
              <span className="text-[11px] font-mono text-cyan whitespace-nowrap">Headline Text</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
