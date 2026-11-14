"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HOST } from "./windows";
import { useTmux } from "./store";

const FLAG = "tmux-intro-seen";
const PROMPT = "soner@arch ~ % ";
const REMOTE_PROMPT = "soner@sonereroglu ~ % ";
const SSH = `ssh soner@${HOST}`;
const ATTACH = "tmux attach";

function lastLogin(): string {
  const d = new Date(Date.now() - 20 * 3600 * 1000);
  const [wd, mon, day, yr] = d.toDateString().split(" ");
  return `Last login: ${wd} ${mon} ${day} ${d.toTimeString().slice(0, 8)} ${yr} from 192.168.1.24`;
}

/** Full screen text for each step: [delay before it appears (ms), text]. */
function buildFrames(): [number, string][] {
  const frames: [number, string][] = [];
  const type = (cmd: string, step: number, before: string, prompt: string) => {
    for (let i = 1; i <= cmd.length; i++) frames.push([step, before + prompt + cmd.slice(0, i)]);
  };
  type(SSH, 22, "", PROMPT);
  const motd = `${PROMPT}${SSH}\n${lastLogin()}\nLinux ${HOST} 7.2.15-1-omarchy x86_64\n\n`;
  frames.push([180, motd + REMOTE_PROMPT]);
  type(ATTACH, 28, motd, REMOTE_PROMPT);
  return frames;
}

export function Intro() {
  const pathname = usePathname();
  const { setIntroDone } = useTmux();
  // Server renders the overlay on "/" so the tmux layout never flashes; the mount effect decides.
  const [visible, setVisible] = useState(pathname === "/");
  const [text, setText] = useState(PROMPT);

  useEffect(() => {
    let skip = false;
    try { skip = sessionStorage.getItem(FLAG) === "1"; } catch {}
    if (pathname !== "/" || skip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      setIntroDone(true);
      return;
    }

    const timers: number[] = [];
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      cleanup();
      // Set here, not on mount: StrictMode re-runs the effect and would skip the Intro.
      try { sessionStorage.setItem(FLAG, "1"); } catch {}
      setVisible(false);
      setIntroDone(true);
    };
    const events = ["keydown", "click", "touchstart"] as const;
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, finish, true));
    events.forEach((e) => window.addEventListener(e, finish, true));

    let t = 150;
    for (const [step, frame] of buildFrames()) {
      t += step;
      timers.push(window.setTimeout(() => setText(frame), t));
    }
    timers.push(window.setTimeout(finish, t + 200));
    return () => {
      finished = true;
      timers.forEach(clearTimeout);
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 z-[1000] overflow-hidden whitespace-pre-wrap break-all bg-[var(--t-bg)] p-[1ch] text-[var(--t-fg)]"
      style={{ fontFamily: "var(--font-jetbrains)" }}
      aria-hidden
    >
      {text}
      <span className="bg-[var(--t-fg)]"> </span>
    </div>
  );
}
