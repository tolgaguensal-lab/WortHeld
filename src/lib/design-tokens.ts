/**
 * Design Tokens — single source of truth for all visual constants.
 * Mirrors the CSS custom properties defined in globals.css.
 * Use these in TypeScript contexts (Framer Motion, dynamic styles, tests).
 */

export const colors = {
  background: "hsl(38, 33%, 97%)",
  foreground: "hsl(220, 15%, 15%)",
  card: "hsl(35, 25%, 94%)",
  cardForeground: "hsl(220, 15%, 15%)",
  cardElevated: "hsl(36, 30%, 96%)",
  popover: "hsl(0, 0%, 100%)",
  popoverForeground: "hsl(220, 15%, 15%)",
  primary: "hsl(160, 45%, 28%)",
  primaryForeground: "hsl(38, 33%, 97%)",
  primaryHover: "hsl(160, 45%, 23%)",
  primaryMuted: "hsl(160, 30%, 88%)",
  secondary: "hsl(38, 10%, 90%)",
  secondaryForeground: "hsl(220, 15%, 28%)",
  muted: "hsl(38, 10%, 92%)",
  mutedForeground: "hsl(220, 8%, 45%)",
  accentGold: "hsl(42, 85%, 52%)",
  accentGoldForeground: "hsl(220, 15%, 15%)",
  destructive: "hsl(0, 65%, 48%)",
  destructiveForeground: "hsl(38, 33%, 97%)",
  destructiveMuted: "hsl(0, 60%, 92%)",
  border: "hsl(38, 10%, 85%)",
  input: "hsl(38, 10%, 88%)",
  ring: "hsl(160, 45%, 28%)",
  success: "hsl(145, 45%, 38%)",
  successMuted: "hsl(145, 40%, 90%)",
  warning: "hsl(35, 80%, 48%)",
  warningMuted: "hsl(35, 70%, 90%)",
  info: "hsl(200, 60%, 43%)",
  infoMuted: "hsl(200, 50%, 90%)",
  // Dark panel colors
  darkBg: "hsl(220, 15%, 10%)",
  darkCard: "hsl(220, 15%, 15%)",
  darkCardElevated: "hsl(220, 15%, 18%)",
  darkBorder: "hsl(220, 10%, 22%)",
  darkText: "hsl(38, 20%, 90%)",
  darkMuted: "hsl(220, 8%, 50%)",
  darkInput: "hsl(220, 15%, 20%)",
} as const;

export const radii = {
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "30px",
  full: "9999px",
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  "4xl": "96px",
} as const;

export const animation = {
  fast: "150ms ease-out",
  normal: "250ms ease-in-out",
  slow: "400ms ease-out",
  reveal: "600ms cubic-bezier(0.25, 0.1, 0.25, 1)",
} as const;

export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const fonts = {
  display: "'Libre Baskerville', Georgia, 'Times New Roman', serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
} as const;

export const buttonSizes = {
  sm: { height: "36px", paddingX: "16px", fontSize: "13px", fontWeight: 500 },
  md: { height: "44px", paddingX: "20px", fontSize: "15px", fontWeight: 600 },
  lg: { height: "52px", paddingX: "28px", fontSize: "16px", fontWeight: 600 },
  xl: { height: "60px", paddingX: "36px", fontSize: "18px", fontWeight: 700 },
  icon: { height: "40px", width: "40px" },
} as const;

export const skillIcons = {
  reading: "BookOpen",
  listening: "Headphones",
  speaking: "MessageSquare",
  writing: "PenLine",
  grammar: "Sigma",
  vocabulary: "BookA",
  review: "RefreshCw",
  test: "ScrollText",
} as const;
