import { getBlogPosts } from "#/libs/cms";
import { Link, List } from "@ginga-ui";
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
            <Link href={`posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </List>
    </div>
  );
}
