import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-6 py-20">
      <p className="mb-4 font-mono text-xs text-accent">
        <span className="text-accent/60">{"// "}</span>error 404
      </p>
      <h1 className="mb-4 text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
        Page{" "}
        <span className="font-display font-normal italic text-accent">not found</span>.
      </h1>
      <p className="mb-8 max-w-md text-fg-muted leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or was moved. Try
        heading back to the start.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
      >
        <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span>
        cd ~/
      </Link>
    </div>
  );
}
