"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTmux, type PaneId } from "./store";

type Side = { graph: React.ReactNode };

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

  // Two panes side by side: the shared border always touches the focused pane, so it is blue.
  // Phones (max-md) always behave as zoomed: only the focused pane is shown, via CSS so
  // the server render is already correct.
  const onMain = focusedPane === "main";
  return (
    <div className="flex min-h-0 flex-1">
      {pane("main", main, `basis-3/5 shrink-0 grow-0 max-md:basis-full ${onMain ? "" : "max-md:hidden"}`, { id: "main-pane" })}
      {pane("graph", side.graph, `flex-1 border-l border-l-t-blue max-md:border-0 ${onMain ? "max-md:hidden" : ""}`)}
    </div>
  );
}
