"use client";
import { useActionState } from "react";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendContactEmail,
    null
  );

  if (state?.success) {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent-soft p-8 text-center">
        <p className="mb-2 font-mono text-xs text-accent">
          <span className="text-accent/60">{"// "}</span>delivered
        </p>
        <p className="mb-1 text-lg font-semibold text-fg">Message sent.</p>
        <p className="text-sm text-fg-muted">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-wider text-fg-dim"
          >
            name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="your name"
            className="w-full rounded-md border border-rule bg-surface px-4 py-2.5 text-sm text-fg placeholder-fg-dim transition-colors focus:border-accent/60 focus:bg-surface-1 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-wider text-fg-dim"
          >
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@domain.com"
            className="w-full rounded-md border border-rule bg-surface px-4 py-2.5 text-sm text-fg placeholder-fg-dim transition-colors focus:border-accent/60 focus:bg-surface-1 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-wider text-fg-dim"
        >
          message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="what's on your mind?"
          className="w-full resize-none rounded-md border border-rule bg-surface px-4 py-2.5 text-sm text-fg placeholder-fg-dim transition-colors focus:border-accent/60 focus:bg-surface-1 focus:outline-none"
        />
      </div>

      {state?.error && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2.5 font-mono text-xs text-red-300">
          <span className="text-red-400/70">! </span>{state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {pending ? "sending…" : "send message"}
        {!pending && (
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        )}
      </button>
    </form>
  );
}
