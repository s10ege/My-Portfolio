"use client";

// STUB: owned by the shell agent. Renders main-vertical layout: main (children) left ~60%, side panes right.
export function Panes({ main, side }: { main: React.ReactNode; side: { whoami: React.ReactNode; gitlog: React.ReactNode; ls: React.ReactNode } }) {
  return <div>{main}{side.whoami}{side.gitlog}{side.ls}</div>;
}
