import React from 'react';
import { TableConfig, TableTheme } from '../types';
import { cn } from '../lib/utils';

interface ControlsProps {
  config: TableConfig;
  setConfig: (config: TableConfig) => void;
  isSidebar?: boolean;
}

const THEMES: { label: string; value: string; colors: string[]; category?: string }[] = [
  // Premium Category
  { label: 'Auric Gold', value: 'premium-gold', colors: ['#1a1608', '#000000', '#c4a47c'], category: 'Premium' },
  { label: 'Royal Velvet', value: 'premium-purple', colors: ['#1a0b2e', '#05010d', '#a78bfa'], category: 'Premium' },
  { label: 'Deep Emerald', value: 'premium-green', colors: ['#061a12', '#010503', '#34d399'], category: 'Premium' },
  { label: 'Midnight Silk', value: 'premium-blue', colors: ['#0b162e', '#01050f', '#60a5fa'], category: 'Premium' },
  { label: 'Rose Marble', value: 'premium-rose', colors: ['#2e161a', '#0f0103', '#fb7185'], category: 'Premium' },
  { label: 'Onyx Black', value: 'premium-onyx', colors: ['#050505', '#000000', '#ffffff'], category: 'Premium' },
  { label: 'Pearl Ocean', value: 'premium-pearl', colors: ['#e2e8f0', '#ffffff', '#1e293b'], category: 'Premium' },
  { label: 'Titanium', value: 'premium-mono', colors: ['#171717', '#000000', '#a3a3a3'], category: 'Premium' },

  // Brand Inspired
  { label: 'Obsidian', value: 'dark', colors: ['#2d1b4e', '#0a0a0a'] },
  { label: 'Vercel', value: 'vercel', colors: ['#000000', '#333333'] },
  { label: 'Gemini', value: 'gemini', colors: ['#8e75ff', '#6e55df'] },
  { label: 'Stripe', value: 'stripe', colors: ['#635bff', '#433bb5'] },
  { label: 'Nuxt', value: 'nuxt', colors: ['#00dc82', '#00bc6e'] },
  { label: 'Cloudflare', value: 'cloudflare', colors: ['#f38020', '#faad3f'] },
  { label: 'Tailwind', value: 'tailwind', colors: ['#06b6d4', '#0891b2'] },
  { label: 'Supabase', value: 'supabase', colors: ['#3ecf8e', '#34b37d'] },

  // Aesthetic
  { label: 'Ice', value: 'ice', colors: ['#cffafe', '#7dd3fc'] },
  { label: 'Sunset', value: 'sunset', colors: ['#f59e0b', '#b45309'] },
  { label: 'Breeze', value: 'breeze', colors: ['#8b5cf6', '#6d28d9'] },
];

const FONTS = [
  'Playfair Display',
  'Inter', 
  'JetBrains Mono', 
  'Space Grotesk'
];

export default function Controls({ config, setConfig }: ControlsProps) {
  const updateConfig = (updates: Partial<TableConfig>) => {
    setConfig({ ...config, ...updates });
  };

  const handleThemeChange = (val: string) => {
    const theme = THEMES.find(t => t.value === val);
    if (theme) {
      const gradient = theme.category === 'Premium'
        ? `radial-gradient(circle at top left, ${theme.colors[0]} 0%, ${theme.colors[1]} 100%)`
        : theme.value === 'dark'
        ? `radial-gradient(circle at top left, ${theme.colors[0]}, ${theme.colors[1]})`
        : `linear-gradient(135deg, ${theme.colors[0]} 0%, ${theme.colors[1]} 100%)`;

      updateConfig({ 
        theme: theme.value as any,
        gradientBackground: gradient
      });
    }
  };

  const LANGUAGES = [
    'typescript', 'javascript', 'python', 'rust', 'go', 'cpp', 'css', 'html', 'sql', 'markdown'
  ];

  return (
    <section className="flex flex-col gap-8 pb-12">
      <div>
        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-4 block">
          Render Mode
        </label>
        <div className="flex p-1 bg-dark-card border border-dark-border rounded-lg">
          <button
            onClick={() => updateConfig({ mode: 'table' })}
            className={cn(
              "flex-1 py-2 text-[11px] font-bold rounded transition-all",
              config.mode === 'table' ? "bg-accent text-black shadow-lg" : "text-white/40 hover:text-white"
            )}
          >
            Markdown Table
          </button>
          <button
            onClick={() => updateConfig({ mode: 'code' })}
            className={cn(
              "flex-1 py-2 text-[11px] font-bold rounded transition-all",
              config.mode === 'code' ? "bg-accent text-black shadow-lg" : "text-white/40 hover:text-white"
            )}
          >
            Code Snippet
          </button>
        </div>
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-4 block">
          Document Labels
        </label>
        <div className="space-y-4">
          {/* Title Edit */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Title</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={config.showTitle}
                  onChange={(e) => updateConfig({ showTitle: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-7 h-4 bg-dark-border rounded-full peer peer-checked:bg-accent/60 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3"></div>
              </label>
            </div>
            {config.showTitle && (
              <input 
                type="text"
                value={config.title}
                onChange={(e) => updateConfig({ title: e.target.value })}
                className="w-full bg-dark-card border border-dark-border text-white text-[11px] rounded px-3 py-1.5 outline-none focus:border-accent/40"
              />
            )}
          </div>

          {/* Subtitle / Header Edit */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Header Info</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={config.showSubtitle}
                  onChange={(e) => updateConfig({ showSubtitle: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-7 h-4 bg-dark-border rounded-full peer peer-checked:bg-accent/60 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3"></div>
              </label>
            </div>
            {config.showSubtitle && (
              <input 
                type="text"
                value={config.subtitle}
                onChange={(e) => updateConfig({ subtitle: e.target.value })}
                className="w-full bg-dark-card border border-dark-border text-white text-[11px] rounded px-3 py-1.5 outline-none focus:border-accent/40"
              />
            )}
          </div>

          {/* Footer Edit */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Footer</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={config.showFooter}
                  onChange={(e) => updateConfig({ showFooter: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-7 h-4 bg-dark-border rounded-full peer peer-checked:bg-accent/60 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-3"></div>
              </label>
            </div>
            {config.showFooter && (
              <input 
                type="text"
                value={config.footer}
                onChange={(e) => updateConfig({ footer: e.target.value })}
                className="w-full bg-dark-card border border-dark-border text-white text-[11px] rounded px-3 py-1.5 outline-none focus:border-accent/40"
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-4 block">
          Customization
        </label>

        <div className="space-y-5">
          {/* Language Selection */}
          {config.mode === 'code' && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Language</span>
              <select 
                value={config.language}
                onChange={(e) => updateConfig({ language: e.target.value })}
                className="bg-dark-card border border-dark-border text-white text-[11px] rounded px-2 py-1 w-32 outline-none focus:border-accent/40 capitalize"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          )}

          {/* Theme Select */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">Theme</span>
            <select 
              value={config.theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="bg-dark-card border border-dark-border text-white text-[11px] rounded px-2 py-1 w-32 outline-none focus:border-accent/40"
            >
              <optgroup label="Premium" className="bg-[#1a1a1a] text-accent">
                {THEMES.filter(t => t.category === 'Premium').map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </optgroup>
              <optgroup label="Brands" className="bg-[#1a1a1a]">
                {THEMES.filter(t => t.category !== 'Premium' && t.label !== 'Ice' && t.label !== 'Sunset' && t.label !== 'Breeze').map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </optgroup>
              <optgroup label="Aesthetic" className="bg-[#1a1a1a]">
                {THEMES.filter(t => !t.category && ['Ice', 'Sunset', 'Breeze'].includes(t.label)).map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Font Family */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">Typography</span>
            <select 
              value={config.font}
              onChange={(e) => updateConfig({ font: e.target.value })}
              className="bg-dark-card border border-dark-border text-white text-[11px] rounded px-2 py-1 w-32 outline-none focus:border-accent/40"
            >
              {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          {/* Border Radius */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">Radius</span>
            <div className="flex items-center gap-3">
              <input 
                type="range"
                min="0"
                max="32"
                value={config.borderRadius}
                onChange={(e) => updateConfig({ borderRadius: parseInt(e.target.value) })}
                className="w-24 h-1.5 bg-dark-border rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <span className="text-[10px] text-white/30 w-4">{config.borderRadius}</span>
            </div>
          </div>

          {/* Padding (as buttons) */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">Density</span>
            <div className="flex gap-1.5">
              {[
                { label: 'S', val: 16 },
                { label: 'M', val: 32 },
                { label: 'L', val: 64 },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => updateConfig({ padding: p.val })}
                  className={`w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold transition-colors ${
                    config.padding === p.val 
                      ? 'bg-accent text-black' 
                      : 'bg-dark-border text-white/60 hover:bg-[#333]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Borders */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">Borders</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.showBorders}
                onChange={(e) => updateConfig({ showBorders: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent/60"></div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
