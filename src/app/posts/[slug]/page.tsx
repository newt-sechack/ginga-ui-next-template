import { htmlToComponents } from "#/components/Markdown";
import { cmsClient } from "#/libs/cms";
import ThemeClient from "ginga-ui/ai";
import { Box, Heading, Link } from "ginga-ui/core";

import styles from "./page.module.css";

type Props = {
  id: string;
  title: string;
  content: string;
};

async function getBlogPostByID(id: string): Promise<Props> {
  const data = await cmsClient.get({
    endpoint: "blogs",
    contentId: id,
  });
  console.log(data);
  return data;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostByID(slug);

  const themeClient = new ThemeClient({
    clientType: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const { CSSCode } = await themeClient.generateTheme(post.content);
  const Output = () => htmlToComponents(post.content);

  return (
    <Box>
      <style suppressHydrationWarning>{CSSCode}</style>
      <Heading level="h2">{post.title}</Heading>
      <Output />
      <Box className={styles["post-footer"]}>
        <Link href="/">Back to list</Link>
      </Box>
    </Box>
  );
}
