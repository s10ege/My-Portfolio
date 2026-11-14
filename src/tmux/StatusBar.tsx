"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTmux } from "./store";
import { THEMES } from "./themes";
import { HOST, SESSION_NAME, WINDOWS, windowForPath } from "./windows";

export function StatusBar() {
  const pathname = usePathname();
  const { prefixActive, setKeysPopupOpen, themeId, cycleTheme } = useTmux();
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
    </div>
  );
}
