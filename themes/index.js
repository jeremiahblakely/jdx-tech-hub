export const themes = {
  // Carbon Forge Theme (New Default)
  'carbon-forge': {
    name: 'Carbon Forge',
    description: 'Industrial strength with forge-fired accents',
    colors: {
      background: {
        primary: '#0A0A0A',   // Deepest carbon
        secondary: '#1C1C1C', // Main background
        tertiary: '#2A2A2A',  // Card backgrounds
        elevated: '#383838',  // Elevated surfaces
        glass: 'rgba(40, 40, 40, 0.8)',
      },
      accent: {
        primary: '#FF4500',   // Industrial orange
        secondary: '#DC143C', // Forge red
        danger: '#8B0000',    // Deep red
        info: '#4682B4',      // Steel blue
        success: '#FFD700',   // Premium gold
        warning: '#FF8C00',   // Dark orange
      },
      text: {
        primary: '#E5E4E2',   // Platinum
        secondary: '#C0C0C0', // Silver
        muted: '#71797E',     // Gunmetal
        accent: '#FF4500',    // Orange accent text
      },
      border: {
        primary: 'rgba(255, 69, 0, 0.2)',
        secondary: 'rgba(192, 192, 192, 0.1)',
        muted: 'rgba(113, 121, 126, 0.15)',
      },
      effects: {
        redGlow: 'rgba(220, 20, 60, 0.5)',
        orangeGlow: 'rgba(255, 69, 0, 0.5)',
        blueGlow: 'rgba(70, 130, 180, 0.3)',
        shadow: '0 8px 32px rgba(255, 69, 0, 0.15)',
        shimmer: 'linear-gradient(90deg, transparent, rgba(192, 192, 192, 0.3), transparent)',
      }
    }
  },

  // Original Midnight Luxury Theme
  'midnight-luxury': {
    name: 'Midnight Luxury',
    description: 'Sophisticated dark elegance with gold accents',
    colors: {
      background: {
        primary: '#000000',
        secondary: '#0a0a0a',
        tertiary: '#141414',
        elevated: '#1a1a1a',
        glass: 'rgba(20, 20, 20, 0.7)',
      },
      accent: {
        primary: '#d4af37',   // Gold
        secondary: '#b87333', // Copper
        danger: '#dc2626',
        info: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
      },
      text: {
        primary: '#e5e5e7',   // Platinum
        secondary: '#8e8e93', // Silver
        muted: '#6d6d73',     // Mercury
        accent: '#d4af37',    // Gold accent text
      },
      border: {
        primary: 'rgba(212, 175, 55, 0.2)',
        secondary: 'rgba(255, 255, 255, 0.03)',
        muted: 'rgba(255, 255, 255, 0.05)',
      },
      effects: {
        redGlow: 'rgba(212, 175, 55, 0.3)',
        orangeGlow: 'rgba(184, 115, 51, 0.3)',
        blueGlow: 'rgba(59, 130, 246, 0.2)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        shimmer: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
      }
    }
  },

  // Midnight Ocean Theme
  'midnight-ocean': {
    name: 'Midnight Ocean',
    description: 'Deep ocean depths with electric blue currents',
    colors: {
      background: {
        primary: '#0B1929',
        secondary: '#1E3A5F',
        tertiary: '#2C4F7C',
        elevated: '#3A5998',
        glass: 'rgba(44, 79, 124, 0.8)',
      },
      accent: {
        primary: '#00D4FF',   // Electric blue
        secondary: '#00FFD1', // Teal
        danger: '#FF6B35',    // Warm orange
        info: '#0096FF',
        success: '#FFD700',
        warning: '#FFA500',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B8D4E3',
        muted: '#6B8CAE',
        accent: '#00D4FF',
      },
      border: {
        primary: 'rgba(0, 212, 255, 0.3)',
        secondary: 'rgba(184, 212, 227, 0.1)',
        muted: 'rgba(107, 140, 174, 0.15)',
      },
      effects: {
        redGlow: 'rgba(0, 212, 255, 0.4)',
        orangeGlow: 'rgba(0, 255, 209, 0.4)',
        blueGlow: 'rgba(0, 150, 255, 0.3)',
        shadow: '0 8px 32px rgba(0, 212, 255, 0.2)',
        shimmer: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent)',
      }
    }
  },

  // Dark Forest Theme
  'dark-forest': {
    name: 'Dark Forest',
    description: 'Ancient woods with emerald magic',
    colors: {
      background: {
        primary: '#0D1F0F',
        secondary: '#1A3A1A',
        tertiary: '#2A4A2A',
        elevated: '#3A5A3A',
        glass: 'rgba(42, 74, 42, 0.8)',
      },
      accent: {
        primary: '#10B981',   // Emerald
        secondary: '#F59E0B', // Amber
        danger: '#DC2626',
        info: '#7C3AED',      // Purple
        success: '#059669',
        warning: '#D97706',
      },
      text: {
        primary: '#F0FDF4',
        secondary: '#BBF7D0',
        muted: '#86EFAC',
        accent: '#10B981',
      },
      border: {
        primary: 'rgba(16, 185, 129, 0.3)',
        secondary: 'rgba(187, 247, 208, 0.1)',
        muted: 'rgba(134, 239, 172, 0.15)',
      },
      effects: {
        redGlow: 'rgba(16, 185, 129, 0.4)',
        orangeGlow: 'rgba(245, 158, 11, 0.4)',
        blueGlow: 'rgba(124, 58, 237, 0.3)',
        shadow: '0 8px 32px rgba(16, 185, 129, 0.2)',
        shimmer: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent)',
      }
    }
  },

  // Cyber Punk Theme
  'cyber-punk': {
    name: 'Cyber Punk',
    description: 'Neon-soaked digital rebellion',
    colors: {
      background: {
        primary: '#1A0B2E',
        secondary: '#2D1B69',
        tertiary: '#3F2B96',
        elevated: '#523BC3',
        glass: 'rgba(63, 43, 150, 0.8)',
      },
      accent: {
        primary: '#C77DFF',   // Neon purple
        secondary: '#00FFFF', // Electric cyan
        danger: '#FF10F0',    // Hot magenta
        info: '#00CED1',
        success: '#7FFF00',   // Chartreuse
        warning: '#FF1493',   // Deep pink
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#E0AAFF',
        muted: '#9D4EDD',
        accent: '#C77DFF',
      },
      border: {
        primary: 'rgba(199, 125, 255, 0.4)',
        secondary: 'rgba(224, 170, 255, 0.1)',
        muted: 'rgba(157, 78, 221, 0.2)',
      },
      effects: {
        redGlow: 'rgba(199, 125, 255, 0.5)',
        orangeGlow: 'rgba(0, 255, 255, 0.5)',
        blueGlow: 'rgba(0, 206, 209, 0.4)',
        shadow: '0 8px 32px rgba(199, 125, 255, 0.3)',
        shimmer: 'linear-gradient(90deg, transparent, rgba(199, 125, 255, 0.4), transparent)',
      }
    }
  }
};

export const applyTheme = (themeName) => {
  if (!themes[themeName]) {
    console.warn(`Theme "${themeName}" not found`);
    return;
  }

  const theme = themes[themeName];
  const root = document.documentElement;
  
  // Apply CSS variables dynamically
  Object.entries(theme.colors).forEach(([category, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${category}-${key}`, value);
    });
  });
  
  // Add theme class to body for theme-specific styles
  document.body.className = document.body.className.replace(/theme-\w+/g, '');
  document.body.classList.add(`theme-${themeName}`);
  
  // Save to localStorage
  localStorage.setItem('selectedTheme', themeName);
};

export const getCurrentTheme = () => {
  return localStorage.getItem('selectedTheme') || 'carbon-forge';
};

export const initializeTheme = () => {
  const savedTheme = getCurrentTheme();
  applyTheme(savedTheme);
  return savedTheme;
};