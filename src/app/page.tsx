import { getBlogPosts } from "#/libs/cms";
import { Anchor, List, ThemeClient } from "@ginga-ui/core";

export const dynamic = "force-static";

export default async function Home() {
  const posts = await getBlogPosts();

  const themeClient = new ThemeClient({
    clientType: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
  });
  const { CSSCode } = await themeClient.generateTheme(
    `Blog page like below posts: \n\n${posts
      .map((post) => post.content)
      .join("\n")}`
  );

  return (
    <>
      <style suppressHydrationWarning>{CSSCode}</style>
      <List>
        {posts.map((post) => (
          <li key={post.id}>
            <Anchor href={`posts/${post.id}`}>{post.title}</Anchor>
          </li>
        ))}
      </List>
    </>
  );
}
