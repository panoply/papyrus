import { defineConfig } from 'tsup';
import { utimes } from 'node:fs/promises';

export default defineConfig([
  {
    entry: [ './src/node.ts' ],
    noExternal: [
      'prism-code-editor',
      'lz-string'
    ],
    clean: false,
    name: 'papyrus',
    treeshake: 'smallest',
    platform: 'node',
    async onSuccess () {
      const time = new Date();
      await utimes('./docs/src/usage/layout/landing.liquid', time, time);
      return undefined;
    },
    outExtension ({ format }) {
      return {
        js: `.${format}.js`
      };
    },
    splitting: false,
    format: [
      'cjs',
      'esm'
    ]
  },
  {
    entry: [ './src/browser.ts' ],
    noExternal: [
      'prism-code-editor',
      'lz-string'
    ],
    clean: false,
    name: 'papyrus',
    treeshake: 'smallest',
    platform: 'browser',
    splitting: false,
    async onSuccess () {
      const time = new Date();
      await utimes('./docs/src/theme/index.ts', time, time);
      return undefined;
    },
    esbuildOptions: options => {
      options.treeShaking = true;
      options.legalComments = 'none';
    },
    outExtension ({ format }) {
      return {
        js: `.${format}.js`
      };
    },
    format: [
      'esm'
    ]
  }
]);
