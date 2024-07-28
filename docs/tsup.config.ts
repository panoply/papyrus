import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'bundle.min': './src/theme/index.ts',
    'usage.min': './src/usage/app/index.ts'
  },
  noExternal: [
    'mithril',
    'relapse',
    'prismjs',
    'papyrus',
    'invert-color',
    'language-literals',
    'lz-string'
  ],
  outDir: './public/',
  clean: false,
  bundle: true,
  treeshake: false,
  splitting: false,
  platform: 'browser',
  target: 'es6',
  outExtension: () => ({
    js: '.js'
  }),
  format: [
    'iife'
  ]
});
