/**
 * Builds the Papyrus stylesheets.
 *
 * - dist/papyrus.css         layout, widgets and token rules (no colours)
 * - dist/themes/<name>.css   one stylesheet per theme in src/theme/themes
 *
 * Usage: node scripts/css.ts [--minify]
 */

import { build } from 'esbuild';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const minify = process.argv.includes('--minify');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const banner = `/* 𓁁 Papyrus v${pkg.version} | MIT | https://github.com/panoply/papyrus */\n`;

mkdirSync(join(dist, 'themes'), { recursive: true });

/* THEME GENERATOR (build only) --------------- */

const bundle = await build({
  entryPoints: [ join(root, 'src/theme/index.ts') ],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'neutral',
  target: 'es2020'
});

const theme = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);

/* LAYOUT ------------------------------------- */

const layout = await build({
  entryPoints: [ join(root, 'src/styles/papyrus.css') ],
  bundle: true,
  write: false,
  minify,
  legalComments: 'none',
  target: [ 'chrome100', 'safari15', 'firefox100' ]
});

/* STYLESHEET --------------------------------- */

const stylesheet = banner
  + layout.outputFiles[0].text.trim()
  + (minify ? '' : '\n\n/* TOKENS */\n\n')
  + theme.tokenCSS(minify);

writeFileSync(join(dist, 'papyrus.css'), stylesheet);

/* THEMES ------------------------------------- */

for (const item of theme.themes) {
  writeFileSync(join(dist, 'themes', `${item.name}.css`), banner + theme.themeCSS(item, minify));
}

/* DOCS --------------------------------------- */

const docs = join(root, 'docs');

if (existsSync(docs)) {
  mkdirSync(join(docs, 'public'), { recursive: true });
  writeFileSync(join(docs, 'public', 'papyrus.css'), stylesheet);
}

console.log(`𓁁 papyrus.css ${(stylesheet.length / 1024).toFixed(1)}kb, ${theme.themes.length} themes`);
