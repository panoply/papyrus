import { defineConfig } from 'tsup';
import { utimes } from 'node:fs/promises';
import { prismjsPlugin } from 'esbuild-plugin-prismjs';

export default defineConfig(
  {
    entry: [
      './src/index.ts'
    ],
    noExternal: [ 'indent-textarea', 'morphdom', 'text-field-edit' ],
    name: 'papyrus',
    globalName: 'papyrus',
    treeshake: true,
    async onSuccess () {
      const time = new Date();
      await utimes('./docs/src/index.ts', time, time);
      return undefined;
    },
    esbuildPlugins: [
      prismjsPlugin({
        inline: true,
        css: false,
        languages: [
          'typescript',
          'javascript',
          'css',
          'scss',
          'yaml',
          'json',
          'jsx',
          'tsx'
        ],
        plugins: [
          // 'line-numbers',
          'treeview',
          'command-line'
        ]
      })
    ],
    outExtension: ({ format }) => {
      if (format === 'iife') {
        return {
          js: '.iife.js'
        };
      }
      return {
        js: ''
      };
    },
    splitting: false,
    format: [
      'cjs',
      'iife',
      'esm'
    ]
  }
);
