import { defineConfig } from 'tsup';
import { utimes } from 'node:fs/promises';

export default defineConfig([
  {
    entry: {
      papyrus: './src/index.ts'
    },
    noExternal: [
      'morphdom',
      'prismjs',
      'indent-textarea'
    ],
    clean: false,
    name: 'papyrus',
    globalName: 'papyrus',
    treeshake: 'smallest',
    platform: 'neutral',
    minifyIdentifiers: true,
    minifySyntax: true,
    terserOptions: {
      keep_classnames: false,
      ecma: 2016,
      compress: {
        passes: 100
      }
    },
    minify: 'terser',
    async onSuccess () {
      const time = new Date();
      await utimes('./docs/src/theme/index.ts', time, time);
      return undefined;
    },
    esbuildOptions: options => {
      options.treeShaking = true;
    },
    outExtension ({ format }) {

      if (format === 'cjs') {
        return {
          js: '.cjs'
        };
      } else if (format === 'esm') {
        return {
          js: '.mjs'
        };

      } else {
        return {
          js: '.js'
        };
      }
    },
    format: [
      'cjs',
      'esm'
    ],
    splitting: false

  }
]);
