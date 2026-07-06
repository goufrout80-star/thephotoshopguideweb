const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

let initialized = false

function ensureLoaded() {
  if (initialized || !GA_ID || typeof window === 'undefined') return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID)
}

ensureLoaded()

export function trackEvent(name, params = {}) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
