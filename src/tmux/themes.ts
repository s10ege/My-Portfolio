// Omarchy themes, hex values from /usr/share/omarchy/themes/<id>/colors.toml.
// Each Theme becomes a [data-theme="<id>"] block of CSS variables (see themeCss).
// tmux colour names map onto these: blue = --t-blue, black = --t-black, brightblack = --t-brightblack.

export interface Theme {
  id: string;
  name: string;
  mode: "dark" | "light";
  colors: {
    bg: string; fg: string; blue: string; black: string; brightblack: string;
    selection: string; red: string; green: string; yellow: string;
    orange: string; magenta: string; cyan: string;
  };
}

export const THEMES: Theme[] = [
  { id: "ethereal", name: "Ethereal", mode: "dark", colors: { bg: "#060B1E", fg: "#ffcead", blue: "#7d82d9", black: "#060B1E", brightblack: "#6d7db6", selection: "#252e56", red: "#ED5B5A", green: "#92a593", yellow: "#E9BB4F", orange: "#eb8b54", magenta: "#c89dc1", cyan: "#a3bfd1" } },
  { id: "tokyo-night", name: "Tokyo Night", mode: "dark", colors: { bg: "#1a1b26", fg: "#a9b1d6", blue: "#7aa2f7", black: "#1a1b26", brightblack: "#565f89", selection: "#292e42", red: "#f7768e", green: "#9ece6a", yellow: "#e0af68", orange: "#eb927b", magenta: "#ad8ee6", cyan: "#449dab" } },
  { id: "gruvbox", name: "Gruvbox", mode: "dark", colors: { bg: "#282828", fg: "#d4be98", blue: "#7daea3", black: "#282828", brightblack: "#7c6f64", selection: "#504945", red: "#ea6962", green: "#a9b665", yellow: "#d8a657", orange: "#e1875c", magenta: "#d3869b", cyan: "#89b482" } },
  { id: "rose-pine", name: "Rosé Pine", mode: "light", colors: { bg: "#faf4ed", fg: "#575279", blue: "#56949f", black: "#faf4ed", brightblack: "#9893a5", selection: "#dfdad9", red: "#b4637a", green: "#286983", yellow: "#ea9d34", orange: "#cf8057", magenta: "#907aa9", cyan: "#d7827e" } },
  { id: "flexoki-light", name: "Flexoki Light", mode: "light", colors: { bg: "#FFFCF0", fg: "#100F0F", blue: "#205EA6", black: "#FFFCF0", brightblack: "#878580", selection: "#CECDC3", red: "#D14D41", green: "#879A39", yellow: "#D0A215", orange: "#d0772b", magenta: "#CE5D97", cyan: "#3AA99F" } },
];

export const DEFAULT_THEME_ID = "ethereal";
export const THEME_STORAGE_KEY = "tmux-theme";

/** CSS for every theme; the default theme also applies to :root. */
export function themeCss(): string {
  return THEMES.map((t) => {
    const vars = Object.entries(t.colors).map(([k, v]) => `--t-${k}:${v};`).join("");
    const sel = t.id === DEFAULT_THEME_ID ? `:root,[data-theme="${t.id}"]` : `[data-theme="${t.id}"]`;
    return `${sel}{${vars}color-scheme:${t.mode};}`;
  }).join("\n");
}

/** Inline script run before paint so the remembered theme never flashes. */
export const themeBootScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t)document.documentElement.dataset.theme=t;}catch(e){}`;
