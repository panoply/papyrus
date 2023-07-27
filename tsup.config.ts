import { defineConfig } from 'tsup';
import { utimes } from 'node:fs/promises';

const prism = `
/**
 * 𓁁 PAPYRUS ~ https://papyrus.js.org
 *
 * MIT LICENSE
 *
 * © 2023 Νίκος Σαβίδης
 *
 * ---
 *
 * ⟁ PRISM ~ https://prismjs.com
 *
 * MIT LICENSE
 *
 * © 2012 Lea Verou
 */
if(typeof window!=='undefined')window.Prism=window.Prism||{};window.Prism.manual=true;`;

export default defineConfig([
  {
    entry: {
      papyrus: './src/index.ts'
    },
    noExternal: [
      'prismjs',
      'morphdom',
      '@textcomplete/core',
      '@textcomplete/textarea'
    ],
    clean: false,
    name: 'papyrus',
    banner (context) {
      if (context.format === 'esm') {
        return {
          js: prism
        };
      }
    },
    treeshake: 'smallest',
    platform: 'neutral',
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
