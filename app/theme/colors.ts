export const COLORS = {
  light: {
    background: '#ffffff',
    surface: '#f0f0f0',
    text: '#000000',
    textSecondary: '#65676b',
    border: '#efefef',
    primary: '#0095f6',
    like: '#ed4956',
    accent: '#833ab4',
  },
  dark: {
    background: '#000000',
    surface: '#121212',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    border: '#262626',
    primary: '#0095f6',
    like: '#ed4956',
    accent: '#833ab4',
  },
};

export type Theme = typeof COLORS.light;