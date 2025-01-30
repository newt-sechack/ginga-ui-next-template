import { createClient } from "microcms-js-sdk";

export const cmsClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

type Props = {
  id: string;
  title: string;
};

export async function getBlogPosts(): Promise<Props[]> {
  const data = await cmsClient.get({
    endpoint: "blogs",
    queries: {
      fields: "id,title",
      limit: 5,
    },
  });
  return data.contents;
}
