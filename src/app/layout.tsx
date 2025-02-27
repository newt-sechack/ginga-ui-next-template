import { Heading } from "ginga-ui";
import "ginga-ui/style.css";
import "ginga-ui/variables.css";
import type { Metadata } from "next";

import Search from "./_components/Search";
import styles from "./layout.module.css";
import "./styles.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Ginga Blog",
    default: "Ginga Blog",
  },
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
          <Heading level="h1" className={styles.title}>
            Ginga Blog
          </Heading>
          <Search />
        </header>
        {children}
      </body>
    </html>
  );
}
