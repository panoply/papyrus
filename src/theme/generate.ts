import { editor, widget, syntax, languages, BRACKET_LEVELS, PREFIX, kebab, SyntaxScope, LanguageId } from './scopes';

export interface Theme {
  /**
   * The theme name, used by the `theme="name"` attribute
   */
  name: string;
  /**
   * Applied as the `color-scheme` of the editor
   */
  scheme: 'dark' | 'light';
  /**
   * Editor chrome colours
   */
  editor: Record<(typeof editor)[number], string>;
  /**
   * Search, copy and folding widget colours
   */
  widget: Record<(typeof widget)[number], string>;
  /**
   * Bracket pair colours, one per nesting level (6 levels, repeating)
   */
  brackets: string[];
  /**
   * Semantic syntax colours shared by all languages
   */
  syntax: Record<SyntaxScope, string>;
  /**
   * Optional per-language overrides, omitted tokens fall back to the
   * semantic scope they belong to.
   */
  languages?: {
    [L in LanguageId]?: Partial<Record<keyof (typeof languages)[L]['tokens'], string>>
  };
}

const keys = <T extends object>(o: T) => Object.keys(o) as Array<keyof T & string>;

const languageVar = (language: string, token: string) => `${PREFIX}-${language}-${kebab(token)}`;

const rule = (selectors: string[], body: string[], minify: boolean) => minify
  ? `${selectors.join(',')}{${body.join(';')}}`
  : `${selectors.join(',\n')} {\n  ${body.join(';\n  ')};\n}\n`;

/**
 * Generates a theme stylesheet. The variables are applied globally and to
 * any element carrying the `theme="name"` attribute.
 */
export function themeCSS (theme: Theme, minify = false): string {

  const body: string[] = [ `${PREFIX}-scheme: ${theme.scheme}` ];

  for (const key of editor) body.push(`${PREFIX}-${kebab(key)}: ${theme.editor[key]}`);
  for (const key of widget) body.push(`${PREFIX}-widget-${kebab(key)}: ${theme.widget[key]}`);

  for (let i = 0; i < BRACKET_LEVELS; i++) {
    body.push(`${PREFIX}-bracket-${i + 1}: ${theme.brackets[i % theme.brackets.length]}`);
  }

  for (const scope of keys(syntax)) body.push(`${PREFIX}-${kebab(scope)}: ${theme.syntax[scope]}`);

  // Language tokens the theme does not define are reset so they fall back
  // to their semantic scope rather than inheriting from another theme.
  for (const language of keys(languages)) {
    const tokens: Record<string, string> = theme.languages?.[language] || {};
    for (const token of keys(languages[language].tokens)) {
      body.push(`${languageVar(language, token)}: ${tokens[token] || 'initial'}`);
    }
  }

  return rule([ ':root', `[theme="${theme.name}"]` ], body, minify);

}

/**
 * Generates the theme independent token rules shipped in `papyrus.css`
 */
export function tokenCSS (minify = false): string {

  const out: string[] = [];

  for (const scope of keys(syntax)) {
    out.push(rule(syntax[scope].selectors, [ `color: var(${PREFIX}-${kebab(scope)})` ], minify));
  }

  for (let i = 0; i < BRACKET_LEVELS; i++) {
    out.push(rule(
      [ `.token.bracket-level-${i}`, `.token.bracket-level-${i + BRACKET_LEVELS}` ],
      [ `color: var(${PREFIX}-bracket-${i + 1})` ],
      minify
    ));
  }

  for (const language of keys(languages)) {

    const def = languages[language];

    for (const token of keys(def.tokens)) {

      const { scope, selectors } = def.tokens[token] as { scope: SyntaxScope; selectors: string[] };

      if (selectors.length === 0) continue;

      out.push(rule(
        def.selectors.flatMap(container => selectors.map(selector => `${container} ${selector}`)),
        [ `color: var(${languageVar(language, token)}, var(${PREFIX}-${kebab(scope)}))` ],
        minify
      ));

    }
  }

  return out.join(minify ? '' : '\n');

}
