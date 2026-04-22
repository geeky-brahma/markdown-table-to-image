export type TableTheme = string;

export interface TableConfig {
  theme: TableTheme;
  font: string;
  fontSize: number;
  textColor: string;
  headerBg: string;
  rowEvenBg: string;
  rowOddBg: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  padding: number;
  showBorders: boolean;
  shadow: boolean;
  gradientBackground: string;
  // Content options
  title: string;
  showTitle: boolean;
  subtitle: string;
  showSubtitle: boolean;
  footer: string;
  showFooter: boolean;
}

export const DEFAULTS: TableConfig = {
  theme: "dark",
  font: "Playfair Display",
  fontSize: 14,
  textColor: "#e5e5e5",
  headerBg: "transparent",
  rowEvenBg: "transparent",
  rowOddBg: "transparent",
  borderColor: "#262626",
  borderWidth: 1,
  borderRadius: 16,
  padding: 64,
  showBorders: true,
  shadow: true,
  gradientBackground: "radial-gradient(circle at top left, #2d1b4e, #0a0a0a)",
  // New content defaults
  title: "Table Report",
  showTitle: true,
  subtitle: "Generated with Tablify • Sophisticated Edition",
  showSubtitle: true,
  footer: "Verified by Tablify",
  showFooter: true,
};
