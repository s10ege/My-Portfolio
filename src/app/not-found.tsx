import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32 text-center">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-4">
        404
      </p>
      <h1 className="text-4xl font-bold text-white mb-4">Page not found</h1>
      <p className="text-gray-400 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
      >
        ← Back home
      </Link>
    </div>
  );
}
