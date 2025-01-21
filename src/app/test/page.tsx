import { Button, Heading, Image, Input, Paragraph } from "ginga-ui/core";
import ThemeClient from "ginga-ui/ai";

export default async function BlogListPage() {
  const themeClient = new ThemeClient({
    clientType: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const { CSSCode } = await themeClient.generateTheme(`
## disney character
pooh`);
  return (
    <div
      style={{
        padding: "1rem",
        color: "var(--color-secondary-9)",
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-family)",
      }}
    >
      <style suppressHydrationWarning>{CSSCode}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Heading level="h1">Example Blog</Heading>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Input placeholder="Find posts by keyword" />
          <Button>Post</Button>
        </div>
      </div>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Kinkaku-ji_2015.JPG"
        style={{
          width: "100%",
          margin: "1rem 0",
          borderRadius: "var(--size-radius)",
          objectFit: "cover",
          height: "300px",
          overflow: "hidden",
        }}
      />
      <Heading
        level="h2"
        style={{
          color: "var(--color-primary-9)",
        }}
      >
        Kinkaku-ji: The Golden Pavilion
      </Heading>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Image
          style={{ width: "50px", height: "50px" }}
          src="https://pbs.twimg.com/profile_images/1798696422747017217/cM_16KWb_400x400.jpg"
          variant="avatar"
        />
        newt
      </div>
      <Paragraph>
        Kinkaku-ji, also known as the Golden Pavilion, is one of Kyoto's most
        iconic landmarks. This Zen Buddhist temple is renowned for its stunning
        gold-leaf-covered exterior, which reflects beautifully in the
        surrounding pond, creating a serene and picturesque setting. Originally
        built in 1397 as a shogun's retirement villa, it later became a temple.
        Visitors can stroll through the meticulously maintained gardens, admire
        the elegant architecture, and experience the peaceful atmosphere that
        embodies traditional Japanese aesthetics.
      </Paragraph>
    </div>
  );
}
