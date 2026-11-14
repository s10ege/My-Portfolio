"use client";
import { useActionState } from "react";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendContactEmail,
    null
  );

  if (state?.success) {
    return <p>Message sent. Thanks for reaching out, I will get back to you soon.</p>;
  }

  return (
    <form action={action}>
      <p>
        <label htmlFor="name">name</label>
        <input id="name" name="name" type="text" required />
      </p>
      <p>
        <label htmlFor="email">email</label>
        <input id="email" name="email" type="email" required />
      </p>
      <p>
        <label htmlFor="message">message</label>
        <textarea id="message" name="message" required rows={6} />
      </p>
      {state?.error && <p style={{ color: "var(--t-red)" }}>{state.error}</p>}
      <p>
        <button type="submit" disabled={pending}>
          {pending ? "sending..." : "send"}
        </button>
      </p>
    </form>
  );
}
