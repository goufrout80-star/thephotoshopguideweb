export function getDeviceType(ua) {
  if (/iPad|Tablet/i.test(ua)) return 'Tablet'
  if (/Mobi|Android|iPhone/i.test(ua)) return 'Mobile'
  return 'Desktop'
}

export function getOS(ua) {
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS'
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Mac OS X/i.test(ua)) return 'macOS'
  if (/Android/i.test(ua)) return 'Android'
  if (/Linux/i.test(ua)) return 'Linux'
  return 'Unknown'
}

export function getBrowser(ua) {
  if (/Edg\//i.test(ua)) return 'Edge'
  if (/OPR\/|Opera/i.test(ua)) return 'Opera'
  if (/Chrome\//i.test(ua)) return 'Chrome'
  if (/Firefox\//i.test(ua)) return 'Firefox'
  if (/Safari\//i.test(ua)) return 'Safari'
  return 'Unknown'
}

export function getDeviceInfo(ua = navigator.userAgent) {
  return {
    device: getDeviceType(ua),
    os: getOS(ua),
    browser: getBrowser(ua),
    userAgent: ua,
  }
}
