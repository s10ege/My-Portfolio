import { getAllProjects } from "@/lib/mdx";
import { getContributions } from "./SidePanes";

// Mirrors Omarchy's /etc/fastfetch/config.jsonc: logo from ~/.config/omarchy/branding/about.txt
// in green, then boxed module groups with tree keys. Values are the owner's profile, not hardware.
const LOGO = `██████████████████████████████████████████████████████
██████████████████████████████████████████████████████
████                     ████                     ████
████                     ████                     ████
████    █████████████████████         ████████    ████
████    █████████████████████         ████████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████████████                              ████    ████
████████████                              ████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████    ████                              ████    ████
████    ██████████████████████████████████████    ████
████    ██████████████████████████████████████    ████
████                     ████                     ████
████                     ████                     ████
█████████████████████████████     ████████████████████
█████████████████████████████     ████████████████████`;

const WIDTH = 44;

function boxTop(title: string) {
  const fill = WIDTH - 2 - title.length;
  const left = Math.floor(fill / 2);
  return `┌${"─".repeat(left)}${title}${"─".repeat(fill - left)}┐`;
}
const BOX_BOTTOM = `└${"─".repeat(WIDTH - 2)}┘`;

type Row = [key: string, value: React.ReactNode];

function Group({ title, color, rows }: { title: string; color: string; rows: Row[] }) {
  return (
    <>
      <div className="text-[var(--t-brightblack)]">{boxTop(title)}</div>
      {rows.map(([key, value], i) => {
        const tree = i === 0 ? "" : i === rows.length - 1 ? "└ └ " : "│ ├ ";
        return (
          <div key={key}>
            <span style={{ color }}>{tree + key}</span>: {value}
          </div>
        );
      })}
      <div className="text-[var(--t-brightblack)]">{BOX_BOTTOM}</div>
      <div>&nbsp;</div>
    </>
  );
}

const DOTS = ["--t-fg", "--t-cyan", "--t-magenta", "--t-blue", "--t-yellow", "--t-green", "--t-red"];

export async function Fastfetch() {
  const projects = getAllProjects();
  const contributions = await getContributions();

  return (
    <div className="flex gap-[6ch] whitespace-pre leading-[1.25]">
      <div
        className="pl-[2ch] pt-[2.5em] text-[var(--t-green)] [text-shadow:0.6px_0_currentColor,-0.6px_0_currentColor,0_0.6px_currentColor,0_-0.6px_currentColor]"
        aria-hidden
      >
        {LOGO}
      </div>
      <div className="pt-[2.5em]">
        <Group
          title="Profile"
          color="var(--t-green)"
          rows={[
            ["Name", "Soner Eroglu"],
            ["Role", "Software Developer"],
            ["Degree", "BEng Computer Systems Eng, 2:1"],
            ["School", "Brunel University London"],
            ["Location", "London, UK"],
          ]}
        />
        <Group
          title="Stack"
          color="var(--t-blue)"
          rows={[
            ["Languages", "Python, TypeScript, Java, C, Rust"],
            ["Web", "React, Next.js, Flask, Tauri"],
            ["ML", "FAISS, scikit-learn, RAG"],
            ["Embedded", "PIC16, Raspberry Pi"],
            [
              "Theme",
              <>
                Omarchy{" "}
                {DOTS.map((v) => (
                  <span key={v} style={{ color: `var(${v})` }}>●</span>
                ))}
              </>,
            ],
          ]}
        />
        <Group
          title="Activity"
          color="var(--t-magenta)"
          rows={[
            ["Projects", `${projects.length} case studies`],
            ["Contribs", contributions ? `${contributions.total.toLocaleString("en-US")} in 3 months` : "unavailable"],
            ["Latest", projects[0]?.title ?? "-"],
          ]}
        />
      </div>
    </div>
  );
}
