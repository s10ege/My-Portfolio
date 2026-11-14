import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { themeBootScript, themeCss } from "@/tmux/themes";
import { TmuxProvider } from "@/tmux/store";
import { StatusBar } from "@/tmux/StatusBar";
import { Panes } from "@/tmux/Panes";
import { Keybindings } from "@/tmux/Keybindings";
import { KeysPopup } from "@/tmux/KeysPopup";
import { Intro } from "@/tmux/Intro";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <TmuxProvider>
          <div className="tmux-root">
            <StatusBar />
            <Panes main={children} />
          </div>
          <KeysPopup />
          <Keybindings />
          <Intro />
        </TmuxProvider>
      </body>
    </html>
  );
}
