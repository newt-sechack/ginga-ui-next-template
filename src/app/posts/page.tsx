import { getBlogPosts } from "#/libs/cms";
import { Anchor, List } from "@ginga-ui/core";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Created with ginga-ui",
};

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <List>
        {posts.map((post) => (
          <li>
            <Anchor href={`posts/${post.id}`}>{post.title}</Anchor>
          </li>
        ))}
      </List>
    </div>
  );
}
