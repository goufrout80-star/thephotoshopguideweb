import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Layers, Menu, X } from 'lucide-react'

const links = [
  { href: '#work', label: 'Content' },
  { href: '#audience', label: 'Audience' },
  { href: '#case-study', label: 'Results' },
  { href: '#packages', label: 'Packages' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-colors duration-300 ${
          scrolled || menuOpen
            ? 'border-line bg-panel/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 group shrink-0" onClick={() => setMenuOpen(false)}>
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-panel-2 border border-line group-hover:border-cyan/50 transition-colors shrink-0">
            <Layers className="h-4 w-4 text-cyan" strokeWidth={2.2} />
          </span>
          <span className="font-display font-semibold tracking-tight text-ink text-[15px] whitespace-nowrap hidden sm:inline">
            The Photoshop Guide
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-ink-dim hover:text-ink transition-colors rounded-full hover:bg-panel-2"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center whitespace-nowrap rounded-full bg-cyan px-3.5 py-2 text-xs sm:text-sm font-medium text-canvas hover:bg-ink transition-colors shrink-0"
          >
            Book a partnership
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-dim hover:text-ink transition-colors md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="absolute left-4 right-4 top-[calc(100%+8px)] flex flex-col gap-1 rounded-2xl border border-line bg-panel/95 backdrop-blur-xl p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-ink-dim hover:text-ink hover:bg-panel-2 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
