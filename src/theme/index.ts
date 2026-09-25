import { editor, widget, syntax, languages } from './scopes';
import { potion } from './themes/potion';
import { potionLight } from './themes/potion-light';
import { githubLight } from './themes/github-light';
import { Theme, ThemeInput, ThemeCSSOptions, themeCSS, tokenCSS, vars } from './generate';

export type { Theme, ThemeInput, ThemeCSSOptions, ThemeEditor, ThemeWidget, ThemeSyntax, ThemeLanguages, ThemeScheme } from './generate';

/**
 * Built-in themes
 */
export const themes: Record<string, Theme> = {
  potion,
  'potion-light': potionLight,
  'github-light': githubLight
};

const isObject = (v: unknown): v is Record<string, any> => typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Deep merges theme inputs, later arguments win.
 */
function merge<T> (base: T, ...inputs: any[]): T {

  const out: any = Array.isArray(base) ? [ ...base ] : { ...base };

  for (const input of inputs) {
    if (!isObject(input)) continue;
    for (const key in input) {
      const value = input[key];
      if (value === undefined || value === null) continue;
      out[key] = isObject(value) && isObject(out[key]) ? merge(out[key], value) : value;
    }
  }

  return out;

}

/**
 * Resolves a partial theme input into a complete theme. Missing values are
 * inherited from `extends` (a built-in theme name or theme object) or from
 * the default `potion` theme.
 */
export function resolve (input: Theme | ThemeInput): Theme {

  const base = typeof (input as ThemeInput).extends === 'string'
    ? themes[(input as ThemeInput).extends as string]
    : (input as ThemeInput).extends as Theme || potion;

  if (!base) {
    throw new Error(`𓁁 Papyrus: Unknown theme "${(input as ThemeInput).extends}" to extend`);
  }

  const { extends: _, ...rest } = input as ThemeInput;

  return merge(base, rest) as Theme;

}

/**
 * Creates a new theme from a base theme and partial overrides
 */
export function extend (base: string | Theme, input: Omit<ThemeInput, 'extends'>): Theme {

  return resolve({ ...input, extends: base });

}

/**
 * Generates the CSS for a theme
 */
export function css (input: Theme | ThemeInput, options?: ThemeCSSOptions): string {

  return themeCSS(resolve(input), options);

}

/**
 * Registered runtime style elements
 */
const injected: Map<string, HTMLStyleElement> = new Map();

export interface ThemeHandle {
  /**
   * The resolved theme
   */
  theme: Theme;
  /**
   * The theme name, use with `data-papyrus-theme="name"` or the
   * `theme` option.
   */
  name: string;
  /**
   * The generated CSS
   */
  css: string;
  /**
   * Applies the theme globally (sets `data-papyrus-theme` on `<html>`)
   * or on the provided element.
   */
  use (element?: HTMLElement): void;
  /**
   * Removes the injected `<style>` element
   */
  remove (): void;
}

/**
 * Defines a theme at runtime. In the browser the generated CSS is injected
 * into `<head>` (replacing any previous definition with the same name).
 * Use the returned handle to apply the theme, or reference it by name
 * with `data-papyrus-theme` / the `theme` option.
 */
export function theme (input: Theme | ThemeInput, options: ThemeCSSOptions = {}): ThemeHandle {

  const resolved = resolve(input);
  const output = themeCSS(resolved, options);

  if (typeof document !== 'undefined') {

    let style = injected.get(resolved.name);

    if (!style) {
      style = document.createElement('style');
      style.setAttribute('data-papyrus-theme', resolved.name);
      document.head.appendChild(style);
      injected.set(resolved.name, style);
    }

    style.textContent = output;

  }

  return {
    theme: resolved,
    name: resolved.name,
    css: output,
    use (element?: HTMLElement) {
      if (typeof document === 'undefined') return;
      (element || document.documentElement).setAttribute('data-papyrus-theme', resolved.name);
    },
    remove () {
      const style = injected.get(resolved.name);
      if (style) {
        style.remove();
        injected.delete(resolved.name);
      }
    }
  };

}

theme.css = css;
theme.vars = (input: Theme | ThemeInput) => vars(resolve(input));
theme.extend = extend;
theme.resolve = resolve;
theme.tokens = tokenCSS;
theme.themes = themes;
theme.potion = potion;
theme.potionLight = potionLight;
theme.githubLight = githubLight;
theme.scopes = { editor, widget, syntax, languages };

export { potion, potionLight, githubLight, themeCSS, tokenCSS, vars };
