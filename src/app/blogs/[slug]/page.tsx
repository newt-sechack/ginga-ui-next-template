import { cmsClient } from "#/libs/client";
import { Heading, Link } from "ginga-ui/core";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import remarkHtml from "remark-html";

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

  return (
    <div>
      <Heading level="h2">{post.title}</Heading>
      <Markdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkHtml]}
      >
        {post.content}
      </Markdown>
    </div>
  );
}
