import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { ContactForm } from "./ContactForm";
import "@/tmux/glow.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <article className="glow">
      <h1>Contact</h1>
      <ul>
        <li>
          <strong>email:</strong>{" "}
          <a href={siteConfig.links.email}>
            {siteConfig.links.email.replace("mailto:", "")}
          </a>
        </li>
        <li>
          <strong>linkedin:</strong>{" "}
          <a href={siteConfig.links.linkedin}>{siteConfig.links.linkedin}</a>
        </li>
        <li>
          <strong>github:</strong>{" "}
          <a href={siteConfig.links.github}>{siteConfig.links.github}</a>
        </li>
      </ul>
      <h2>Send a message</h2>
      <ContactForm />
    </article>
  );
}
