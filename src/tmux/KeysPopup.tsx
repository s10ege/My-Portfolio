"use client";

import { useEffect } from "react";
import { useTmux } from "./store";

const KEYS: [string, string][] = [
  ["C-Space, C-b", "Send the prefix key (press, then a key below)"],
  ["prefix 1..4", "Select window 1 to 4"],
  ["prefix n", "Select the next window"],
  ["prefix p", "Select the previous window"],
  ["prefix t", "Cycle the colour theme"],
  ["prefix ?", "List key bindings"],
  ["prefix Escape", "Cancel the prefix"],
  ["1..4", "Select window 1 to 4"],
  ["M-1..M-4", "Select window 1 to 4"],
];

export function KeysPopup() {
  const { keysPopupOpen, setKeysPopupOpen } = useTmux();

  useEffect(() => {
    if (!keysPopupOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "q" && !e.ctrlKey && !e.altKey && !e.metaKey) setKeysPopupOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keysPopupOpen, setKeysPopupOpen]);

  if (!keysPopupOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => setKeysPopupOpen(false)}
    >
      <div
        role="dialog"
        aria-label="Tmux keybindings"
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col border border-[var(--t-brightblack)] bg-[var(--t-bg)] text-[var(--t-fg)]"
        style={{ width: "80%", height: "70%", fontFamily: "var(--font-jetbrains)" }}
      >
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-pre bg-[var(--t-bg)]">
          {" Tmux keybindings "}
        </span>
        <div className="flex-1 overflow-auto px-[1ch] pt-[1lh]">
          <table className="border-collapse">
            <tbody>
              {KEYS.map(([k, note]) => (
                <tr key={k}>
                  <td className="whitespace-pre pr-[2ch] align-top">{k}</td>
                  <td className="align-top">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-[1ch] text-[var(--t-brightblack)]">q or Esc to close</div>
      </div>
    </div>
  );
}
