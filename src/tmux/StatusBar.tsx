"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTmux, type PaneId } from "./store";
import { THEMES } from "./themes";
import { HOST, SESSION_NAME, WINDOWS, windowForPath } from "./windows";

// Pane titles for the phone-only second status line (tmux `status 2`).
const PANES: [PaneId, string][] = [
  ["main", "main"],
  ["graph", "graph"],
];

export function StatusBar() {
  const pathname = usePathname();
  const { prefixActive, zoomed, setKeysPopupOpen, themeId, cycleTheme, focusedPane, setFocusedPane } = useTmux();
  const current = windowForPath(pathname);
  const themeName = THEMES.find((t) => t.id === themeId)?.name ?? themeId;

  return (
    <div className="shrink-0 whitespace-pre leading-[1.4]">
      <div className="flex justify-between">
        <div className="flex">
          <span className="bg-t-blue font-bold text-t-black">{` ${SESSION_NAME} `}</span>
          <span> </span>
          {WINDOWS.map((w) => (
            <Link
              key={w.index}
              href={w.href}
              className={w === current ? "font-bold text-t-blue" : "text-t-brightblack"}
            >
              {` ${w.index}:${w.name} `}
            </Link>
          ))}
        </div>
        <div className="flex max-md:hidden">
          {prefixActive && <span className="text-t-blue">PREFIX </span>}
          {zoomed && <span className="text-t-blue">ZOOM </span>}
          <button type="button" className="cursor-pointer" onClick={() => setKeysPopupOpen(true)}>
            C-Space ? keys
          </button>
          <span> · </span>
          <button type="button" className="cursor-pointer" onClick={cycleTheme}>
            {themeName}
          </button>
          <span className="text-t-brightblack">{` · ${HOST} `}</span>
        </div>
      </div>
      {/* Phones show one pane at a time (always zoomed), so a second line lists the panes. */}
      <div className="flex justify-between md:hidden">
        <div className="flex">
          {PANES.map(([id, title], i) => (
            <button
              key={id}
              type="button"
              onClick={() => setFocusedPane(id)}
              className={focusedPane === id ? "font-bold text-t-blue" : "text-t-brightblack"}
            >
              {` ${i + 1}.${title} `}
            </button>
          ))}
        </div>
        <div className="flex">
          <span className="text-t-blue">ZOOM </span>
          <button type="button" onClick={cycleTheme}>
            {`${themeName} `}
          </button>
        </div>
      </div>
    </div>
  );
}
