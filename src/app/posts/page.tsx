import { getBlogPosts } from "#/libs/cms";

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li>
            <a href={`posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
