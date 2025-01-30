import { createClient } from "microcms-js-sdk";

export const cmsClient = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

type Props = {
  id: string;
  title: string;
  content: string;
};

export async function getBlogPosts(): Promise<Props[]> {
  const data = await cmsClient.getList({
    customRequestInit: {
      cache: "no-cache",
    },
    endpoint: "blogs",
    queries: {
      fields: "id,title,content",
      limit: 5,
    },
  });
  return data.contents;
}
