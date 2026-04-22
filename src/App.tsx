import React, { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import * as XLSX from "xlsx";
import { DEFAULTS, TableConfig } from "./types";
import TablePreview from "./components/TablePreview";
import Editor from "./components/Editor";
import Controls from "./components/Controls";
import { Share2, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_MARKDOWN = `| Feature | Description | Support |
| :--- | :--- | :---: |
| **Image Export** | High-quality PNG with custom backgrounds | ✅ |
| **Excel Export** | One-click spreadsheet generation | ✅ |
| **Theming** | Beautiful presets for any blog style | ✅ |
| **Custom Fonts** | Choose from modern display & mono fonts | ✅ |
| **Real-time** | See changes as you type | ✅ |`;

export default function App() {
  const [markdown, setMarkdown] = useState(INITIAL_MARKDOWN);
  const [config, setConfig] = useState<TableConfig>(DEFAULTS);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportImage = useCallback(async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      // Small delay to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));
      const dataUrl = await toPng(previewRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        style: {
          transform: 'scale(1)',
        }
      });
      const link = document.createElement("a");
      link.download = `tablify-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export image", err);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleExportExcel = useCallback(() => {
    // Simple markdown table parser for Excel
    const lines = markdown.trim().split("\n");
    const tableData = lines
      .filter((line) => line.includes("|") && !line.includes("---"))
      .map((line) => {
        // Remove leading/trailing pipes and split
        const content = line.trim();
        const parts = content.split("|");
        // Remove empty first/last elements if they exist (standard md table format)
        const startIdx = content.startsWith("|") ? 1 : 0;
        const endIdx = content.endsWith("|") ? parts.length - 1 : parts.length;
        
        return parts
          .slice(startIdx, endIdx)
          .map((cell) => cell.trim().replace(/\*\*|__/g, ""));
      });

    if (tableData.length === 0) return;

    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Table");
    XLSX.writeFile(wb, `tablify-${Date.now()}.xlsx`);
  }, [markdown]);

  return (
    <div className="flex flex-col h-screen bg-dark-bg font-sans overflow-hidden text-[#e5e5e5]">
      {/* Header */}
      <header className="h-16 border-b border-dark-border flex items-center justify-between px-8 bg-dark-header shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-black text-lg shadow-lg shadow-accent/20">
            T
          </div>
          <h2 className="serif text-white font-normal text-xl tracking-wide uppercase">Tablify</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 mr-4">
            <span className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">Crafted for Elegance</span>
          </div>
          <button 
            onClick={() => setConfig(DEFAULTS)}
            className="text-white/40 hover:text-white transition-colors"
            title="Reset to Defaults"
          >
            <Wand2 size={18} />
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-white/40 hover:text-white transition-colors"
          >
            <Share2 size={18} />
          </a>
          <button 
            onClick={handleExportImage}
            className="bg-accent text-black px-5 py-1.5 rounded text-sm font-semibold hover:bg-[#b3936a] transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-accent/10"
          >
            Export PNG
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <aside className="w-80 border-r border-dark-border bg-dark-header flex flex-col shrink-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-8">
            <Editor markdown={markdown} setMarkdown={setMarkdown} />
            <Controls config={config} setConfig={setConfig} isSidebar />
          </div>
          <div className="p-6 border-t border-dark-border bg-dark-header">
            <button 
              onClick={handleExportExcel}
              className="w-full py-2.5 rounded bg-dark-card border border-dark-border text-xs text-white/60 hover:text-white flex items-center justify-center gap-2 transition-colors hover:bg-white/5 active:scale-95"
            >
              Export Excel (.xlsx)
            </button>
          </div>
        </aside>
        
        <div className="flex-1 overflow-auto table-preview-container flex items-center justify-center p-8 md:p-12 relative min-w-0" style={{ background: 'radial-gradient(circle at top left, #2d1b4e, #0a0a0a)' }}>
          <div className="w-full max-w-4xl relative">
             <AnimatePresence mode="wait">
              <motion.div
                key={config.theme}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="glass rounded-2xl p-1 shadow-2xl w-full">
                  <div className="bg-[#0d0d0d] rounded-[calc(1rem-4px)] overflow-hidden">
                    <TablePreview 
                      ref={previewRef} 
                      markdown={markdown} 
                      config={config} 
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {isExporting && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-[#1c1c1e] p-8 rounded-2xl border border-dark-border flex flex-col items-center gap-6 shadow-2xl">
                <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">Capturing Image</p>
                  <p className="text-white/40 text-sm">Please wait while we render your preview...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* No bottom controls needed anymore */}
    </div>
  );
}
