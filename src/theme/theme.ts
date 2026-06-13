// Single source of truth for Khatun's look. Re-skin the whole app by editing
// these tokens (per CLAUDE.md: keep the hue changeable in one place).

export const colors = {
  // Lavender background family
  lavender: '#8B7FF0',
  lavenderDeep: '#6F61E8',
  lavenderSoft: '#A99DF5',
  lavenderTint: '#EDEAFB', // pale lavender for curved illustration backdrop

  // Surfaces
  card: '#FFFFFF',
  cardBorder: 'rgba(139, 127, 240, 0.25)',

  // Text
  textOnLavender: '#FFFFFF',
  textOnLavenderMuted: 'rgba(255, 255, 255, 0.82)',
  textDark: '#2B2350',
  textMuted: '#6B6486',

  // States
  selectedBg: '#F2EFFE',
  selectedBorder: '#6F61E8',
  shadow: 'rgba(79, 63, 168, 0.18)',
} as const

export const radius = {
  sm: '12px',
  md: '18px',
  lg: '24px',
  pill: '999px',
} as const

export const space = {
  xs: '6px',
  sm: '10px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const

export const font = {
  family: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
  h1: '26px',
  h2: '22px',
  body: '16px',
  small: '14px',
} as const
