// Main stat cards — per "Recommended main stat cards" in the official copy doc.
export const stats = [
  { value: 136, suffix: 'K+', label: 'Instagram followers', sub: 'Active creative community' },
  { value: 1.35, suffix: 'M+', label: 'Content views', sub: 'Last 90 days' },
  { value: 83, suffix: '%', label: 'Audience aged 18–34', sub: '44% 25–34 · 39% 18–24' },
  { value: 7.8, suffix: '%', label: 'U.S. audience', sub: 'Strong U.S. market presence' },
  { value: 863, suffix: 'K', label: 'Reel views', sub: 'Last 60 days' },
  { value: 47, suffix: 'K+', label: 'Interactions', sub: 'Last 90 days' },
]

// Reel performance highlights — the dominant content format on the platform.
export const reelStats = [
  { value: '863K', label: 'Reel views (60 days)' },
  { value: '95K', label: 'Unique Reel viewers (60 days)' },
  { value: '17K', label: 'Likes' },
  { value: '8.6K', label: 'Saves' },
  { value: '2.6K', label: 'Shares' },
]

// Age breakdown — only the brackets the official numbers actually cover.
// The remaining 17% spans older brackets that weren't broken out in the source data.
export const demographics = [
  { label: '25–34', value: 44 },
  { label: '18–24', value: 39 },
  { label: '35+', value: 17 },
]

// Results section — "Recommended Main Stat Cards" / "Recommended Supporting Stats".
export const resultsMain = [
  { value: '1.35M+', label: 'Content views (90 days)' },
  { value: '47K+', label: 'Interactions (90 days)' },
  { value: '863K', label: 'Reel views (60 days)' },
  { value: '95K', label: 'Unique Reel viewers (60 days)' },
]

export const resultsSupporting = [
  { value: '8.6K', label: 'Saves' },
  { value: '2.6K', label: 'Shares' },
  { value: '28%', label: 'Non-follower views' },
  { value: '93%+', label: 'Views from Reels' },
]

export const pillars = [
  {
    tag: '01',
    title: 'Tutorial-Based Content',
    desc: 'Step-by-step Photoshop tutorials, editing breakdowns, design tips, and creative workflows built for audiences who want to learn, save, and apply.',
  },
  {
    tag: '02',
    title: 'Tool & Software Features',
    desc: 'Clear, practical content showing how creative tools, AI platforms, plugins, apps, templates, or software products can help designers and creators work better.',
  },
  {
    tag: '03',
    title: 'Creative Assets & Workflow Packs',
    desc: 'Presets, actions, templates, LUTs, brushes, downloadable resources, and workflow-based creative assets introduced in a way that feels native to the page.',
  },
  {
    tag: '04',
    title: 'Short-Form Reels & Promotions',
    desc: 'High-retention Reels, visual edits, quick tips, product mentions, and promotional content designed for Instagram discovery and creator attention.',
  },
]

export const packages = [
  {
    name: 'Promotional Video Share',
    price: 'Starting at $200',
    desc: 'For brands that already have ready-made content and want to place it in front of The Photoshop Guide audience — ideal for a campaign video, product demo, or launch asset you already have prepared.',
    bestFor: ['Ready-made brand content', 'Product launches', 'Awareness campaigns', 'Creative tools', 'Templates and digital resources', 'AI/design apps'],
    canInclude: ['Brand-provided video shared on The Photoshop Guide', 'Caption provided or lightly refined for the audience', 'Brand mention', 'CTA or link placement where applicable', 'Basic performance screenshot after posting'],
    highlight: false,
  },
  {
    name: 'Custom Content Creation',
    price: 'Starting at $400',
    desc: "For brands that need us to create the concept, structure the message, and present the product in a way that fits our audience — built around what your product does, why it matters, and how it helps creators improve their workflow.",
    bestFor: ['Creative software', 'AI platforms', 'Editing apps', 'Plugins and extensions', 'Design tools', 'Workflow products', 'Brands that need their product explained clearly'],
    canInclude: ['Custom creative concept', 'Product-focused Reel or visual content', 'Audience-native messaging', 'Creative workflow integration', 'Brand mention and campaign CTA', 'Caption written or refined for the audience', 'Link placement where applicable', 'Basic performance screenshot after posting'],
    highlight: true,
  },
]

export const customPartnership = {
  name: 'Custom Partnership',
  cta: 'Request a Campaign Quote',
  desc: 'For brands looking for a larger or more specific partnership, we can build a custom campaign around your goals — long-term collaborations, multiple content placements, launch campaigns, content bundles, repeated brand mentions, extended visibility, or a structure built specifically around your product.',
}
