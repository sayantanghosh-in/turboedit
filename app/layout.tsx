import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Gradient } from "@/components/Gradient";
import { IconHeart } from "@tabler/icons-react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TurboEdit | Sayantan Ghosh",
  description:
    "TurboEdit is a very simple mardown editor for the web. It provides a WYSIWIG editor and a realtime markdown (.md / .mdx) ourput. It is created and maintained by me, Sayantan Ghosh. I am a front end engineer specializing in React.JS, Typescript, Next.JS and various other technologies like Express.JS, Node.JS, PostgreSQL, etc.",
  openGraph: {
    title: "Sayantan Ghosh",
    description:
      "TurboEdit is a very simple mardown editor for the web. It provides a WYSIWIG editor and a realtime markdown (.md / .mdx) ourput. It is created and maintained by me, Sayantan Ghosh. I am a front end engineer specializing in React.JS, Typescript, Next.JS and various other technologies like Express.JS, Node.JS, PostgreSQL, etc.",
    url: "https://turboedit.sayantanghosh.in",
    siteName: "TurboEdit | Sayantan Ghosh",
    images: [
      {
        url: "https://sayantanghosh.in/sayantan.png",
        width: 320,
        height: 320,
        alt: "Sayantan Ghosh's TurboEdit Website Open Graph Image",
      },
    ],
  },
  keywords: [
    "TurboEdit",
    "Turbo",
    "Edit",
    "WYSIWIG",
    "markdown",
    "real time",
    "md",
    "mdx",
    ".md",
    ".mdx",
    "Sayantan",
    "Ghosh",
    "India",
    "Bengaluru",
    "Bangalore",
    "Sayantan Ghosh India",
    "Sayantan Ghosh Bengaluru",
    "Sayantan Ghosh Bangalore",
    "Sayantan Ghosh Karnataka",
    "Sayantan Ghosh Bengaluru Karnataka",
    "Sayantan Ghosh Bangalore Karnataka",
    "Front end",
    "Developer",
    "Engineer",
    "React.js",
    "Typescript",
    "Next.js",
    "Express.js",
    "Node.js",
    "Postgresql",
    "Gen AI",
    "Vibe Coding",
    "Google Prompting Essentials",
  ],
  twitter: {
    card: "summary_large_image",
    title: "Sayantan Ghosh",
    description:
      "TurboEdit is a very simple mardown editor for the web. It provides a WYSIWIG editor and a realtime markdown (.md / .mdx) ourput. It is created and maintained by me, Sayantan Ghosh. I am a front end engineer specializing in React.JS, Typescript, Next.JS and various other technologies like Express.JS, Node.JS, PostgreSQL, etc.",
    site: "@sayantan__ghosh",
    creator: "@sayantan__ghosh",
    images: ["https://sayantanghosh.in/sayantan.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <div>
          <header className="sticky top-0 mt-1 border-y-1 bg-background px-2 md:px-32 lg:px-64">
            <Nav />
          </header>
          <main className="mb-[58px]">{children}</main>
          <Gradient additionalClass="fixed bottom-[34px] border-t-1 bg-background" />
          <footer className="fixed bottom-0 w-full border-y-1 bg-background px-2 md:px-32 lg:px-64">
            <section className="border-x-1 px-2 text-xs flex justify-center items-center gap-0.5 py-2">
              <span>Made with</span>
              <IconHeart size={12} fill="var(--destructive)" /> by
              <span>Sayantan Ghosh</span>
            </section>
          </footer>
        </div>
      </body>
    </html>
  );
}
