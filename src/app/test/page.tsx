import { Button } from "ginga-ui/core";
import ThemeClient from "ginga-ui/ai";

export default async function Home() {
  const themeClient = new ThemeClient({
    clientType: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
  });

  return (
    <div>
      <Button>aaas</Button>
    </div>
  );
}
