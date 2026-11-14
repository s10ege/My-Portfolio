"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { SIDE_PANES, useTmux, type PaneId } from "./store";
import { WINDOWS, windowForPath } from "./windows";

type Dir = "left" | "right" | "up" | "down";
const ARROWS: Record<string, Dir> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
};

function neighbour(from: PaneId, dir: Dir, lastSide: PaneId): PaneId {
  if (from === "main") return dir === "right" ? lastSide : "main";
  if (dir === "left") return "main";
  const i = SIDE_PANES.indexOf(from);
  if (dir === "up") return SIDE_PANES[Math.max(0, i - 1)];
  if (dir === "down") return SIDE_PANES[Math.min(SIDE_PANES.length - 1, i + 1)];
  return from;
}

export function Keybindings() {
  const router = useRouter();
  const pathname = usePathname();
  const tmux = useTmux();
  const lastSide = useRef<PaneId>("whoami");
  const prefix = useRef(false);
  // Latest values for the single stable listener.
  const live = useRef({ router, pathname, tmux });
  useEffect(() => {
    live.current = { router, pathname, tmux };
  });

  useEffect(() => {
    if (tmux.focusedPane !== "main") lastSide.current = tmux.focusedPane;
  }, [tmux.focusedPane]);

  useEffect(() => {
    const setPrefix = (v: boolean) => {
      prefix.current = v;
      live.current.tmux.setPrefixActive(v);
    };
    const selectWindow = (i: number) => {
      const w = WINDOWS[i];
      if (w) live.current.router.push(w.href);
    };
    const stepWindow = (d: number) => {
      const cur = windowForPath(live.current.pathname).index - 1;
      selectWindow((cur + d + WINDOWS.length) % WINDOWS.length);
    };
    const movePane = (dir: Dir) => {
      const { tmux: t } = live.current;
      const next = neighbour(t.focusedPane, dir, lastSide.current);
      t.setFocusedPane(next);
      document
        .querySelector<HTMLElement>(`[data-pane="${next}"]`)
        ?.focus({ preventScroll: true });
    };

    const onKey = (e: KeyboardEvent) => {
      const t = live.current.tmux;
      if (!t.introDone) return;
      if (["Shift", "Control", "Alt", "Meta"].includes(e.key)) return;

      const el = e.target as HTMLElement | null;
      const typing =
        !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);

      if (e.key === "Escape") {
        if (prefix.current) setPrefix(false);
        if (t.keysPopupOpen) t.setKeysPopupOpen(false);
        return;
      }
      if (typing) return;

      if (prefix.current) {
        e.preventDefault();
        setPrefix(false);
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.key >= "1" && e.key <= String(WINDOWS.length)) selectWindow(Number(e.key) - 1);
        else if (e.key === "n") stepWindow(1);
        else if (e.key === "p") stepWindow(-1);
        else if (e.key in ARROWS) movePane(ARROWS[e.key]);
        else if (e.key === "z") t.toggleZoom();
        else if (e.key === "?") t.setKeysPopupOpen(true);
        else if (e.key === "t") t.cycleTheme();
        return;
      }

      if (e.ctrlKey && !e.altKey && !e.metaKey && (e.key === " " || e.code === "Space" || e.key === "b")) {
        e.preventDefault();
        setPrefix(true);
        return;
      }
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const m = /^Digit([1-9])$/.exec(e.code);
        if (m && Number(m[1]) <= WINDOWS.length) {
          e.preventDefault();
          selectWindow(Number(m[1]) - 1);
        }
        return;
      }
      if (e.ctrlKey && e.altKey && !e.metaKey && e.key in ARROWS) {
        e.preventDefault();
        movePane(ARROWS[e.key]);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
