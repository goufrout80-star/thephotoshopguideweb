export const motionTokens = {
  duration: {
    instant: 0.08,
    fast: 0.18,
    normal: 0.35,
    slow: 0.6,
    crawl: 1.0,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1],
    sharp: [0.4, 0, 0.2, 1],
    bounce: [0.34, 1.56, 0.64, 1],
    linear: [0, 0, 1, 1],
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 48,
  },
  scale: {
    subtle: 0.98,
    press: 0.95,
    pop: 1.04,
  },
}

export const springs = {
  snappy: { type: 'spring', stiffness: 300, damping: 30 },
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  bouncy: { type: 'spring', stiffness: 400, damping: 10 },
  instant: { type: 'spring', stiffness: 600, damping: 35 },
  release: { type: 'spring', stiffness: 200, damping: 20, restDelta: 0.001 },
}

export const fadeUp = (distance = motionTokens.distance.lg, delay = 0) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { ...springs.gentle, delay },
})

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth, delay },
})

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  },
})

export const staggerItem = (distance = motionTokens.distance.md) => ({
  variants: {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: springs.gentle },
  },
})
