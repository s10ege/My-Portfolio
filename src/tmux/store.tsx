"use client";

// Shared tmux state. Every tmux component reads and writes through useTmux().
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_THEME_ID, THEMES, THEME_STORAGE_KEY } from "./themes";

export type PaneId = "main" | "graph";
/** Spatial order for focus moves: main is left, side panes stack top to bottom on the right. */
export const SIDE_PANES: PaneId[] = ["graph"];

interface TmuxState {
  focusedPane: PaneId;
  setFocusedPane: (p: PaneId) => void;
  zoomed: boolean;              // focused pane fills the window
  toggleZoom: () => void;
  prefixActive: boolean;        // shows PREFIX flag in the Status Bar
  setPrefixActive: (v: boolean) => void;
  keysPopupOpen: boolean;
  setKeysPopupOpen: (v: boolean) => void;
  themeId: string;
  setThemeId: (id: string) => void;
  cycleTheme: () => void;
  introDone: boolean;           // false while the Intro is on screen; keys are ignored until true
  setIntroDone: (v: boolean) => void;
}

const Ctx = createContext<TmuxState | null>(null);

export function TmuxProvider({ children }: { children: React.ReactNode }) {
  const [focusedPane, setFocusedPane] = useState<PaneId>("main");
  const [zoomed, setZoomed] = useState(false);
  const [prefixActive, setPrefixActive] = useState(false);
  const [keysPopupOpen, setKeysPopupOpen] = useState(false);
  const [themeId, setThemeIdState] = useState(DEFAULT_THEME_ID);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    // Sync from the pre-paint boot script; server render must use the default.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t && THEMES.some((x) => x.id === t)) setThemeIdState(t);
  }, []);

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id);
    document.documentElement.dataset.theme = id;
    try { localStorage.setItem(THEME_STORAGE_KEY, id); } catch {}
  }, []);

  const cycleTheme = useCallback(() => {
    const i = THEMES.findIndex((t) => t.id === themeId);
    setThemeId(THEMES[(i + 1) % THEMES.length].id);
  }, [themeId, setThemeId]);

  const toggleZoom = useCallback(() => setZoomed((z) => !z), []);

  return (
    <Ctx.Provider value={{ focusedPane, setFocusedPane, zoomed, toggleZoom, prefixActive, setPrefixActive, keysPopupOpen, setKeysPopupOpen, themeId, setThemeId, cycleTheme, introDone, setIntroDone }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTmux(): TmuxState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTmux outside TmuxProvider");
  return v;
}
