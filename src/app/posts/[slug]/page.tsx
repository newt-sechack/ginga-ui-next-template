import { htmlToComponents } from "#/components/Markdown";
import { cmsClient, getBlogPosts } from "#/libs/cms";
import ThemeClient from "ginga-ui/ai";
import { Box, Heading, Link } from "ginga-ui/core";

import { Metadata } from "next/types";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await await cmsClient.get({
    endpoint: "blogs",
    contentId: slug,
  });

  if (!post) {
    return {
      title: "お知らせが見つかりませんでした",
    };
  }

  return {
    title: post.title,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await await cmsClient.get({
    endpoint: "blogs",
    contentId: slug,
  });

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

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((item) => ({
    slug: item.id,
  }));
}
