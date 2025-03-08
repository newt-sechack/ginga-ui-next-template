import { htmlToComponents } from "#/components/Markdown";
import { cmsClient, getBlogPosts } from "#/libs/cms";
import { Anchor, Box, Heading, Image, ThemeClient } from "@ginga-ui/core";

import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "%5Bslug%5D") {
    notFound();
  }

  const post = await await cmsClient.get({
    customRequestInit: {
      cache: "no-cache",
    },
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

  if (slug === "%5Bslug%5D") {
    // 何故か`[slug]`がそのまま渡ってくるので、その場合は404を返す
    notFound();
  }

  const post = await await cmsClient.get({
    customRequestInit: {
      cache: "no-cache",
    },
    endpoint: "blogs",
    contentId: slug,
  });

  if (!post) {
    notFound();
  }

  const themeClient = new ThemeClient({
    clientType: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const { CSSCode } = await themeClient.generateTheme(post.content);
  const Output = () => htmlToComponents(post.content);

  return (
    <Box>
      <style suppressHydrationWarning>{CSSCode}</style>
      <Image
        src={post.eyecatch.url}
        alt={post.title}
        className={styles["eyecatch"]}
      />
      <Heading level="h2" className={styles.title}>
        {post.title}
      </Heading>
      <div className={styles["author"]}>
        <Image
          src="https://newt239.dev/icon.webp"
          variant="avatar"
          className={styles["avatar"]}
        />
        newt
      </div>
      <Output />
      <Box className={styles["post-footer"]}>
        <Anchor href="/">Back to list</Anchor>
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
