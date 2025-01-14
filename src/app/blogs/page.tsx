import { cmsClient } from "#/libs/client";

type Props = {
  id: string;
  title: string;
};

async function getBlogPosts(): Promise<Props[]> {
  const data = await cmsClient.get({
    endpoint: "blogs",
    queries: {
      fields: "id,title",
      limit: 5,
    },
  });
  return data.contents;
}

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li>
            <a href={`/blogs/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
