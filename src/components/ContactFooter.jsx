import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, Layers, Mail } from 'lucide-react'
import MagneticButton from './MagneticButton'
import Toast from './Toast'
import { trackEvent } from '../lib/analytics'
import { buildVisitorMeta } from '../lib/visitorMeta'

const ENDPOINT = 'https://eawftyzjuwccwuxdszxf.supabase.co/functions/v1/submit-page-contact'

export default function ContactFooter() {
  const [status, setStatus] = useState('idle')
  const [reference, setReference] = useState('')
  const [toast, setToast] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    const formElement = event.currentTarget
    const form = new FormData(formElement)

    setStatus('submitting')
    setToast(null)

    try {
      const visitorMeta = await buildVisitorMeta()
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'thephotoshopguide',
          company_website: form.get('company_website'),
          payload: {
            name: form.get('name'),
            company: form.get('company'),
            website: form.get('website'),
            email: form.get('email'),
            message: form.get('message'),
            meta: {
              ...visitorMeta,
              referrer: document.referrer || 'Direct',
              landingPath: window.location.pathname,
              submitPath: '#contact',
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              browserLanguage: navigator.language,
              viewport: `${window.innerWidth}x${window.innerHeight}`,
            },
          },
        }),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.ok !== true || !result.reference) {
        throw new Error(result.error || 'We could not receive your message.')
      }

      trackEvent('contact_message_submitted', { method: 'jwu_pages', reference: result.reference })
      setReference(result.reference)
      setStatus('success')
      formElement.reset()
    } catch (error) {
      setStatus('idle')
      setToast(error instanceof Error ? error.message : 'Something interrupted the submission. Please try again or email us directly.')
    }
  }

  return (
    <>
      <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-72 w-[80%] rounded-full bg-cyan/10 blur-[120px]" />

        <div
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
            event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
          }}
          className="group relative grid grid-cols-1 gap-12 rounded-3xl border border-line bg-panel p-8 sm:p-12 lg:grid-cols-2"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(52,211,255,0.08), transparent 65%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px sm:inset-x-12"
            style={{
              background: 'linear-gradient(90deg, var(--color-cyan) 0%, var(--color-cyan) 70%, var(--color-coral) 78%, var(--color-gold) 88%, var(--color-green) 100%)',
              opacity: 0.6,
            }}
          />
          <div>
            <p className="font-mono text-xs tracking-widest text-cyan uppercase">Contact Us</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink">
              Tell us about your company or partnership idea.
            </h2>
            <p className="mt-4 text-ink-dim leading-relaxed max-w-sm">
              Send a simple message. Our team will review it and reply to your email within 2 business days.
            </p>

            <div className="mt-8">
              <a href="mailto:hello@thephotoshopguide.com" className="flex items-center gap-3 text-sm text-ink-dim hover:text-ink transition-colors">
                <Mail className="h-4 w-4 text-cyan" aria-hidden="true" /> hello@thephotoshopguide.com
              </a>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden opacity-0">
              <label htmlFor="contact-company-website">Company website confirmation</label>
              <input id="contact-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="contact-name">Full name</label>
                <input id="contact-name" required name="name" minLength={2} maxLength={120} autoComplete="name" placeholder="Full name" className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-cyan/60 transition-colors" />
              </div>
              <div>
                <label className="sr-only" htmlFor="contact-company">Company name</label>
                <input id="contact-company" required name="company" minLength={2} maxLength={180} autoComplete="organization" placeholder="Company name" className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-cyan/60 transition-colors" />
              </div>
            </div>

            <label className="sr-only" htmlFor="contact-website">Website link</label>
            <input id="contact-website" type="url" name="website" maxLength={500} autoComplete="url" placeholder="Website link (optional)" className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-cyan/60 transition-colors" />

            <label className="sr-only" htmlFor="contact-email">Email</label>
            <input id="contact-email" required type="email" name="email" maxLength={254} autoComplete="email" placeholder="Email" className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-cyan/60 transition-colors" />

            <label className="sr-only" htmlFor="contact-message">Message</label>
            <textarea id="contact-message" required name="message" minLength={10} maxLength={5000} rows={5} placeholder="Your message" className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-cyan/60 transition-colors" />

            <MagneticButton
              as="button"
              type="submit"
              strength={0.15}
              disabled={status === 'submitting' || status === 'success'}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan px-6 py-3.5 text-sm font-semibold text-canvas hover:bg-ink transition-colors disabled:opacity-60"
            >
              {status === 'submitting' && 'Sending message…'}
              {status === 'success' && (
                <>
                  <Check className="h-4 w-4 text-green" /> Message received
                </>
              )}
              {status === 'idle' && (
                <>
                  Send message
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </MagneticButton>

            {status === 'success' && (
              <p className="text-xs text-ink-faint text-center">
                Message received. Reference <strong className="text-cyan">{reference}</strong>. Expect a reply within 2 business days.
              </p>
            )}
          </motion.form>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-panel-2 border border-line">
              <Layers className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />
            </span>
            <span className="font-display text-sm text-ink">The Photoshop Guide</span>
            <span aria-hidden="true" className="ml-2 flex items-center gap-1">
              {['bg-cyan', 'bg-coral', 'bg-gold', 'bg-green'].map((color) => (
                <span key={color} className={`h-1.5 w-1.5 rounded-full ${color}`} />
              ))}
            </span>
          </a>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
            <p className="text-xs text-ink-faint">
              © {new Date().getFullYear()} The Photoshop Guide. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-ink-faint hover:text-ink-dim transition-colors">Privacy</a>
              <a href="#" className="text-xs text-ink-faint hover:text-ink-dim transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  )
}
