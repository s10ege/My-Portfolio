"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTmux, type PaneId } from "./store";

type Side = { whoami: React.ReactNode; gitlog: React.ReactNode; ls: React.ReactNode };

const SIDE: (keyof Side)[] = ["whoami", "gitlog", "ls"];

export function Panes({ main, side }: { main: React.ReactNode; side: Side }) {
  const { focusedPane, setFocusedPane, zoomed } = useTmux();
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [pathname]);

  const pane = (id: PaneId, content: React.ReactNode, className: string, extra?: { id?: string }) => (
    <div
      key={id}
      ref={id === "main" ? mainRef : undefined}
      id={extra?.id}
      data-pane={id}
      tabIndex={-1}
      onMouseDown={() => setFocusedPane(id)}
      onFocusCapture={() => setFocusedPane(id)}
      className={`min-h-0 min-w-0 overflow-auto p-[0.5em] ${className}`}
    >
      {content}
    </div>
  );

  if (zoomed) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        {focusedPane === "main"
          ? pane("main", main, "flex-1", { id: "main-pane" })
          : pane(focusedPane, side[focusedPane], "flex-1")}
      </div>
    );
  }

  // Shared borders: each side pane owns the vertical line on its left and the
  // horizontal line on its top, blue when it or its neighbour is focused.
  // Phones (max-md) always behave as zoomed: only the focused pane is shown, via CSS so
  // the server render is already correct.
  const onMain = focusedPane === "main";
  return (
    <div className="flex min-h-0 flex-1">
      {pane("main", main, `basis-3/5 shrink-0 grow-0 max-md:basis-full ${onMain ? "" : "max-md:hidden"}`, { id: "main-pane" })}
      <div className={`flex min-h-0 min-w-0 flex-1 flex-col ${onMain ? "max-md:hidden" : ""}`}>
        {SIDE.map((id, i) => {
          const left = focusedPane === "main" || focusedPane === id ? "border-l-t-blue" : "border-l-t-brightblack";
          const top = i > 0 && (focusedPane === id || focusedPane === SIDE[i - 1]) ? "border-t-t-blue" : "border-t-t-brightblack";
          const mobile = focusedPane === id ? "max-md:border-0" : "max-md:hidden";
          return pane(
            id,
            side[id],
            `flex-1 basis-0 border-l ${left} ${i > 0 ? `border-t ${top}` : ""} ${mobile}`,
          );
        })}
      </div>
    </div>
  );
}
