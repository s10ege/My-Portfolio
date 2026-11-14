import { siteConfig } from "@/data/site";

export function Cmd({ children }: { children: string }) {
  return (
    <div>
      <span className="text-[var(--t-green)]">~</span> <span className="text-[var(--t-blue)]">%</span> {children}
    </div>
  );
}

interface Day { date: string; level: number }

// Public contribution calendar from the GitHub profile, refreshed hourly, cut to the last 3 months.
export async function getContributions(): Promise<{ days: Day[]; total: number } | null> {
  try {
    const res = await fetch(`https://github.com/users/${siteConfig.githubUsername}/contributions`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Per-day counts live in the tooltips: <tool-tip for="contribution-day-component-R-C">5 contributions on ...
    const counts = new Map(
      [...html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>(\d+) contributions? on/g)].map(
        ([, id, n]) => [id, Number(n)] as const,
      ),
    );
    const all = [...html.matchAll(/data-date="([\d-]+)"[^>]*id="([^"]+)"[^>]*data-level="(\d)"/g)]
      .map(([, date, id, level]) => ({ date, level: Number(level), count: counts.get(id) ?? 0 }))
      .sort((a, b) => a.date.localeCompare(b.date));
    if (!all.length) return null;
    const cutoff = new Date(all[all.length - 1].date + "T00:00:00Z");
    cutoff.setUTCMonth(cutoff.getUTCMonth() - 3);
    const recent = all.filter((d) => d.date > cutoff.toISOString().slice(0, 10));
    return {
      days: recent.map(({ date, level }) => ({ date, level })),
      total: recent.reduce((sum, d) => sum + d.count, 0),
    };
  } catch {
    return null;
  }
}

const LEVEL_COLOR = [
  "var(--t-selection)",
  "color-mix(in srgb, var(--t-green) 40%, var(--t-bg))",
  "color-mix(in srgb, var(--t-green) 60%, var(--t-bg))",
  "color-mix(in srgb, var(--t-green) 80%, var(--t-bg))",
  "var(--t-green)",
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function Cell({ level }: { level: number }) {
  // One terminal cell per day: a square filling most of a 1ch cell, like a block glyph.
  return (
    <span
      className="inline-block h-[0.8ch] w-[0.8ch] mr-[0.2ch] align-middle"
      style={{ background: LEVEL_COLOR[level] }}
    />
  );
}

export async function ContribGraph() {
  const data = await getContributions();
  if (!data) {
    return (
      <div>
        <Cmd>gh graph</Cmd>
        <div className="text-[var(--t-red)]">failed to fetch contributions</div>
      </div>
    );
  }

  // Columns are weeks (Sunday first), rows are weekdays, like the profile calendar.
  const pad = new Date(data.days[0].date + "T00:00:00Z").getUTCDay();
  const cells: (Day | null)[] = [...Array(pad).fill(null), ...data.days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // Month label above the first week that starts in that month.
  const label = Array(weeks.length).fill(" ");
  let lastMonth = -1;
  weeks.forEach((w, i) => {
    const first = w.find(Boolean);
    const m = first ? Number(first.date.slice(5, 7)) - 1 : -1;
    if (m !== lastMonth) {
      MONTHS[m].split("").forEach((c, j) => (label[i + j] = c));
      lastMonth = m;
    }
  });

  return (
    <div className="whitespace-pre leading-[1.15]">
      <Cmd>gh graph</Cmd>
      <div className="text-[var(--t-brightblack)]">{"    " + label.join("")}</div>
      {[0, 1, 2, 3, 4, 5, 6].map((d) => (
        <div key={d}>
          <span className="text-[var(--t-brightblack)]">{["    ", "Mon ", "    ", "Wed ", "    ", "Fri ", "    "][d]}</span>
          {weeks.map((w, i) => (w[d] ? <Cell key={i} level={w[d]!.level} /> : " "))}
        </div>
      ))}
      <div className="mt-[0.5em] whitespace-normal">
        {data.total.toLocaleString("en-US")} contributions in the last 3 months{"  "}
        <span className="whitespace-nowrap">
          <span className="text-[var(--t-brightblack)]">Less </span>
          {[0, 1, 2, 3, 4].map((l) => <Cell key={l} level={l} />)}
          <span className="text-[var(--t-brightblack)]"> More</span>
        </span>
      </div>
    </div>
  );
}
