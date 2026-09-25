# 𓁁 Papyrus

Syntax highlighting and code editing with textarea enhancements. Papyrus is a drop-in solution for code sample showcasing which offers theme customizations and ships pre-stacked.

Documentation + Custom Theming: [papyrus.js.og](https://papyrus.js.org)

### Reasoning

Papyrus was created to help alleviate some of cumbersome configuration incurred for showcasing code snippets in documentation and websites (specifically the [Æsthetic Documentation](https://æsthetic.dev)). I love PrismJS, it's dope and does dope shit, but going beyond the defaults and bare minimum can be a tad extraneous when you're seeking high level customizations. I wanted something more flexible and integrated, something which provided basic level text editing capabilities. The result is Papyrus.

### Benefits

Papyrus extends upon the default grammars provided by Prism which allows for more control of syntax highlighting. It applies a more advanced capture approach so token colors are more granular with Papyrus theming. The module comes pre-packaged and supports only a small subset of languages common in font-end development, you simply drop it with no additional configuration required. The text editor capabilities are perfect for quick showcases while adhering to common expectations when writing code.

Papyrus is tiny, it's only 12kb ~ gzip and supports the following languages

- XML
- HTML
- Liquid
- CSS
- SCSS
- JSON
- YAML
- Bash (Shell)
- JavaScript
- TypeScript
- JSX
- TSX

### Limitations

Papyrus is appropriating PrismJS and extending its grammars. PrismJS is not built for incremental code edits or frequent changes so performance bottleneck's are incurred at around 3k~loc. There is some rumblings that PrismJS will improve its parse algorithm for use cases such as that being appropriated by Papyrus and so future in versions we may see better performance overall in when working (editing) large documents.

If you require support for large files which exceed 3k~loc maybe choose [ACE](https://github.com/ajaxorg/ace), [Monaco](https://github.com/microsoft/monaco-editor), [CodeMirror](https://codemirror.net/) or [Copenhagen](https://copenhagen.autocode.com/). Papyrus is not designed to be a full-featured editor, it's intended use case is for basic code editing and code sample showcasing.

> **Note**
> Papyrus does not provide completions or intelliSense capabilities.

# Installation

Papyrus ships with PrismJS pre-installed, so you only need this module.

```bash
$ pnpm add papyrus
```

# Options

Papyrus defaults to using the following options.

| Option               | Default | Description                                                 |
| -------------------- | ------- | ----------------------------------------------------------- |
| `autoSave`           | `false` | Saves text edits to local storage between refreshes         |
| `autoClosingPairs`   | `[]`    | A list of characters to indent onto newlines                |
| `editor`             | `true`  | Enable/Disable the text editor feature                      |
| `history`            | `true`  | Record history                                              |
| `id`                 | `null`  | Assign a custom id for querying the model instances         |
| `indentSize`         | `2`     | The size of indentation                                     |
| `indentChar`         | ` `     | The indentation character                                   |
| `indentMultiline`    | `true`  | Whether or not multiline tab indent is supported            |
| `input`              | `''`    | The input code, fallbacks to `<code>` inner HTML            |
| `language`           | `null`  | The language id, fallbacks to `<code>` class name reference |
| `lineHighlight`      | `true`  | Whether or not to highlight lines                           |
| `lineIndent`         | `true`  | Whether or not to preserve indentation levels on newlines   |
| `lineNumbers`        | `true`  | Whether or not to show line numbers                         |
| `locLimit`           | `1500`  | The maximum lines of code to allow                          |
| `newlineIndentPairs` | `[]`    | A list of characters to indent onto newlines                |
| `showSpace`          | `false` | Show invisible whitespace characters                        |
| `showTab`            | `false` | Show invisible tab characters                               |
| `showCRLF`           | `false` | Show invisible LF + CR character combinator sequences       |
| `showLF`             | `false` | Show invisible LF (newline) characters                      |
| `showCR`             | `false` | Show invisible CR (carriage return) characters              |
| `spellcheck`         | `false` | Allow spellchecking in the text editor                      |
| `tabIndent`          | `false` | Allow tab indentation on selections                         |
| `trimStart`          | `true`  | Strip leading extraneous newlines and whitespace            |
| `trimEnd`            | `true`  | Strip ending extraneous newlines and whitespace             |

# Usage

Because the module acts a wrapper around PrismJS the applied syntax highlighting is intended to be as simple as possible. There are 3 different distribution bundles available depending on how you wish to invoke and use Papyrus. You may also prefer leverage attributes on `<pre>` elements to customize operations using `data-papyrus-*` annotations or alternatively use the default function on the exported namespace.

Take the following markup in a static HTML file:

<!--prettier-ignore-->
```html
<html>
  <head>
    <link href="papyrus.css" rel="stylesheet">
    <script src="papyrus.js"></script>
  </head>
  <body>

    <pre class="papyrus">
      <code class="language-liquid">
        {{ object.prop }}
      </code>
    </pre>

    <pre class="papyrus">
      <code class="language-js">
        const foo = () => console.log('bar');
      </code>
    </pre>

  </body>
</html>
```

You would initialize Papyrus and have all the above code regions apply highlighting using the below options provided. Code regions which contain attributes instruct Papyrus to adhere to the options passed. To apply syntax highlighting on the above code dynamically (i.e: in the browser) you will call the following in your bundle:

<!-- prettier-ignore -->
```ts
import papyrus from 'papyrus';

papyrus();

```

# Methods

The default export exposes the following methods. Most cases you'll use `papyrus.mount()` which will give you refined control over the code block instance

```ts
import papyrus from 'papyrus';

// BROWSER ONLY - Highlight/activate editor mode
papyrus(options?: {})

// BROWSER ONLY - Returns all instances of Papyrus
papyrus.model: Map<string, Model>;

// BROWSER ONLY - Get a model by its id or return all models
papyrus.get(id?: string: Model | Model[];

// BROWSER ONLY - Mount and activate the editor
papyrus.mount(element: HTMLPreElement, options?: {}): Model;

// BROWSER ONLY - Static method which work identical to papyrus.create(), returns an element.
papyrus.render(code: string, options?: {}):  HTMLPreElement;

// NODE USAGE - Usage within Node, returns a HTML string.
papyrus.create(code: string, options?: {}): string;

```

> All instances of `papyrus.model` are stored in a Map and can be accessed via `window.papyrus` in the browser.

### Mount

The `mount` import returns a model instance which allow you to work with the code regions. It's more feature filled than simply invoking the default `papyrus()` import. This is typically what you'll be using to control and activate the text editor. If you're working with a SPA (virtual DOM) like React or Mithril, than this is the method you should leverage.

```ts
import papyrus from 'papyrus';

const p = papyrus.mount(document.querySelector('pre'), {
  id: 'some-id',
  autoSave: true,
  autoClosingPairs: [
    ['"', '"'],
    ["'", "'"],
    ['(', ')'],
    ['{', '}'],
    ['[', ']']
  ],
  newlineIndentPairs: [
    ['{', '}'],
    ['[', ']']
  ],
  editor: true,
  indentChar: ' ',
  indentSize: 2,
  input: '',
  language: null,
  lineHighlight: true,
  lineIndent: true,
  lineNumbers: true,
  locLimit: 1500,
  indentMultiline: true,
  tabConvert: true,
  spellcheck: false,
  showCRLF: false,
  showSpace: false,
  showCR: false,
  showLF: false,
  showTab: false,
  tabConvert: true,
  trimEnd: true,
  trimStart: true
});
```

### Create

The `papyrus.create()` method is for usage within Node. The method returns a string and if you're leveraging a SSG like 11ty or transforming markdown with something like markdown-it, then you be using `create`.

```ts
import papyrus from 'papyrus';

const p = papyrus.create('...', {
  id: 'some-id',
  autoSave: true,
  editor: true,
  indentChar: ' ',
  indentSize: 2,
  input: '',
  language: null,
  lineHighlight: true,
  lineIndent: true,
  lineNumbers: true,
  locLimit: 1500,
  spellcheck: false,
  showCRLF: false,
  showSpace: false,
  showCR: false,
  showLF: false,
  showTab: false,
  trimEnd: true,
  trimStart: true,

  // Additional Options
  addClass: {
    pre: [],
    code: []
  },
  addAttrs: {
    pre: [],
    code: []
  }
});
```

### Render

The `papyrus.render()` method is for cases where you want to return a HTMLPreElement and insert it somewhere into the DOM. It works identical to `papyrus.create()` but returns an element instead of a string.

```ts
import papyrus from 'papyrus';

const p = papyrus.render('...', {
  id: 'some-id',
  autoSave: true,
  autoClosingPairs: [
    ['"', '"'],
    ["'", "'"],
    ['(', ')'],
    ['{', '}'],
    ['[', ']']
  ],
  newlineIndentPairs: [
    ['{', '}'],
    ['[', ']']
  ],
  editor: true,
  indentChar: ' ',
  indentSize: 2,
  input: '',
  language: null,
  lineHighlight: true,
  lineIndent: true,
  lineNumbers: true,
  locLimit: 1500,
  indentMultiline: true,
  tabConvert: true,
  spellcheck: false,
  showCRLF: false,
  showSpace: false,
  showCR: false,
  showLF: false,
  showTab: false,
  tabConvert: true,
  trimEnd: true,
  trimStart: true,

  // Additional Options
  addClass: {
    pre: [],
    code: []
  },
  addAttrs: {
    pre: [],
    code: []
  }
});
```

### Model

The `model` method is a getter which returns the instances of Papyrus. Each instance of Papyrus will return a Model. The model will give you access and control over the code regions, enable/disable the editor and generally allow you to refine behavior. You can generate a model from the default `papyrus()` import and the `papyrus.mount()` method. The `papyrus.create()` and `papyrus.render()` methods do not generate models, they are static in nature.

```ts
import papyrus from 'papyrus';

// CREATE MODEL

const p = papyrus.mount(document.querySelector('pre'));

// READ ONLY

readonly p.mode: 'static' | 'error' | 'editing';    // The current mode
readonly p.lines: number;                           // The number of lines
readonly p.language: Languages;                     // The current language id
readonly p.pre: HTMLPreElement;                     // The HTML `<pre>` element
readonly p.code: HTMLElement;                       // The HTML `<code>` element
readonly p.textarea: HTMLTextAreaElement;           // The HTML `<textarea>` element
readonly p.raw: string;                             // The raw string of the `textarea`

// METHODS

// Update editor options, omitting the param returns current options.
p.options(options?: EditorOptions): EditorOptions

// Listener event which invokes each time code changes in editing mode.
p.onUpdate<T = any>(callback:(input: string, language: Languages), scope?: T): false | string | void

// Update the input, optionally provide a language id to change the language mode.
p.update(input: string, language?: Languages): void

// Disable editor mode, makes code input readonly
p.disableEditor(): void

// Enable editor, makes code editable
p.enableEditor(): void

// Show a custom error in the code editor
p.showError: (input: string, context?: { title?: string; stack?: string, heading?: string }) => void;

// Hide the error that was shown
p.hideError(): void


// Returns the models
window.papyrus: Map<string, Model>;

```

# Theming

Themes are plain objects. Every colour in Papyrus is a `--papyrus-*` CSS custom property and the stylesheet, the theme files and the TypeScript types are all generated from a single scope map (`src/theme/scopes.ts`). Nothing is hand written in CSS twice, and a theme never needs to know which selectors a language uses.

The stylesheet ships in 4 parts:

| File                            | Contents                                                              |
| ------------------------------- | --------------------------------------------------------------------- |
| `papyrus/papyrus.css`           | Layout, widgets, token rules and the default `potion` (dark) theme     |
| `papyrus/themes/potion.css`     | The default theme on its own, for switching back to it by name        |
| `papyrus/themes/potion-light.css` | A light variant of the default theme                                |
| `papyrus/themes/github-light.css` | A light theme based on the GitHub Primer palette                    |

### Using a theme

Load `papyrus.css` and any additional theme files, then select a theme with the `data-papyrus-theme` attribute. The attribute can be placed on `<html>` to apply everywhere, or on a single `<pre>` to theme one code block.

<!--prettier-ignore-->
```html
<link href="papyrus/papyrus.css" rel="stylesheet">
<link href="papyrus/themes/potion-light.css" rel="stylesheet">

<!-- everything light -->
<html data-papyrus-theme="potion-light">

<!-- a single light block on a dark page -->
<pre class="papyrus" data-papyrus-theme="potion-light">
  <code class="language-html"></code>
</pre>
```

The same can be done from JavaScript with the `theme` option, which is available on every method:

```ts
import papyrus from 'papyrus';

papyrus.mount(document.querySelector('pre'), {
  language: 'html',
  theme: 'potion-light'
});

papyrus.highlight(code, { language: 'css', theme: 'potion-light' });
```

### Overriding colours

Variables cascade in 3 tiers, so you can override as little or as much as you like from your own CSS:

<!--prettier-ignore-->
```css
:root {
  /* editor chrome */
  --papyrus-bg: #0b0d10;
  --papyrus-line-number: #444;

  /* semantic scopes, every language follows */
  --papyrus-keyword: #ff79c6;
  --papyrus-string: #f1fa8c;

  /* language tokens, only that language follows */
  --papyrus-liquid-tag: #bd93f9;
  --papyrus-css-property: #8be9fd;
}
```

Language tokens are named `--papyrus-<language>-<token>` and always fall back to the semantic scope they belong to, which means a theme only sets them when a language should look different from the rest. The complete list, with the scope each token falls back to, is documented on every property in `theme.d.ts`.

### Defining a theme

Themes can be defined at runtime. Omitted values are inherited from the theme being extended (`potion` by default), so a new theme is usually just a handful of overrides. In the browser `papyrus.theme()` injects the generated CSS into `<head>` and returns a handle.

```ts
import papyrus from 'papyrus';

const dusk = papyrus.theme({
  name: 'dusk',
  extends: 'potion',
  scheme: 'dark',
  editor: {
    bg: '#1a1030',
    lineActive: '#ffffff0a'
  },
  syntax: {
    keyword: '#ff79c6',
    string: '#f1fa8c'
  },
  languages: {
    liquid: { tag: '#bd93f9' }
  }
});

dusk.use();                          // <html data-papyrus-theme="dusk">
dusk.use(document.querySelector('pre')); // one block only
dusk.css;                            // the generated CSS
dusk.remove();                       // remove the injected <style>
```

A theme has the following shape (see `theme.d.ts` for the full documented type):

```ts
interface Theme {
  name: string;
  scheme: 'dark' | 'light';
  editor: {   // background, text, caret, selection, line numbers, guides, matches, scrollbar...
    bg: string;
    fg: string;
    caret: string;
    // ...
  };
  widget: {   // search, copy and folding widgets
    bg: string;
    fg: string;
    border: string;
    // ...
  };
  brackets: string[]; // 6 bracket pair colours
  syntax: {   // semantic scopes shared by every language
    comment: string;
    keyword: string;
    string: string;
    // ...
  };
  languages?: {  // optional per language overrides
    liquid?: { tag?: string; filter?: string; /* ... */ };
    javascript?: { interpolation?: string; /* ... */ };
    // ...
  };
}
```

### Generating CSS

The theme API is also available without the editor, for writing theme stylesheets at build time or in Node. The `auto` option additionally applies the theme when the users `prefers-color-scheme` matches and no explicit theme attribute is set, which is how to get automatic light and dark switching.

```ts
import { theme, potionLight } from 'papyrus/theme';
import { writeFileSync } from 'node:fs';

writeFileSync('dusk.css', theme.css({
  name: 'dusk',
  extends: 'potion',
  syntax: { keyword: '#ff79c6' }
}));

// apply potion-light automatically for users who prefer a light scheme
writeFileSync('potion-light.css', theme.css(potionLight, { auto: true }));

theme.extend('potion', { name: 'dusk', syntax: { keyword: '#ff79c6' } }); // => Theme
theme.vars(potionLight);   // => { '--papyrus-bg': '#fbfbfc', ... }
theme.scopes;              // the scope maps, for building theme editors
```

### Layout settings

Sizing is not part of a theme. These variables are defined on `:root` and can be overridden globally or per block:

<!--prettier-ignore-->
```css
:root {
  --papyrus-font-family: consolas, monaco, "Andale Mono", "Ubuntu Mono", monospace;
  --papyrus-font-size: 1em;
  --papyrus-line-height: 1.6;
  --papyrus-radius: 0.5em;
  --papyrus-padding-x: 0.75em;
  --papyrus-padding-y: 0.5em;
  --papyrus-number-spacing: 2em;
  --papyrus-fence-width: 0.01rem;
  --papyrus-scrollbar-width: 4px;
  --papyrus-scrollbar-padding: 8px;
  --papyrus-treeview-line-width: 0.05em;
}
```

### Semantic scopes

| Scope         | Variable                  | Covers                                                    |
| ------------- | ------------------------- | --------------------------------------------------------- |
| `comment`     | `--papyrus-comment`       | Comments, prologs, CDATA, doc comments                    |
| `important`   | `--papyrus-important`     | `!important`, YAML anchors and other emphasised tokens    |
| `url`         | `--papyrus-url`           | URLs                                                      |
| `punctuation` | `--papyrus-punctuation`   | Brackets, commas, semicolons                              |
| `delimiter`   | `--papyrus-delimiter`     | Markup angle brackets, template and interpolation delimiters |
| `operator`    | `--papyrus-operator`      | Operators, arrows, combinators                            |
| `keyword`     | `--papyrus-keyword`       | Keywords, Liquid tag names, regex flags                   |
| `control`     | `--papyrus-control`       | `return`, `await`, `if`, `for`                            |
| `module`      | `--papyrus-module`        | `import`, `export`, `from`, `as`                          |
| `atrule`      | `--papyrus-atrule`        | `@media`, `@import`, YAML directives                      |
| `string`      | `--papyrus-string`        | Strings and template strings                              |
| `regex`       | `--papyrus-regex`         | Regular expressions                                       |
| `number`      | `--papyrus-number`        | Numbers and dates                                         |
| `boolean`     | `--papyrus-boolean`       | `true`, `false`                                           |
| `nil`         | `--papyrus-nil`           | `null`, `undefined`, `nil`                                |
| `constant`    | `--papyrus-constant`      | `UPPER_CASE` constants, SQL aliases                       |
| `variable`    | `--papyrus-variable`      | Variables, objects, Liquid output                         |
| `parameter`   | `--papyrus-parameter`     | Function parameters, shell arguments                      |
| `property`    | `--papyrus-property`      | Object keys, CSS properties, YAML and TOML keys           |
| `function`    | `--papyrus-function`      | Functions, methods, Liquid filters                        |
| `className`   | `--papyrus-class-name`    | Class names                                               |
| `type`        | `--papyrus-type`          | Types, type constructors, SQL casts                       |
| `builtin`     | `--papyrus-builtin`       | `window`, `document`, `console`, language builtins        |
| `this`        | `--papyrus-this`          | `this`                                                    |
| `tag`         | `--papyrus-tag`           | Markup tag names                                          |
| `attrName`    | `--papyrus-attr-name`     | Attribute names                                           |
| `attrValue`   | `--papyrus-attr-value`    | Attribute values                                          |
| `selector`    | `--papyrus-selector`      | CSS selectors                                             |
| `pseudo`      | `--papyrus-pseudo`        | Pseudo elements and classes                               |
| `unit`        | `--papyrus-unit`          | CSS units                                                 |
| `color`       | `--papyrus-color`         | Hex codes and named colours                               |
| `entity`      | `--papyrus-entity`        | HTML entities                                             |
| `heading`     | `--papyrus-heading`       | Markdown titles, shell headings, doctype                  |
| `invalid`     | `--papyrus-invalid`       | Unmatched brackets                                        |

### Migrating from 0.8

The Sass variables and the old `--papyrus-*` names (`--papyrus-code-bg`, `--papyrus-js-keyword` and friends) are gone. Import `papyrus/papyrus.css` instead of `index.scss`, and map any overrides you had onto the editor, semantic or language variables above. Per-language names follow the full language id, so `--papyrus-js-keyword` becomes `--papyrus-javascript-keyword` (or just `--papyrus-keyword` if every language should follow).


# How it works?

Papyrus works just the same as PrismJS when highlighting code, however code insertion is applied using a morph opposed to hard assignment via `innerHTML` which helps performance. The Papyrus code editor is made possible by applying textarea enhancements, and unlike other modules that leverage `contenteditable` annotation (like the wonderful [CodeJar](https://github.com/antonmedv/codejar/blob/master/codejar.ts)), Papyrus leverages the `<textarea>` element.

The `<textarea>` exists as a layer over node structures generated with PrismJS and replicates the inner markup of `<code>` elements to give the impression of a real text editor. The benefits of using `<textarea>` over `contenteditable` is a matter of loc~limit and performance. Textarea is a snappy, there is less to augment and it can hold 1000's of lines with no issues.

# Special Thanks

Thanks to [Swyxio](https://github.com/swyxio) for passing on the NPM package name.
