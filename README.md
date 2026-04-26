
# Tablify — Markdown Table to Image & Excel

**Convert markdown tables into beautiful, customizable images and Excel files for blogs and reports.**

</div>

---

## Features

- **PNG Export** — Download a high-quality 2× pixel-ratio PNG of your table with one click
- **Excel Export** — One-click `.xlsx` spreadsheet generation from any markdown table
- **20+ Themes** — Premium presets (Auric Gold, Royal Velvet, Onyx Black, Pearl Ocean …) plus brand-inspired palettes (Vercel, Gemini, Stripe, Tailwind, Supabase …) and aesthetic styles (Ice, Sunset, Breeze)
- **Typography** — Choose from Playfair Display, Inter, JetBrains Mono, or Space Grotesk
- **Document Labels** — Add an optional title, header subtitle, and footer to the exported image
- **Customization** — Adjust corner radius, padding density (S / M / L), and border visibility
- **Real-time Preview** — See every change reflected instantly with smooth animated transitions

## Tech Stack

| Layer | Library |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Markdown | react-markdown + remark-gfm |
| Image export | html-to-image |
| Excel export | xlsx |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev
```

### Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check with TypeScript (`tsc --noEmit`) |
| `npm run clean` | Remove the `dist` folder |

## Usage

1. Paste or type a markdown table in the **editor** on the left sidebar.
2. Optionally edit the **title**, **header info**, and **footer** labels.
3. Pick a **theme**, **font**, corner **radius**, and padding **density**.
4. Click **Export PNG** in the header to download a high-resolution image, or **Export Excel (.xlsx)** at the bottom of the sidebar to download a spreadsheet.
