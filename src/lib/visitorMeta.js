import { getDeviceInfo } from './deviceInfo'
import { getVisitorGeo } from './geolocation'
import { getSession } from './session'

export async function buildVisitorMeta() {
  const geo = await getVisitorGeo()
  const { device, os, browser, userAgent } = getDeviceInfo()
  const { sessionId, landingPath, pageViews, timeOnSiteSec } = getSession()

  return {
    country: geo.country,
    countryCode: geo.countryCode,
    city: geo.city,
    timezone: geo.timezone,
    device,
    os,
    browser,
    referrer: document.referrer || 'Direct',
    landingPath,
    submitPath: window.location.pathname,
    timeOnSiteSec,
    pageViews,
    sessionId,
    userAgent,
  }
}
