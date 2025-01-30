import { getBlogPosts } from "#/libs/cms";
import { Heading, Link, List } from "ginga-ui";
import ThemeClient from "ginga-ui/ai";

export default async function Home() {
  const themeClient = new ThemeClient({
    clientType: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
  });
  const { CSSCode } = await themeClient.generateTheme("halloween");

  const posts = await getBlogPosts();

  return (
    <>
      <style suppressHydrationWarning>{CSSCode}</style>
      <Heading level="h1">Happy Halloween!</Heading>
      <List>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </List>
    </>
  );
}
