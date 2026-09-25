import {
  editor,
  widget,
  syntax,
  languages,
  BRACKET_LEVELS,
  PREFIX,
  kebab,
  SyntaxScope,
  LanguageId
} from './scopes';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

export type ThemeScheme = 'dark' | 'light';

export type ThemeEditor = Record<keyof typeof editor, string>;

export type ThemeWidget = Record<keyof typeof widget, string>;

export type ThemeSyntax = Record<SyntaxScope, string>;

export type ThemeLanguages = {
  [L in LanguageId]?: Partial<Record<keyof (typeof languages)[L]['tokens'], string>>
};

export interface Theme {
  /**
   * The theme name, used in `data-papyrus-theme="name"`
   */
  name: string;
  /**
   * Whether the theme is dark or light. Applied as the `color-scheme`
   * of the editor and used for `prefers-color-scheme` matching.
   */
  scheme: ThemeScheme;
  /**
   * Editor chrome colours
   */
  editor: ThemeEditor;
  /**
   * Search, copy and folding widget colours
   */
  widget: ThemeWidget;
  /**
   * Bracket pair colours, one per nesting level (6 levels, repeating)
   */
  brackets: string[];
  /**
   * Semantic syntax colours shared by all languages
   */
  syntax: ThemeSyntax;
  /**
   * Optional per-language overrides. Omitted tokens fall back to the
   * semantic scope they belong to.
   */
  languages?: ThemeLanguages;
}

/**
 * A partial theme. Anything omitted is inherited from the theme it
 * extends (the default `potion` theme when `extends` is omitted).
 */
export interface ThemeInput {
  name: string;
  extends?: string | Theme;
  scheme?: ThemeScheme;
  editor?: Partial<ThemeEditor>;
  widget?: Partial<ThemeWidget>;
  brackets?: string[];
  syntax?: Partial<ThemeSyntax>;
  languages?: ThemeLanguages;
}

export interface ThemeCSSOptions {
  /**
   * Emit the variables on `:root` so the theme applies without a
   * `data-papyrus-theme` attribute (the default theme in `papyrus.css`).
   *
   * @default false
   */
  root?: boolean;
  /**
   * Also apply the theme automatically when the users `prefers-color-scheme`
   * matches the theme scheme and no explicit `data-papyrus-theme` is set.
   *
   * @default false
   */
  auto?: boolean;
  /**
   * Custom selector to scope the variables to, replaces the generated
   * `[data-papyrus-theme]` selectors.
   */
  selector?: string;
  /**
   * Minify the output
   *
   * @default false
   */
  minify?: boolean;
}

/* -------------------------------------------- */
/* HELPERS                                      */
/* -------------------------------------------- */

const keys = <T extends object>(o: T) => Object.keys(o) as Array<keyof T & string>;

/**
 * Custom property name for an editor key
 */
export const editorVar = (key: string) => `${PREFIX}-${kebab(key)}`;

/**
 * Custom property name for a widget key
 */
export const widgetVar = (key: string) => `${PREFIX}-widget-${kebab(key)}`;

/**
 * Custom property name for a bracket level (1 based)
 */
export const bracketVar = (level: number) => `${PREFIX}-bracket-${level}`;

/**
 * Custom property name for a semantic scope
 */
export const syntaxVar = (scope: string) => `${PREFIX}-${kebab(scope)}`;

/**
 * Custom property name for a language token
 */
export const languageVar = (language: string, token: string) => `${PREFIX}-${language}-${kebab(token)}`;

function block (selector: string, body: string[], minify: boolean) {

  if (body.length === 0) return '';

  return minify
    ? `${selector}{${body.join(';')}}`
    : `${selector} {\n  ${body.join(';\n  ')};\n}\n`;

}

function rule (selectors: string[], declaration: string, minify: boolean) {

  return minify
    ? `${selectors.join(',')}{${declaration}}`
    : `${selectors.join(',\n')} {\n  ${declaration};\n}\n`;

}

/* -------------------------------------------- */
/* VARIABLES                                    */
/* -------------------------------------------- */

/**
 * Returns a flat map of custom property names to values for the theme.
 */
export function vars (theme: Theme): Record<string, string> {

  const map: Record<string, string> = {};

  map[`${PREFIX}-scheme`] = theme.scheme;

  for (const key of keys(editor)) map[editorVar(key)] = theme.editor[key];
  for (const key of keys(widget)) map[widgetVar(key)] = theme.widget[key];

  for (let i = 0; i < BRACKET_LEVELS; i++) {
    map[bracketVar(i + 1)] = theme.brackets[i % theme.brackets.length];
  }

  for (const scope of keys(syntax)) map[syntaxVar(scope)] = theme.syntax[scope];

  if (theme.languages) {
    for (const language of keys(theme.languages)) {
      const tokens = theme.languages[language];
      if (!tokens) continue;
      for (const token of keys(tokens)) {
        const value = (tokens as Record<string, string>)[token];
        if (value) map[languageVar(language, token)] = value;
      }
    }
  }

  return map;

}

/* -------------------------------------------- */
/* THEME CSS                                    */
/* -------------------------------------------- */

/**
 * Generates the CSS custom property declarations for a theme.
 */
export function themeCSS (theme: Theme, options: ThemeCSSOptions = {}): string {

  const minify = options.minify === true;
  const map = vars(theme);
  const body = keys(map).map(name => `${name}: ${map[name]}`);

  // Reset every language token the theme does not define, otherwise a
  // language override from another theme (e.g. the default on `:root`)
  // would leak through instead of the semantic fallback applying.
  for (const language of keys(languages)) {
    for (const token of keys(languages[language].tokens)) {
      const name = languageVar(language, token);
      if (!(name in map)) body.push(`${name}: initial`);
    }
  }
  const name = JSON.stringify(theme.name);
  const selectors: string[] = [];

  if (options.selector) {
    selectors.push(options.selector);
  } else {
    if (options.root) selectors.push(':root');
    selectors.push(`:root[data-papyrus-theme=${name}]`, `[data-papyrus-theme=${name}]`);
  }

  let css = block(selectors.join(minify ? ',' : ',\n'), body, minify);

  if (options.auto) {
    const inner = block(':root:not([data-papyrus-theme])', body, minify);
    css += minify
      ? `@media (prefers-color-scheme:${theme.scheme}){${inner}}`
      : `\n@media (prefers-color-scheme: ${theme.scheme}) {\n${inner.replace(/^/gm, '  ')}}\n`;
  }

  return css;

}

/* -------------------------------------------- */
/* TOKEN CSS                                    */
/* -------------------------------------------- */

/**
 * Generates the theme independent token rules. Every rule references a
 * custom property, so this only needs to ship once (it is part of
 * `papyrus.css`).
 */
export function tokenCSS (options: { minify?: boolean } = {}): string {

  const minify = options.minify === true;
  const out: string[] = [];

  // Semantic scopes
  for (const scope of keys(syntax)) {
    const def = syntax[scope];
    if (def.selectors.length === 0) continue;
    out.push(rule(def.selectors, `color: var(${syntaxVar(scope)})`, minify));
  }

  // Bracket levels
  for (let i = 0; i < BRACKET_LEVELS; i++) {
    out.push(rule(
      [ `.token.bracket-level-${i}`, `.token.bracket-level-${i + BRACKET_LEVELS}` ],
      `color: var(${bracketVar(i + 1)})`,
      minify
    ));
  }

  // Language tokens
  for (const language of keys(languages)) {

    const def = languages[language];

    for (const token of keys(def.tokens)) {

      const { scope, selectors } = def.tokens[token] as { scope: SyntaxScope; selectors: string[] };

      if (selectors.length === 0) continue;

      const list: string[] = [];

      for (const container of def.selectors) {
        for (const selector of selectors) list.push(`${container} ${selector}`);
      }

      out.push(rule(list, `color: var(${languageVar(language, token)}, var(${syntaxVar(scope)}))`, minify));

    }
  }

  return out.join(minify ? '' : '\n');

}
