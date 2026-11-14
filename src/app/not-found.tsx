import Link from "next/link";
import "@/tmux/glow.css";

export default function NotFound() {
  return (
    <article className="glow">
      <h1>404</h1>
      <p>This page does not exist.</p>
      <p>
        <Link href="/">back to README</Link>
      </p>
    </article>
  );
}
