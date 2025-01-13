import { Button, FormControl, Input } from "ginga-ui/core";
import ThemeClient from "ginga-ui/ai";

export default async function Home() {
  const themeClient = new ThemeClient({
    clientType: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const { CSSCode } = await themeClient.generateTheme("halloween");

  return (
    <div>
      <style suppressHydrationWarning>{CSSCode}</style>
      <Button>aaas</Button>
      <FormControl title="Name">
        <Input type="text" />
      </FormControl>
    </div>
  );
}
