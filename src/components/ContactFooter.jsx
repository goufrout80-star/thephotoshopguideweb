import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, Layers, Mail, AtSign } from 'lucide-react'
import MagneticButton from './MagneticButton'
import Toast from './Toast'
import { supabase } from '../lib/supabase'
import { trackEvent } from '../lib/analytics'
import { buildVisitorMeta } from '../lib/visitorMeta'

export default function ContactFooter() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [toast, setToast] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const name = form.get('name')
    const company = form.get('company')
    const email = form.get('email')
    const budget = form.get('budget')
    const rawMessage = form.get('message')

    // page_contacts has no dedicated budget column — fold it into the
    // message body so the dashboard still sees it.
    const message = budget ? `Estimated budget: ${budget}\n\n${rawMessage}` : rawMessage

    if (!supabase) {
      setToast('Contact form is not configured — missing Supabase credentials.')
      return
    }

    setStatus('submitting')
    const meta = await buildVisitorMeta()

    const { error } = await supabase
      .from('page_contacts')
      .insert({ name, company, email, message, site: 'thephotoshopguide', meta })

    if (error) {
      setStatus('idle')
      setToast("Something went wrong sending your brief — please try again or email us directly.")
      return
    }

    trackEvent('sponsorship_inquiry_submitted', { method: 'supabase' })
    setStatus('success')
    e.target.reset()
  }

  return (
    <>
      <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-72 w-[80%] rounded-full bg-cyan/10 blur-[120px]" />

        <div className="relative grid grid-cols-1 gap-12 rounded-3xl border border-line bg-panel p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-widest text-cyan uppercase">Let's Work Together</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink">
              Tell us about your product. We'll pitch the edit.
            </h2>
            <p className="mt-4 text-ink-dim leading-relaxed max-w-sm">
              No forms that vanish into a void — a real person reads every
              brief and replies within 2 business days, with actual creative
              ideas attached.
            </p>

            <div className="mt-8 space-y-3">
              <a href="mailto:hello@thephotoshopguide.com" className="flex items-center gap-3 text-sm text-ink-dim hover:text-ink transition-colors">
                <Mail className="h-4 w-4 text-cyan" aria-hidden="true" /> hello@thephotoshopguide.com
              </a>
              <a href="#" aria-label="Instagram: @thephotoshopguide" className="flex items-center gap-3 text-sm text-ink-dim hover:text-ink transition-colors">
                <AtSign className="h-4 w-4 text-cyan" aria-hidden="true" /> @thephotoshopguide
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
            <div className="grid grid-cols-2 gap-4">
              <label className="sr-only" htmlFor="contact-name">Your name</label>
              <input id="contact-name" required name="name" placeholder="Your name" className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-cyan/60 transition-colors" />
              <label className="sr-only" htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" placeholder="Company" className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-cyan/60 transition-colors" />
            </div>
            <label className="sr-only" htmlFor="contact-email">Email</label>
            <input id="contact-email" required type="email" name="email" placeholder="Work email" className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-cyan/60 transition-colors" />
            <label className="sr-only" htmlFor="contact-budget">Estimated budget</label>
            <select id="contact-budget" name="budget" defaultValue="" className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink-dim outline-none focus:border-cyan/60 transition-colors">
              <option value="" disabled>Estimated budget</option>
              <option>Under $2,500</option>
              <option>$2,500 – $7,500</option>
              <option>$7,500 – $20,000</option>
              <option>$20,000+</option>
            </select>
            <label className="sr-only" htmlFor="contact-message">What are you looking to promote?</label>
            <textarea id="contact-message" required name="message" rows={4} placeholder="What are you looking to promote?" className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-cyan/60 transition-colors" />
            <MagneticButton
              as="button"
              type="submit"
              strength={0.15}
              disabled={status === 'submitting'}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan px-6 py-3.5 text-sm font-semibold text-canvas hover:bg-ink transition-colors disabled:opacity-60"
            >
              {status === 'submitting' && 'Sending…'}
              {status === 'success' && (
                <>
                  <Check className="h-4 w-4" /> Brief sent
                </>
              )}
              {status === 'idle' && (
                <>
                  Send the brief
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </MagneticButton>
            {status === 'success' && (
              <p className="text-xs text-ink-faint text-center">
                We've got it — expect a reply within 2 business days.
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
