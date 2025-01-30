import { getBlogPosts } from "#/libs/cms";
import { Link, List } from "ginga-ui";

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
