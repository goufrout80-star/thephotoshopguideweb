import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle } from 'lucide-react'

export default function Toast({ message, onDismiss }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          role="alert"
          className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2.5 rounded-xl border border-coral/40 bg-panel px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-coral" />
          <span className="text-sm text-ink">{message}</span>
          <button
            type="button"
            onClick={onDismiss}
            className="ml-2 text-xs text-ink-faint hover:text-ink-dim transition-colors"
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
