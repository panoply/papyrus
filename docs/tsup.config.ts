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
  treeshake: true,
  splitting: false,
  minify: 'terser',
  platform: 'browser',
  target: 'es6',
  format: [
    'esm'
  ]
});
