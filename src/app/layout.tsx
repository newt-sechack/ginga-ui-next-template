import type { Metadata } from "next";
import "ginga-ui/style.css";
import "ginga-ui/variables.css";
import { Box, Button, Heading, Input } from "ginga-ui";

import "./styles.css";
import styles from "./layout.module.css";
import Search from "./_components/Search";

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
          <Search />
        </header>
        {children}
      </body>
    </html>
  );
}
