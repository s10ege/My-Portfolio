// The four Windows shown in the Status Bar. Each is a real URL.
export interface TmuxWindow { index: number; name: string; href: string }

export const WINDOWS: TmuxWindow[] = [
  { index: 1, name: "home", href: "/" },
  { index: 2, name: "projects", href: "/projects" },
  { index: 3, name: "resume", href: "/resume" },
  { index: 4, name: "contact", href: "/contact" },
];

export function windowForPath(pathname: string): TmuxWindow {
  return (
    WINDOWS.slice(1).find((w) => pathname === w.href || pathname.startsWith(w.href + "/")) ??
    WINDOWS[0]
  );
}

export const SESSION_NAME = "soner";
export const HOST = "sonereroglu.space";
