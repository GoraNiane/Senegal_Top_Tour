/**
 * SENEGAL TOP TOUR — Design System Tokens & Theme Configuration
 * Direction Artistique: Luxe, Authenticité, Chaleur, Élégance Contemporaine
 */

export const colors = {
  // Couleur Principale Dominante (Fond Blanc Cassé / Ivoire)
  ivory: '#F7F4EE',
  white: '#FFFFFF',
  
  // Noirs et Contrastes Profonds
  black: '#151515',
  darkCharcoal: '#1E1E1E',
  darkNeutral: '#2B2B2B',

  // Vert Profond (utilisé avec parcimonie pour souligner l'élégance et la nature)
  deepGreen: '#173C32',
  deepGreenLight: '#235346',
  deepGreenDark: '#0E261F',

  // Sable (évoquant les dunes de Lompoul et les plages dorées)
  sand: '#C7A77A',
  sandLight: '#E2D5C3',
  sandDark: '#A88755',

  // Terracotta (évoquant la terre de latérite, l'argile et l'artisanat de banco)
  terracotta: '#A85D3A',
  terracottaLight: '#C37955',
  terracottaDark: '#874426',

  // Or Doux (subtil, pour les accents de prestige et reflets du soleil)
  softGold: '#C99A4A',
  softGoldLight: '#DFC07D',
  softGoldDark: '#9F742C',

  // Échelle de Gris Chauds / Neutres
  neutral: {
    50: '#FAF8F5',
    100: '#F2EDE4',
    200: '#E4DCcf',
    300: '#CEBEA6',
    400: '#A39580',
    500: '#7A6E5C',
    600: '#574D3F',
    700: '#3D352B',
    800: '#26211A',
    900: '#151515',
  },
} as const;

export const typography = {
  fonts: {
    serif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    sans: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  sizes: {
    display: 'clamp(2.5rem, 6vw, 4.5rem)',     // 40px - 72px
    h1: 'clamp(2rem, 4.5vw, 3.5rem)',          // 32px - 56px
    h2: 'clamp(1.75rem, 3.5vw, 2.75rem)',      // 28px - 44px
    h3: 'clamp(1.35rem, 2.5vw, 2rem)',         // 22px - 32px
    h4: 'clamp(1.15rem, 2vw, 1.5rem)',         // 18px - 24px
    bodyLarge: '1.125rem',                     // 18px
    body: '1rem',                              // 16px
    bodySmall: '0.875rem',                     // 14px
    caption: '0.75rem',                        // 12px
    micro: '0.6875rem',                        // 11px
  },
  letterSpacing: {
    tighter: '-0.03em',
    tight: '-0.015em',
    normal: '0',
    wide: '0.025em',
    wider: '0.08em',
    widest: '0.22em',
  },
} as const;

export const borderRadius = {
  sm: '8px',
  md: '14px',
  lg: '20px',
  xl: '26px',
  '2xl': '32px',
  pill: '9999px',
} as const;

export const shadows = {
  subtle: '0 2px 10px rgba(21, 21, 21, 0.04)',
  card: '0 10px 30px -10px rgba(23, 60, 50, 0.08)',
  cardHover: '0 20px 40px -12px rgba(23, 60, 50, 0.16)',
  goldGlow: '0 8px 25px rgba(201, 154, 74, 0.3)',
  modal: '0 25px 60px -15px rgba(21, 21, 21, 0.35)',
} as const;

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
