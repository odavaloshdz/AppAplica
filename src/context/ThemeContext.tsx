import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeColor = 'blue' | 'emerald' | 'violet' | 'rose' | 'amber' | 'cyan';
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  isDarkMode: boolean;
  themeColor: ThemeColor;
  themeMode: ThemeMode;
  fontSize: number;
  toggleTheme: () => void;
  setThemeColor: (color: ThemeColor) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setFontSize: (size: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  themeColor: 'blue',
  themeMode: 'system',
  fontSize: 16,
  toggleTheme: () => {},
  setThemeColor: () => {},
  setThemeMode: () => {},
  setFontSize: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const COLOR_VARIABLES: Record<ThemeColor, Record<string, string>> = {
  blue: {
    primary: 'rgb(37, 99, 235)',
    'primary-dark': 'rgb(29, 78, 216)',
    'primary-light': 'rgb(96, 165, 250)',
  },
  emerald: {
    primary: 'rgb(16, 185, 129)',
    'primary-dark': 'rgb(4, 120, 87)',
    'primary-light': 'rgb(52, 211, 153)',
  },
  violet: {
    primary: 'rgb(139, 92, 246)',
    'primary-dark': 'rgb(109, 40, 217)',
    'primary-light': 'rgb(167, 139, 250)',
  },
  rose: {
    primary: 'rgb(244, 63, 94)',
    'primary-dark': 'rgb(225, 29, 72)',
    'primary-light': 'rgb(251, 113, 133)',
  },
  amber: {
    primary: 'rgb(245, 158, 11)',
    'primary-dark': 'rgb(217, 119, 6)',
    'primary-light': 'rgb(251, 191, 36)',
  },
  cyan: {
    primary: 'rgb(6, 182, 212)',
    'primary-dark': 'rgb(8, 145, 178)',
    'primary-light': 'rgb(34, 211, 238)',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return (saved as ThemeMode) || 'system';
  });

  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem('themeColor');
    return (saved as ThemeColor) || 'blue';
  });

  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? parseInt(saved) : 16;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (themeMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return themeMode === 'dark';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === 'system') {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    if (themeMode === 'system') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      setIsDarkMode(themeMode === 'dark');
    }
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    const root = document.documentElement;
    const colors = COLOR_VARIABLES[themeColor];
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [themeColor]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize.toString());
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const handleSetFontSize = (size: number) => {
    // Limit font size between 12 and 24 pixels
    const newSize = Math.min(Math.max(size, 12), 24);
    setFontSize(newSize);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        themeColor, 
        themeMode,
        fontSize,
        toggleTheme: () => {
          if (themeMode === 'system') {
            setThemeMode(isDarkMode ? 'light' : 'dark');
          } else {
            setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
          }
        },
        setThemeColor,
        setThemeMode,
        setFontSize: handleSetFontSize
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};