'use client';

import { useState, useEffect } from 'react';
import { themes, applyTheme, getCurrentTheme } from '../themes';
import { Palette, ChevronDown } from 'lucide-react';

export default function ThemeSwitcher({ compact = false }) {
  const [currentTheme, setCurrentTheme] = useState('carbon-forge');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = getCurrentTheme();
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    applyTheme(themeName);
    setIsOpen(false);
  };

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200"
          style={{
            backgroundColor: 'var(--theme-background-tertiary)',
            borderColor: 'var(--theme-border-secondary)',
            color: 'var(--theme-text-secondary)'
          }}
        >
          <Palette className="w-4 h-4" />
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            className="absolute top-full right-0 mt-2 w-48 rounded-lg border backdrop-blur-xl z-50"
            style={{
              backgroundColor: 'var(--theme-background-glass)',
              borderColor: 'var(--theme-border-primary)',
              boxShadow: 'var(--theme-effects-shadow)'
            }}
          >
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`w-full px-4 py-3 text-left transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  currentTheme === key ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                }`}
                style={{
                  backgroundColor: currentTheme === key ? 'var(--theme-background-elevated)' : 'transparent',
                  color: 'var(--theme-text-primary)'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.colors.background.secondary }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.colors.accent.primary }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.colors.accent.secondary }}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{theme.name}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="theme-switcher-full">
      <div className="mb-6">
        <h3 
          className="text-lg font-medium mb-2"
          style={{ color: 'var(--theme-text-primary)' }}
        >
          Theme Selection
        </h3>
        <p 
          className="text-sm"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          Choose your preferred visual theme
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => handleThemeChange(key)}
            className={`theme-preview-card p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              currentTheme === key 
                ? 'ring-2 ring-offset-2' 
                : 'hover:scale-105'
            }`}
            style={{
              backgroundColor: theme.colors.background.secondary,
              borderColor: currentTheme === key ? theme.colors.accent.primary : theme.colors.border.secondary,
              ringColor: currentTheme === key ? theme.colors.accent.primary : 'transparent',
              ringOffsetColor: theme.colors.background.primary
            }}
          >
            {/* Theme Preview */}
            <div className="mb-3">
              <div className="flex space-x-2 mb-2">
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: theme.colors.background.primary }}
                />
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: theme.colors.background.tertiary }}
                />
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: theme.colors.background.elevated }}
                />
              </div>
              <div className="flex space-x-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.colors.accent.primary }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.colors.accent.secondary }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.colors.accent.success }}
                />
              </div>
            </div>

            {/* Theme Info */}
            <div>
              <h4 
                className="font-medium mb-1"
                style={{ color: theme.colors.text.primary }}
              >
                {theme.name}
                {currentTheme === key && (
                  <span 
                    className="ml-2 text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: theme.colors.accent.primary,
                      color: theme.colors.background.primary
                    }}
                  >
                    Active
                  </span>
                )}
              </h4>
              <p 
                className="text-xs"
                style={{ color: theme.colors.text.muted }}
              >
                {theme.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}