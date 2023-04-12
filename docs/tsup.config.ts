import { defineConfig } from 'tsup';
import { copyFile } from 'node:fs/promises';

export default defineConfig({
  entry: {
    'bundle.min': './src/index.ts'
  },
  async onSuccess () {
    return copyFile('./node_modules/papyrus/dist/prism.js', './public/prism.js');
  },
  noExternal: [
    'mithril',
    'relapse',
    'papyrus',
    'language-literals'
  ],
  outDir: './public/',
  clean: false,
  bundle: true,
  treeshake: true,
  splitting: false,
  minify: 'terser',
  platform: 'browser',
  target: 'es6',
  format: [
    'esm'
  ]

});
