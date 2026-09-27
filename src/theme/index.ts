import { potion } from './themes/potion';
import { potionLight } from './themes/potion-light';
import { githubLight } from './themes/github-light';

export type { Theme } from './generate';
export { themeCSS, tokenCSS } from './generate';

/**
 * Themes written to `dist/themes/<name>.css` by the build. To add a theme,
 * create a file in `./themes` and list it here.
 */
export const themes = [
  potion,
  potionLight,
  githubLight
];
