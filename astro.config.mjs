import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypePrettyCode from "rehype-pretty-code";
import moonlightTheme from './public/theme/moonlight-ii.json';
import { transformerCopyButton } from '@rehype-pretty/transformers';

import sitemap from '@astrojs/sitemap';

const options = {
  // Specify the theme to use or a custom theme json, in our case
  // it will be a moonlight-II theme from
  // https://github.com/atomiks/moonlight-vscode-theme/blob/master/src/moonlight-ii.json
  theme: moonlightTheme,
  // Callbacks to customize the output of the nodes
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{type: 'text', value: ' '}];
    }
  },
  onVisitHighlightedLine(node) {
    // Adding a class to the highlighted line
    node.properties.className.push('highlighted');
  },
};

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	markdown: {
		rehypePlugins: [
      [
        rehypePrettyCode,
        {
          ...options,
					transformers: [
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 2_500,
            }),
          ],
        },
      ],
    ],
  },
	integrations: [mdx(), sitemap()],
});
