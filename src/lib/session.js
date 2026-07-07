const KEYS = {
  id: 'pg_session_id',
  start: 'pg_session_start',
  landingPath: 'pg_landing_path',
  pageViews: 'pg_page_views',
}

function initSession() {
  if (typeof window === 'undefined') return

  if (!sessionStorage.getItem(KEYS.id)) {
    sessionStorage.setItem(KEYS.id, crypto.randomUUID())
    sessionStorage.setItem(KEYS.start, String(Date.now()))
    sessionStorage.setItem(KEYS.landingPath, window.location.pathname)
    sessionStorage.setItem(KEYS.pageViews, '0')
  }

  // Anchor-based navigation (this is a single-page site with no router) —
  // hashchange is the closest equivalent to a "route change" here.
  window.addEventListener('hashchange', () => {
    const current = Number(sessionStorage.getItem(KEYS.pageViews) || '0')
    sessionStorage.setItem(KEYS.pageViews, String(current + 1))
  })
}

initSession()

export function getSession() {
  if (typeof window === 'undefined') {
    return { sessionId: null, landingPath: null, pageViews: 0, timeOnSiteSec: 0 }
  }

  const start = Number(sessionStorage.getItem(KEYS.start) || Date.now())
  return {
    sessionId: sessionStorage.getItem(KEYS.id),
    landingPath: sessionStorage.getItem(KEYS.landingPath),
    pageViews: Number(sessionStorage.getItem(KEYS.pageViews) || '0'),
    timeOnSiteSec: Math.round((Date.now() - start) / 1000),
  }
}
