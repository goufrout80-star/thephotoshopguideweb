const EMPTY_GEO = { country: null, countryCode: null, city: null, timezone: null }

export async function getVisitorGeo() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://ipwho.is/', { signal: controller.signal })
    clearTimeout(timeout)

    if (!res.ok) return EMPTY_GEO
    const data = await res.json()
    if (!data || data.success === false) return EMPTY_GEO

    return {
      country: data.country ?? null,
      countryCode: data.country_code ?? null,
      city: data.city ?? null,
      timezone: data.timezone?.id ?? null,
    }
  } catch {
    return EMPTY_GEO
  }
}
