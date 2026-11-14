"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Every Window is a single full-size pane that scrolls on its own.
export function Panes({ main }: { main: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      ref={mainRef}
      id="main-pane"
      tabIndex={-1}
      className="min-h-0 flex-1 overflow-auto p-[0.5em] outline-none"
    >
      {main}
    </div>
  );
}
