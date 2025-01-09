import { Button } from "ginga-ui/core";
import ThemeClient from "ginga-ui/ai";

export default async function Home() {
  const themeClient = new ThemeClient({
    clientType: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const { CSSCode } = await themeClient.generateTheme("fairy tale");

  return (
    <div>
      <style>{CSSCode}</style>
      <Button>aaas</Button>
    </div>
  );
}
