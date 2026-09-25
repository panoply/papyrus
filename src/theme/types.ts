import { editor, widget, syntax, languages } from './scopes';
import { editorVar, widgetVar, syntaxVar, languageVar } from './generate';

const keys = <T extends object>(o: T) => Object.keys(o) as Array<keyof T & string>;

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

/**
 * Generates the `theme.d.ts` declaration file content from the scope maps
 */
export function typesDTS (): string {

  const doc = (label: string, description?: string, variable?: string) => {
    const lines = [ label ];
    if (description) lines.push('', description);
    if (variable) lines.push('', `CSS: \`${variable}\``);
    return `  /**\n${lines.map(l => `   * ${l}`.replace(/\s+$/, '')).join('\n')}\n   */\n`;
  };

  let out = '/* AUTO GENERATED FROM src/theme/scopes.ts - DO NOT EDIT */\n\n';

  out += 'export type ThemeScheme = \'dark\' | \'light\';\n\n';

  out += 'export interface ThemeEditor {\n';
  for (const key of keys(editor)) {
    const def = editor[key] as { label: string; description?: string };
    out += doc(def.label, def.description, editorVar(key)) + `  ${key}: string;\n`;
  }
  out += '}\n\n';

  out += 'export interface ThemeWidget {\n';
  for (const key of keys(widget)) {
    const def = widget[key] as { label: string; description?: string };
    out += doc(def.label, def.description, widgetVar(key)) + `  ${key}: string;\n`;
  }
  out += '}\n\n';

  out += 'export interface ThemeSyntax {\n';
  for (const scope of keys(syntax)) {
    const def = syntax[scope] as { label: string; description?: string };
    out += doc(def.label, def.description, syntaxVar(scope)) + `  ${scope}: string;\n`;
  }
  out += '}\n\n';

  out += `export type SyntaxScope = keyof ThemeSyntax;\n\n`;

  out += 'export interface ThemeLanguages {\n';
  for (const language of keys(languages)) {
    const def = languages[language];
    out += doc(def.label) + `  ${language}?: {\n`;
    for (const token of keys(def.tokens)) {
      const { label, scope } = def.tokens[token] as { label: string; scope: string };
      out += doc(label, `Falls back to \`${scope}\``, languageVar(language, token)).replace(/^/gm, '  ') + `    ${token}?: string;\n`;
    }
    out += '  };\n';
  }
  out += '}\n\n';

  out += `export type LanguageId = keyof ThemeLanguages;\n\n`;

  out += [
    'export interface Theme {',
    doc('The theme name, used in `data-papyrus-theme="name"`') + '  name: string;',
    doc('Whether the theme is dark or light', 'Applied as the `color-scheme` of the editor and used for `prefers-color-scheme` matching.') + '  scheme: ThemeScheme;',
    doc('Editor chrome colours') + '  editor: ThemeEditor;',
    doc('Search, copy and folding widget colours') + '  widget: ThemeWidget;',
    doc('Bracket pair colours', 'One per nesting level (6 levels, repeating).') + '  brackets: string[];',
    doc('Semantic syntax colours shared by all languages') + '  syntax: ThemeSyntax;',
    doc('Optional per-language overrides', 'Omitted tokens fall back to the semantic scope they belong to.') + '  languages?: ThemeLanguages;',
    '}',
    '',
    doc('A partial theme', 'Anything omitted is inherited from the theme it extends (the default `potion` theme when `extends` is omitted).').replace(/^  /gm, ''),
    'export interface ThemeInput {',
    '  name: string;',
    '  extends?: string | Theme;',
    '  scheme?: ThemeScheme;',
    '  editor?: Partial<ThemeEditor>;',
    '  widget?: Partial<ThemeWidget>;',
    '  brackets?: string[];',
    '  syntax?: Partial<ThemeSyntax>;',
    '  languages?: ThemeLanguages;',
    '}',
    '',
    'export interface ThemeCSSOptions {',
    doc('Emit the variables on `:root` so the theme applies without a `data-papyrus-theme` attribute', undefined) + '  root?: boolean;',
    doc('Also apply the theme when `prefers-color-scheme` matches and no explicit theme attribute is set') + '  auto?: boolean;',
    doc('Custom selector to scope the variables to') + '  selector?: string;',
    doc('Minify the output') + '  minify?: boolean;',
    '}',
    ''
  ].join('\n');

  out += API_DTS;

  return out;

}

/**
 * Static API declarations appended to `theme.d.ts`
 */
export const API_DTS = `
export interface ScopeMeta {
  label: string;
  description?: string;
}

export interface EditorScopeMeta extends ScopeMeta {
  color: boolean;
}

export interface SyntaxScopeMeta extends ScopeMeta {
  selectors: string[];
}

export interface LanguageTokenMeta {
  label: string;
  scope: SyntaxScope;
  selectors: string[];
}

export interface LanguageMeta {
  label: string;
  selectors: string[];
  tokens: Record<string, LanguageTokenMeta>;
}

/**
 * The scope maps the theme system is generated from. Useful for building
 * theme editors.
 */
export interface ThemeScopes {
  editor: Record<keyof ThemeEditor, EditorScopeMeta>;
  widget: Record<keyof ThemeWidget, EditorScopeMeta>;
  syntax: Record<SyntaxScope, SyntaxScopeMeta>;
  languages: Record<LanguageId, LanguageMeta>;
}

export interface ThemeHandle {
  /**
   * The resolved theme
   */
  theme: Theme;
  /**
   * The theme name, use with \`data-papyrus-theme="name"\` or the \`theme\` option
   */
  name: string;
  /**
   * The generated CSS
   */
  css: string;
  /**
   * Applies the theme globally (sets \`data-papyrus-theme\` on \`<html>\`) or
   * on the provided element.
   */
  use (element?: HTMLElement): void;
  /**
   * Removes the injected \`<style>\` element
   */
  remove (): void;
}

export interface ThemeAPI {
  /**
   * Defines a theme. In the browser the generated CSS is injected into
   * \`<head>\`, replacing any previous definition with the same name.
   *
   * @example
   * import papyrus from 'papyrus';
   *
   * const dusk = papyrus.theme({
   *   name: 'dusk',
   *   extends: 'potion',
   *   syntax: { keyword: '#ff79c6' },
   *   languages: { liquid: { tag: '#bd93f9' } }
   * });
   *
   * dusk.use(); // <html data-papyrus-theme="dusk">
   */
  (theme: Theme | ThemeInput, options?: ThemeCSSOptions): ThemeHandle;
  /**
   * Generates the CSS custom properties for a theme
   */
  css (theme: Theme | ThemeInput, options?: ThemeCSSOptions): string;
  /**
   * Returns a flat map of custom property names to values
   */
  vars (theme: Theme | ThemeInput): Record<string, string>;
  /**
   * Creates a new theme from a base theme and partial overrides
   */
  extend (base: string | Theme, input: Omit<ThemeInput, 'extends'>): Theme;
  /**
   * Resolves a partial theme into a complete theme
   */
  resolve (theme: Theme | ThemeInput): Theme;
  /**
   * Generates the theme independent token rules (already part of \`papyrus.css\`)
   */
  tokens (options?: { minify?: boolean }): string;
  /**
   * Built-in themes by name
   */
  themes: Record<string, Theme>;
  /**
   * The default dark theme
   */
  potion: Theme;
  /**
   * The light variant of the default theme
   */
  potionLight: Theme;
  /**
   * A light theme based on the GitHub Primer palette
   */
  githubLight: Theme;
  /**
   * The scope maps the theme system is generated from
   */
  scopes: ThemeScopes;
}

export declare const theme: ThemeAPI;
export declare const themes: Record<string, Theme>;
export declare const potion: Theme;
export declare const potionLight: Theme;
export declare const githubLight: Theme;
export declare function css (theme: Theme | ThemeInput, options?: ThemeCSSOptions): string;
export declare function extend (base: string | Theme, input: Omit<ThemeInput, 'extends'>): Theme;
export declare function resolve (theme: Theme | ThemeInput): Theme;
export declare function vars (theme: Theme): Record<string, string>;
export declare function themeCSS (theme: Theme, options?: ThemeCSSOptions): string;
export declare function tokenCSS (options?: { minify?: boolean }): string;
`;
