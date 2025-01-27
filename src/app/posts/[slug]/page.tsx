import { cmsClient } from "#/libs/client";
import { Heading } from "ginga-ui/core";
import { htmlToComponents } from "#/components/Markdown";
import ThemeClient from "ginga-ui/ai";

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
  return data.contents[0];
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostByID(id);

  const themeClient = new ThemeClient({
    clientType: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const { CSSCode } = await themeClient.generateTheme(post.content);
  const Output = () => htmlToComponents(`<div>${post.content}</div>`);
  console.log(post.content);

  return (
    <div>
      <style suppressHydrationWarning>{CSSCode}</style>
      <Heading level="h1">{post.title}</Heading>
      <Output />
    </div>
  );
}
