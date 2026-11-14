"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTmux } from "./store";
import { WINDOWS, windowForPath } from "./windows";

export function Keybindings() {
  const router = useRouter();
  const pathname = usePathname();
  const tmux = useTmux();
  const prefix = useRef(false);
  // Latest values for the single stable listener.
  const live = useRef({ router, pathname, tmux });
  useEffect(() => {
    live.current = { router, pathname, tmux };
  });

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
      // Bare 1..4 select a window too: a site shortcut, not a tmux binding.
      if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key >= "1" && e.key <= String(WINDOWS.length)) {
        e.preventDefault();
        selectWindow(Number(e.key) - 1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
