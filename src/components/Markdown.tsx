import { Heading, Paragraph, Image, List, Link } from "ginga-ui/core";
import React from "react";
import rehypeReact from "rehype-react";
import rehypeParse from "rehype-parse";
import * as prod from "react/jsx-runtime";
import { unified } from "unified";
import rehypeSanitize from "rehype-sanitize";

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

const ImageWrapper = (props: React.ComponentProps<"img">) => (
  <Image {...props} />
);

const ListWrapper = (props: React.ComponentProps<"ul">) => (
  <List type="unordered" {...props} />
);

const ListItemWrapper = (props: React.ComponentProps<"li">) => (
  <List.Item {...props} />
);

const AnchorWrapper = (
  props: Omit<React.ComponentProps<"a">, "onFocus" | "onBlur">
) => <Link {...props} />;

export const htmlToComponents = (html: string) => {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
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
        img: ImageWrapper,
        ul: ListWrapper,
        a: AnchorWrapper,
      },
    })
    .processSync(html).result;
};
