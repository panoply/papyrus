import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'bundle.min': './src/index.ts'
  },
  noExternal: [
    'mithril',
    'relapse',
    'prismjs',
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
