import createCache, { type StylisPlugin } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ReactNode, useMemo } from "react";

// https://github.com/emotion-js/emotion/issues/3134#issuecomment-1939309240
const wrapInLayer: (layerName: string) => StylisPlugin =
  (layerName) => (node) => {
    // if we're not at the root of a <style> tag, leave the tree intact
    if (node.parent) return;

    // if we're at the root, replace node with `@layer layerName { node }`
    const child = { ...node, parent: node, root: node };
    Object.assign(node, {
      children: [child],
      length: 6,
      parent: null,
      props: [layerName],
      return: "",
      root: null,
      type: "@layer",
      value: `@layer ${layerName}`
    });
  };

const cache = createCache({
        key: "with-tailwind",
        stylisPlugins: [wrapInLayer("components")]
      }),

// https://github.com/JedWatson/react-select/blob/master/storybook/stories/ClassNamesWithTailwind.stories.tsx
// This ensures that Emotion's styles are moved to a components layer
// so that Tailwind utility classes have precedence over Emotion
export const EmotionCacheProvider = ({ children }: { children: ReactNode }) => {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
