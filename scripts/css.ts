/**
 * Builds the Papyrus stylesheet and themes.
 *
 * 1. Bundles the theme runtime (src/theme) to dist/theme.esm.js + dist/theme.cjs.js
 * 2. Bundles the layout CSS (src/styles) and flattens native nesting
 * 3. Appends the generated token rules and the default theme => dist/papyrus.css
 * 4. Writes every built-in theme to dist/themes/<name>.css
 * 5. Writes theme.d.ts from the scope maps
 *
 * Usage: node scripts/css.ts [--minify]
 */

import { build } from 'esbuild';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const minify = process.argv.includes('--minify');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const banner = `/* 𓁁 Papyrus v${pkg.version} | MIT | https://github.com/panoply/papyrus */\n`;

mkdirSync(join(dist, 'themes'), { recursive: true });

/* THEME RUNTIME ------------------------------ */

for (const format of [ 'esm', 'cjs' ] as const) {
  await build({
    entryPoints: [ join(root, 'src/theme/index.ts') ],
    bundle: true,
    format,
    platform: 'neutral',
    target: 'es2020',
    minify,
    legalComments: 'none',
    outfile: join(dist, `theme.${format}.js`)
  });
}

const theme = await import(pathToFileURL(join(dist, 'theme.esm.js')).href + `?t=${Date.now()}`);

/* TYPES GENERATOR (build only) --------------- */

const typesBundle = await build({
  entryPoints: [ join(root, 'src/theme/types.ts') ],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'neutral',
  target: 'es2020'
});

const types = await import(`data:text/javascript;base64,${Buffer.from(typesBundle.outputFiles[0].text).toString('base64')}`);

/* LAYOUT ------------------------------------- */

const layout = await build({
  entryPoints: [ join(root, 'src/styles/papyrus.css') ],
  bundle: true,
  write: false,
  minify,
  legalComments: 'none',
  target: [ 'chrome100', 'safari15', 'firefox100' ]
});

const nl = minify ? '' : '\n';
const section = (title: string) => minify ? '' : `\n/* ${'-'.repeat(46)} */\n/* ${title.padEnd(44)} */\n/* ${'-'.repeat(46)} */\n\n`;

/* STYLESHEET --------------------------------- */

const stylesheet = banner
  + layout.outputFiles[0].text.trim() + nl
  + section('TOKENS')
  + theme.tokenCSS({ minify })
  + section(`THEME: ${theme.potion.name}`)
  + theme.themeCSS(theme.potion, { root: true, minify });

writeFileSync(join(dist, 'papyrus.css'), stylesheet);

/* THEMES ------------------------------------- */

for (const name in theme.themes) {
  writeFileSync(
    join(dist, 'themes', `${name}.css`),
    banner + theme.themeCSS(theme.themes[name], { minify })
  );
}

/* TYPES -------------------------------------- */

writeFileSync(join(root, 'theme.d.ts'), types.typesDTS());

/* DOCS --------------------------------------- */

const docs = join(root, 'docs');

if (existsSync(docs)) {
  mkdirSync(join(docs, 'public'), { recursive: true });
  writeFileSync(join(docs, 'public', 'papyrus.css'), stylesheet);
}

console.log(`𓁁 papyrus.css ${(stylesheet.length / 1024).toFixed(1)}kb, ${Object.keys(theme.themes).length} themes, theme.d.ts`);
