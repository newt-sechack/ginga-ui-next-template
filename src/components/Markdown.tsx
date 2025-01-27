import { Heading, Paragraph } from "ginga-ui/core";
import React from "react";
import rehypeReact from "rehype-react";
import rehypeParse from "rehype-parse";
import * as prod from "react/jsx-runtime";
import { unified } from "unified";

// HTMLをReactコンポーネントに変換
const ParagraphWrapper = (props: React.ComponentProps<typeof Paragraph>) => (
  <Paragraph {...props} />
);

const HeadingLevel1 = (
  props: Omit<React.ComponentProps<typeof Heading>, "level">
) => <Heading level="h1" {...props} />;

const HeadingLevel2 = (
  props: Omit<React.ComponentProps<typeof Heading>, "level">
) => <Heading level="h2" {...props} />;

const HeadingLevel3 = (
  props: Omit<React.ComponentProps<typeof Heading>, "level">
) => <Heading level="h3" {...props} />;

const HeadingLevel4 = (
  props: Omit<React.ComponentProps<typeof Heading>, "level">
) => <Heading level="h4" {...props} />;

export const htmlToComponents = (html: string) => {
  return unified()
    .use(rehypeParse, { fragment: true }) // fragmentは必ずtrueにする
    .use(rehypeReact, {
      Fragment: prod.Fragment,
      jsx: prod.jsx,
      jsxs: prod.jsxs,
      components: {
        p: ParagraphWrapper,
        h1: HeadingLevel1,
        h2: HeadingLevel2,
        h3: HeadingLevel3,
        h4: HeadingLevel4,
      },
    })
    .processSync(html).result;
};
