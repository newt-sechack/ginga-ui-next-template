import type { Metadata } from "next";
import "ginga-ui/style.css";
import "ginga-ui/variables.css";

export const metadata: Metadata = {
  title: "GingaUI Example Blog",
  description: "Created with ginga-ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
