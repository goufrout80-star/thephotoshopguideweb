import { Layers, Printer } from 'lucide-react'
import { stats, reelStats, demographics, pillars, packages, customPartnership } from './data/content'

export default function MediaKit() {
  return (
    <div className="media-kit-print min-h-screen bg-canvas text-ink px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="no-print mb-8 flex items-center justify-between rounded-xl border border-line bg-panel px-5 py-4">
          <p className="text-sm text-ink-dim">This is a real, printable one-pager — use your browser's print dialog to save it as a PDF.</p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-canvas hover:bg-ink transition-colors"
          >
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </button>
        </div>

        <header className="flex items-center gap-3 border-b border-line pb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-panel-2 border border-line">
            <Layers className="h-5 w-5 print-accent text-cyan" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">The Photoshop Guide</h1>
            <p className="text-sm text-ink-dim">Media Kit — {new Date().getFullYear()}</p>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="font-mono text-xs tracking-widest text-cyan print-accent uppercase">Audience Snapshot</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="print-card rounded-xl border border-line bg-panel p-4">
                <div className="font-display text-xl text-ink">
                  {s.value}{s.suffix}
                </div>
                <div className="mt-1 text-xs text-ink-dim">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-ink mb-2">Age breakdown</h3>
            <ul className="space-y-1 text-sm text-ink-dim">
              {demographics.map((d) => (
                <li key={d.label} className="flex justify-between">
                  <span>{d.label}</span>
                  <span className="font-mono">{d.value}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink mb-2">Reel performance</h3>
            <ul className="space-y-1 text-sm text-ink-dim">
              {reelStats.map((r) => (
                <li key={r.label} className="flex justify-between">
                  <span>{r.label}</span>
                  <span className="font-mono">{r.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-mono text-xs tracking-widest text-cyan print-accent uppercase">Content Pillars</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.tag} className="print-card rounded-xl border border-line bg-panel p-4">
                <h3 className="text-sm font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-xs text-ink-dim leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-mono text-xs tracking-widest text-cyan print-accent uppercase">Packages</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {packages.map((pkg) => (
              <div key={pkg.name} className="print-card rounded-xl border border-line bg-panel p-4">
                <h3 className="text-sm font-semibold text-ink">{pkg.name}</h3>
                <div className="mt-1 font-mono text-sm text-cyan print-accent">{pkg.price}</div>
                <p className="mt-2 text-xs text-ink-dim leading-relaxed">{pkg.desc}</p>
              </div>
            ))}
          </div>
          <div className="print-card mt-3 rounded-xl border border-line bg-panel p-4">
            <h3 className="text-sm font-semibold text-ink">{customPartnership.name}</h3>
            <div className="mt-1 font-mono text-sm text-cyan print-accent">{customPartnership.cta}</div>
            <p className="mt-2 text-xs text-ink-dim leading-relaxed">{customPartnership.desc}</p>
          </div>
        </section>

        <footer className="mt-10 border-t border-line pt-6 text-sm text-ink-dim">
          <p>hello@thephotoshopguide.com</p>
          <p className="mt-1 text-xs text-ink-faint">
            Figures reflect estimated averages at time of publishing and are provided for partnership planning purposes.
          </p>
        </footer>
      </div>
    </div>
  )
}
