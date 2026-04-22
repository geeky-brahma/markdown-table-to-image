import React from 'react';
import { Table } from 'lucide-react';

interface EditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

export default function Editor({ markdown, setMarkdown }: EditorProps) {
  return (
    <section>
      <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-3 block">
        Markdown Input
      </label>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |"
        className="w-full h-48 bg-dark-card border border-dark-border rounded-lg p-3 text-xs font-mono text-white/70 focus:outline-none focus:border-accent/50 resize-none transition-colors"
        spellCheck="false"
      />
    </section>
  );
}
