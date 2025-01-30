import type { Metadata } from "next";
import "ginga-ui/style.css";
import "ginga-ui/variables.css";
import { Heading, Input } from "ginga-ui";

import "./styles.css";
import styles from "./layout.module.css";
import { getBlogPosts } from "#/libs/cms";

export const metadata: Metadata = {
  title: "Ginga Blog",
  description: "Created with ginga-ui",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <header className={styles.header}>
          <Heading level="h1">Ginga Blog</Heading>
          <div>
            <Input placeholder="Search" />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
