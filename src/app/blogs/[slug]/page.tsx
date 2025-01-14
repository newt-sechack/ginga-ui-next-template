import { cmsClient } from "#/libs/client";
import { Heading } from "ginga-ui/core";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

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
  const content = await marked.parse(post.content);
  const sanitizedContent = DOMPurify(
    new JSDOM("<!DOCTYPE html>").window
  ).sanitize(content);

  return (
    <div>
      <Heading level="h2">{post.title}</Heading>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
    </div>
  );
}
