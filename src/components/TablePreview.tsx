import React, { forwardRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TableConfig } from '../types';
import { cn } from '../lib/utils';

interface TablePreviewProps {
  markdown: string;
  config: TableConfig;
}

const TablePreview = forwardRef<HTMLDivElement, TablePreviewProps>(({ markdown, config }, ref) => {
  return (
    <div
      ref={ref}
      id="capture-area"
      className="flex flex-col items-center justify-center w-full transition-all duration-500 ease-in-out"
      style={{
        background: config.gradientBackground,
        padding: `${config.padding}px`,
      }}
    >
      <div
        className={cn(
          "w-full glass shadow-2xl transition-shadow duration-300 relative overflow-hidden"
        )}
        style={{
          borderRadius: `${config.borderRadius}px`,
        }}
      >
        {/* Grain overlay for premium look */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        <div 
          className={cn(
            "p-12 relative z-10 border border-white/5 transition-colors duration-500",
            config.theme === 'premium-pearl' ? "bg-white/95" : "bg-[#0c0c0d]"
          )} 
          style={{ borderRadius: `${config.borderRadius}px` }}
        >
          {/* Decorative Header */}
          {(config.showTitle || config.showSubtitle) && (
            <div className={cn(
              "mb-10 text-left border-l-2 pl-6 animate-in fade-in slide-in-from-left-4 duration-500",
              config.theme === 'premium-pearl' ? "border-slate-300" : "border-accent/30"
            )}>
              {config.showTitle && (
                <h2 className={cn(
                  "serif text-4xl mb-2 tracking-tight transition-colors drop-shadow-sm",
                  config.theme === 'premium-pearl' ? "text-slate-900" : "text-accent"
                )}>
                  {config.title}
                </h2>
              )}
              {config.showSubtitle && (
                <p className={cn(
                  "text-[10px] uppercase tracking-[0.3em] font-medium opacity-40",
                  config.theme === 'premium-pearl' ? "text-slate-600" : "text-white"
                )}>
                  {config.subtitle}
                </p>
              )}
            </div>
          )}

          <div className={cn(
            "markdown-body",
            config.theme === 'premium-pearl' ? "text-slate-800" : "text-white"
          )}>
            <Markdown 
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ children }) => (
                  <table className="w-full border-collapse">
                    {children}
                  </table>
                ),
                thead: ({ children }) => (
                  <thead className={cn(
                    "border-b",
                    config.theme === 'premium-pearl' ? "border-slate-200" : "border-dark-border"
                  )}>
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th 
                    className={cn(
                      "serif italic font-normal py-5 px-4 text-left text-lg transition-colors",
                      config.theme === 'premium-pearl' ? "text-slate-900" : "text-white/90"
                    )}
                    style={{ 
                      borderRight: config.showBorders ? (config.theme === 'premium-pearl' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)') : 'none',
                    }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td 
                    className={cn(
                      "py-5 px-4 text-sm font-sans border-b transition-colors",
                      config.theme === 'premium-pearl' ? "text-slate-600 border-slate-100" : "text-white/60 border-white/[0.03]"
                    )}
                    style={{ 
                      borderRight: config.showBorders ? (config.theme === 'premium-pearl' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)') : 'none',
                      fontFamily: config.font === 'Inter' ? 'var(--font-sans)' : config.font,
                    }}
                  >
                    {children}
                  </td>
                ),
                tr: ({ children, ...props }) => (
                   <tr className={cn(
                    "transition-colors",
                    config.theme === 'premium-pearl' ? "hover:bg-slate-50" : "hover:bg-white/[0.02]"
                  )}>
                    {children}
                  </tr>
                )
              }}
            >
              {markdown}
            </Markdown>
          </div>

          {/* Decorative Footer */}
          {config.showFooter && (
            <div className={cn(
              "mt-10 pt-6 border-t flex justify-between items-center opacity-30 select-none animate-in fade-in duration-700",
              config.theme === 'premium-pearl' ? "border-slate-200 text-slate-800" : "border-white/[0.05] text-white"
            )}>
              <span className="text-[9px] uppercase tracking-[0.2em] italic serif">
                {config.footer}
              </span>
              <div className="flex gap-4">
                <span className="text-[9px] uppercase tracking-[0.2em]">Asset ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                <span className="text-[9px] uppercase tracking-[0.2em]">01 // 01</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .markdown-body table th:last-child, 
        .markdown-body table td:last-child {
          border-right: none !important;
        }
        .markdown-body table tr:last-child td {
          border-bottom: none !important;
        }
        /* Custom font application for the table specifically */
        .markdown-body {
          font-family: ${config.font};
        }
      `}} />
    </div>
  );
});

TablePreview.displayName = 'TablePreview';

export default TablePreview;
