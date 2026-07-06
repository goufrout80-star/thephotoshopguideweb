import { motion } from 'motion/react'
import { MousePointer2, Lasso, Wand2, Paintbrush, Pipette, Type, Crop, Eraser } from 'lucide-react'
import { useTool } from '../context/ToolContext'

const tools = [
  { id: 'move', icon: MousePointer2, label: 'Move' },
  { id: 'lasso', icon: Lasso, label: 'Lasso' },
  { id: 'wand', icon: Wand2, label: 'Magic Wand' },
  { id: 'brush', icon: Paintbrush, label: 'Brush' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
  { id: 'eyedropper', icon: Pipette, label: 'Eyedropper' },
  { id: 'type', icon: Type, label: 'Type' },
  { id: 'crop', icon: Crop, label: 'Crop' },
]

export default function ToolDock() {
  const { activeTool, setActiveTool } = useTool()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 100, damping: 18 }}
      role="toolbar"
      aria-label="Try editing the hero canvas"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 rounded-2xl border border-line bg-panel/80 p-1.5 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] xl:flex"
    >
      {tools.map((tool) => {
        const isActive = activeTool === tool.id
        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => setActiveTool(tool.id)}
            title={tool.label}
            aria-label={tool.label}
            aria-pressed={isActive}
            className={`group relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              isActive ? 'bg-cyan/15 text-cyan' : 'text-ink-faint hover:bg-panel-2 hover:text-ink-dim'
            }`}
          >
            <tool.icon className="h-4 w-4" strokeWidth={2} />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md border border-line bg-panel px-2 py-1 text-[11px] font-mono text-ink-dim opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {tool.label}
            </span>
          </button>
        )
      })}
    </motion.div>
  )
}
