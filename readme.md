# 𓁁 Papyrus

An embedded code editor with text enhancements leveraging [PrismJS](https://prismjs.com). Papyrus is a drop-in solution for code sample showcasing and offers syntax highlighting, theme customizations and ships pre-stacked.

Documentation + Custom Theming: [papyrus.js.og](https://papyrus.js.org)

### Reasoning

Papyrus was created to help alleviate some of cumbersome configuration incurred for showcasing code snippets in documentation and websites. PrismJS is dope and does dope shit, but I wanted something more flexible and integrated which provided basic editing capabilities and while the modular approach with Prism suffices for a lot cases, I wanted an all inclusive custom build.

### Benefits

Papyrus extends upon the default grammars provided by prism which allows for more control of syntax highlighting. It comes pre-packaged and supports only a small subset of languages common in font-end development along with text editor capabilities provided out of the box with a highly customizable theming solution.

Papyrus is 14kb Gzipped and includes:

- Support for 12 different languages
- Extended syntax highlighting support
- Renders Line numbers, line highlights, invisibles and more!
- Text Editor features like auto-closing pairs and tab indentation.
- Plays nicely with markdown-it and SSG like 11ty.

### Limitations

Papyrus is appropriating PrismJS grammars and neither modules are designed for high level edge cases but can perform consistently at around 5k~loc. If you require support for large files which exceed 5k~loc maybe choose [Monaco](https://github.com/microsoft/monaco-editor), [CodeMirror](https://codemirror.net/) or [Copenhagen](https://copenhagen.autocode.com/).

# Installation

Papyrus requires you to install [PrismJS](https://prismjs.com).

```bash
pnpm add papyrus
```

# Options

Papyrus defaults to using the following options.

| Option               | Default         | Description                                                 |
| -------------------- | --------------- | ----------------------------------------------------------- |
| `autoSave`           | `false`         | Saves text edits to local storage between refreshes         |
| `autoClosing`         | `true`          | Auto closing pairs                                          |
| `editor`             | `true`          | Enable/Disable the text editor feature                      |
| `history`            | `true`          | Record history                                              |
| `indentSize`         | `2`             | The size of indentation                                     |
| `indentChar`         | ` `             | The indentation character                                   |
| `indentMultiline`    | `true`          | Whether or not multiline tab indent is supported            |
| `input`              | `''`            | The input code, fallbacks to `<code>` inner HTML            |
| `language`           | `null`          | The language id, fallbacks to `<code>` class name reference |
| `lineHighlight`      | `true`          | Whether or not to highlight lines                           |
| `lineIndent`         | `true`          | Whether or not to preserve indentation levels on newlines   |
| `lineNumbers`        | `true`          | Whether or not to show line numbers                         |
| `locLimit`           | `1500`          | The maximum lines of code to allow                          |
| `newlineIndentChars` | `['(','{','[']` | A list of characters to indent onto newlines                |
| `newlineInsertChars` | `[')','}',']']` | A list of characters to indent onto newlines                |
| `locLimit`           | `1500`          | The maximum lines of code to allow                          |
| `showSpace`          | `false`         | Show invisible whitespace characters                        |
| `showTab`            | `false`         | Show invisible tab characters                               |
| `showCRLF`           | `false`         | Show invisible LF + CR character combinator sequences       |
| `showLF`             | `false`         | Show invisible LF (newline) characters                      |
| `showCR`             | `false`         | Show invisible CR (carriage return) characters              |
| `spellcheck`         | `false`         | Allow spellchecking in the text editor                      |
| `tabIndent`          | `false`         | Allow tab indentation on selections                         |
| `trimStart`          | `true`          | Strip leading extraneous newlines and whitespace            |
| `trimEnd`            | `true`          | Strip ending extraneous newlines and whitespace             |

# Usage

The module acts a wrapper around PrismJS and aims to make the applied syntax highlighting as simple as possible. There are 3 different distribution bundles available depending on how you wish to invoke and use Papyrus. You can leverage attributes to customizing the applied highlighting operations using `data-papyrus-*` annotations or alternatively use the default function on the export namespace.

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

You would initialize Papyrus and have all the above code regions apply highlighting using the options provided. Code regions which contain attributes instruct Papyrus to adhere to the options passed.

<!-- prettier-ignore -->
```ts
import papyrus from 'papyrus';

// Applies the following options to all instances
//
const code = papyrus({
  autoSave: true,
  editor: false,
  indentChar: 'none',
  indentSize: 2,
  input: '',
  language: null,
  lineHighlight: true,
  lineIndent: true,
  lineNumbers: true,
  locLimit: 1500,
  tabIndent: false,
  spellcheck: false,
  showCRLF: false,
  showSpace: false,
  showCR: false,
  showLF: false,
  showTab: false,
  trimEnd: true,
  trimStart: true
});

code[0].enable() // activate editor mode

```

The `mount` import returns an instance which allow you to work with the code regions. This is the manual equivalent of calling the default `papyrus() method.`

```ts
import papyrus from 'papyrus';

const p = papyrus.mount(document.querySelector('pre'), {
  autoSave: true,
  editor: false,
  indentChar: 'none',
  indentSize: 2,
  input: '',
  language: null,
  lineHighlight: true,
  lineIndent: true,
  lineNumbers: true,
  locLimit: 1500,
  tabIndent: false,
  spellcheck: false,
  showCRLF: false,
  showSpace: false,
  showCR: false,
  showLF: false,
  showTab: false,
  trimEnd: true,
  trimStart: true
})

// GETTERS / SETTER
//
p.language: Languages;   // The Language Name as per the `class="language-xxx"`

// READ ONLY
//
readonly p.lines: number;                     // The number of lines
readonly p.pre: HTMLPreElement;               // The HTML `<pre>` element
readonly p.code: HTMLElement;                 // The HTML `<code>` element
readonly p.textarea: HTMLTextAreaElement;     // The HTML `<textarea>` element
readonly p.raw: string;                       // The raw string of the `textarea`

// METHODS

// Update the input, optionally provide a language id to change the language mode.
p.update(input: string, language?: Languages): void

// Disable editor mode, makes code input readonly
p.disable(): void

// Enable editor, makes code editable
p.enable(): void

```

# Methods

The default export exposes the following methods:

```ts
import papyrus from 'papyrus';

// BROWSER ONLY - Highlight/activate editor mode
papyrus(options?: {})

// Potion Theming
papyrus.potion(prism)

// Editor Mode - BROWSER ONLY
papyrus.mount(element: HTMLPreElement, options?: {})

// Highlight string
papyrus.highlight(code: string, options?: {})
```

# Theming

The current theming is made available via CSS and SCSS.

### SCSS Variables

You can import the SCSS file using `@import "papyrus";`

```scss
/* stylelint-disable scss/dollar-variable-colon-space-after */

/* -------------------------------------------- */
/* BASE STYLES                                  */
/* -------------------------------------------- */

// FONT FAMILY
$papyrus-font-family: consolas, monaco, 'Andale Mono', 'Ubuntu Mono', monospace !default;
$papyrus-font-size-root: 15px !default;
$papyrus-font-size: 1em !default;
$papyrus-line-height: 1.7 !default;

// EDITOR SIZING
$papyrus-height: auto !default;
$papyrus-width: 100% !default;

// SELECTION
$papyrus-selection-bg: 255, 255, 255 !default;
$papyrus-selection-alpha: 0.3 !default;

// CODE REGION
$papyrus-code-padding-y: 0.3em !default;
$papyrus-code-padding-x: 0.5em !default;
$papyrus-code-border-radius: 0.5em !default;

$papyrus-code-color: #fafafa !default;
$papyrus-code-bg: #181b20 !default;
$papyrus-code-inline-bg: #eeebeb !default;
$papyrus-code-caret-color: #ffffff !default;

// SCROLLBAR
$papyrus-scrollbar-width: 2px !default;
$papyrus-scrollbar-track: #181b20 !default;
$papyrus-scrollbar-bg: #384355 !default;
$papyrus-scrollbar-thumb: #384355 !default;

// INVISIBLE CHARACTERS
$papyrus-invisible-space-color: #42454d !default;
$papyrus-invisible-tab-color: #808080 !default;
$papyrus-invisible-lf-color: #808080 !default;
$papyrus-invisible-cr-color: #808080 !default;
$papyrus-invisible-crlf-color: #808080 !default;

// LINE NUMBERS
$papyrus-line-number-width: 3.3em !default;
$papyrus-line-number-color: #363d49 !default;

// LINE NUMBER FENCE
$papyrus-line-fence-width: 0.01em !default;
$papyrus-line-scroll-left: 0 !default;
$papyrus-line-fence-color: #363d49 !default;

// LINE HIGHLIGHT
$papyrus-line-highlight-alpha: 0.05 !default;
$papyrus-line-highlight-bg: 171, 190, 206 !default;
$papyrus-line-highlight-number: #fafafa !default;

/* -------------------------------------------- */
/* XML LANGUAGE                                 */
/* -------------------------------------------- */

$papyrus-xml-prolog: #becaff !default;
$papyrus-xml-name: #ff93bc !default;
$papyrus-xml-prefix: #becaff !default;
$papyrus-xml-delimiter: #becaff !default;
$papyrus-xml-tag-name: #ff93bc !default;
$papyrus-xml-equals: #ff93bc !default;
$papyrus-xml-attr-name: #91ebc2 !default;
$papyrus-xml-attr-value: #fff9a6 !default;
$papyrus-xml-comment: #888888 !default;

/* -------------------------------------------- */
/* HTML LANGUAGE                                */
/* -------------------------------------------- */

$papyrus-html-text-content: #fafafa !default;
$papyrus-html-doctype: #fafafa !default;
$papyrus-html-delimiter: #becaff !default;
$papyrus-html-tag-name: #ff93bc !default;
$papyrus-html-equals: #ff93bc !default;
$papyrus-html-attr-name: #91ebc2 !default;
$papyrus-html-attr-value: #fff9a6 !default;
$papyrus-html-comment: #888888 !default;

/* -------------------------------------------- */
/* CSS LANGUAGE                                 */
/* -------------------------------------------- */

$papyrus-css-selector: #a5d447 !default;
$papyrus-css-tag-selector: #ff93bc !default;
$papyrus-css-colon: #91ebc2 !default;
$papyrus-css-function: #a5d447 !default;
$papyrus-css-variable: #b594d9 !default;
$papyrus-css-operator: #e91e63 !default;
$papyrus-css-punctuation: #fafafa !default;
$papyrus-css-important: #e91e63 !default;
$papyrus-css-atrule: #e91e63 !default;
$papyrus-css-property: #81d4fa !default;
$papyrus-css-property-value: #fff9a6 !default;
$papyrus-css-number: #f48fb1 !default;
$papyrus-css-hexcode: #f48fb1 !default;
$papyrus-css-combinator: #e91e63 !default;
$papyrus-css-unit: #e91e63 !default;
$papyrus-css-attr-name: #91ebc2 !default;
$papyrus-css-attr-value: #fff9a6 !default;
$papyrus-css-attr-punctuation: #ff93bc !default;
$papyrus-css-pseudo-element: #e18d27 !default;

/* -------------------------------------------- */
/* CSS LANGUAGE                                 */
/* -------------------------------------------- */

$papyrus-scss-selector: #a5d447 !default;
$papyrus-scss-tag-selector: #ff93bc !default;
$papyrus-scss-colon: #91ebc2 !default;
$papyrus-scss-function: #a5d447 !default;
$papyrus-scss-variable: #b594d9 !default;
$papyrus-scss-operator: #e91e63 !default;
$papyrus-scss-punctuation: #fafafa !default;
$papyrus-scss-important: #e91e63 !default;
$papyrus-scss-atrule: #e91e63 !default;
$papyrus-scss-property: #81d4fa !default;
$papyrus-scss-property-value: #fff9a6 !default;
$papyrus-scss-number: #f48fb1 !default;
$papyrus-scss-hexcode: #f48fb1 !default;
$papyrus-scss-combinator: #e91e63 !default;
$papyrus-scss-unit: #e91e63 !default;
$papyrus-scss-attr-name: #91ebc2 !default;
$papyrus-scss-attr-value: #fff9a6 !default;
$papyrus-scss-attr-punctuation: #ff93bc !default;
$papyrus-scss-pseudo-element: #e18d27 !default;

/* -------------------------------------------- */
/* LIQUID LANGUAGE                              */
/* -------------------------------------------- */

$papyrus-liquid-fallback: #fafafa !default;
$papyrus-liquid-delimiters: #fafafa !default;
$papyrus-liquid-tag: #e91e63 !default;
$papyrus-liquid-output: #81d4fa !default;
$papyrus-liquid-boolean: #ff80f4 !default;
$papyrus-liquid-number: #935eff !default;
$papyrus-liquid-punctuation: #e91e63 !default;
$papyrus-liquid-operator: #e91e63 !default;
$papyrus-liquid-parameter: #ff953c !default;
$papyrus-liquid-object-name: #81d4fa !default;
$papyrus-liquid-object-prop: #fafafa !default;
$papyrus-liquid-filter-name: #3defb9 !default;
$papyrus-liquid-string: #fff9a6 !default;
$papyrus-liquid-comment: #888888 !default;
$papyrus-liquid-string-delimiters: #888888 !default;
$papyrus-liquid-string-object-name: #81d4fa !default;

/* -------------------------------------------- */
/* JSON LANGUAGE                                */
/* -------------------------------------------- */

$papyrus-json-punctuation: #fafafa !default;
$papyrus-json-property: #81d4fa !default;
$papyrus-json-string: #fff9a6 !default;
$papyrus-json-boolean: #ff80f4 !default;
$papyrus-json-number: #9753fd !default;
$papyrus-json-operator: #e91e63 !default;

/* -------------------------------------------- */
/* JAVASCRIPT LANGUAGE                          */
/* -------------------------------------------- */

$papyrus-js-fallback: #fafafa !default;
$papyrus-js-keyword: #e91e63 !default;
$papyrus-js-function: #9ee34f !default;
$papyrus-js-class-name: #9ee34f !default;
$papyrus-js-function-name: #81d4fa !default;
$papyrus-js-punctuation: #fafafa !default;
$papyrus-js-special-chars: #e91e63 !default;
$papyrus-js-parameter: #ffab40 !default;
$papyrus-js-variable: #81d4fa !default;
$papyrus-js-operator: #e91e63 !default;
$papyrus-js-operation: #e91e63 !default;
$papyrus-js-module: #e91e63 !default;
$papyrus-js-semi: #fafafa !default;
$papyrus-js-flow: #e91e63 !default;
$papyrus-js-number: #f48fb1 !default;
$papyrus-js-boolean: #f48fb1 !default;
$papyrus-js-string: #f5ec70 !default;
$papyrus-js-regex: #f5ec70 !default;
$papyrus-js-regex-flags: #e91e63 !default;
$papyrus-js-literal-property: #22c0cb !default;
$papyrus-js-comment: #888888 !default;

/* -------------------------------------------- */
/* TYPESCRIPT                                   */
/* -------------------------------------------- */

$papyrus-ts-fallback: #fafafa !default;
$papyrus-ts-types: #177fd4 !default;
$papyrus-ts-boolean: #ff80f4 !default;
$papyrus-ts-number: #935eff !default;
$papyrus-ts-operator: #e91e63 !default;
$papyrus-ts-parameter: #ff953c !default;
$papyrus-ts-method: #7ef0ff !default;
$papyrus-ts-function-name: #9ee34f !default;
$papyrus-ts-filter-name: #3defb9 !default;
$papyrus-ts-string: #fff9a6 !default;
$papyrus-ts-comment: #888888 !default;
```

### CSS Variables

```css
:root {
  /* PRE ELEMENT -------------------------------- */

  --papyrus-font-size-root: 15px;
  --papyrus-font-size: 1em;
  --papyrus-font-family: consolas, monaco, andale mono, ubuntu mono, monospace;
  --papyrus-line-height: 1.7;
  --papyrus-height: auto;
  --papyrus-width: 100%;

  /* CODE ELEMENT ------------------------------- */

  --papyrus-code-color: #fafafa;
  --papyrus-code-padding-y: 0.3em;
  --papyrus-code-padding-x: 0.5em;
  --papyrus-code-bg: #181b20;
  --papyrus-code-inline-bg: #eeebeb;
  --papyrus-code-border-radius: 0.5em;
  --papyrus-code-caret-color: #ffffff;

  /* SELECTED TEXT ------------------------------ */

  --papyrus-selection-bg: 255, 255, 255;
  --papyrus-selection-alpha: 0.3;

  /* SCROLLBARS --------------------------------- */

  --papyrus-scrollbar-width: 2px;
  --papyrus-scrollbar-track: #181b20;
  --papyrus-scrollbar-bg: #384355;
  --papyrus-scrollbar-thumb: #384355;

  /* INVISIBLE CHARACTERS ----------------------- */

  --papyrus-invisible-space-color: #42454d;
  --papyrus-invisible-tab-color: #808080;
  --papyrus-invisible-lf-color: #808080;
  --papyrus-invisible-cr-color: #808080;
  --papyrus-invisible-crlf-color: #808080;

  /* LINE NUMBERS ------------------------------- */

  --papyrus-line-number-width: 3.3em;
  --papyrus-line-number-color: #363d49;
  --papyrus-line-fence-color: #363d49;
  --papyrus-line-fence-width: 0.01em;
  --papyrus-line-scroll-left: 0;

  /* LINE HIGHLIGHT ----------------------------- */

  --papyrus-line-highlight-alpha: 0.05;
  --papyrus-line-highlight-bg: 171, 190, 206;
  --papyrus-line-highlight-number: #fafafa;

  /* -------------------------------------------- */
  /* XML                                          */
  /* -------------------------------------------- */

  --papyrus-xml-prolog: #becaff;
  --papyrus-xml-name: #ff93bc;
  --papyrus-xml-prefix: #becaff;
  --papyrus-xml-comment: #888888;
  --papyrus-xml-delimiter: #becaff;
  --papyrus-xml-tag-name: #ff93bc;
  --papyrus-xml-equals: #ff93bc;
  --papyrus-xml-attr-name: #91ebc2;
  --papyrus-xml-attr-value: #fff9a6;

  /* -------------------------------------------- */
  /* HTML                                         */
  /* -------------------------------------------- */

  --papyrus-html-text-content: #fafafa;
  --papyrus-html-doctype: #fafafa;
  --papyrus-html-delimiter: #becaff;
  --papyrus-html-tag-name: #ff93bc;
  --papyrus-html-equals: #ff93bc;
  --papyrus-html-attr-name: #91ebc2;
  --papyrus-html-attr-value: #fff9a6;
  --papyrus-html-comment: #888888;

  /* -------------------------------------------- */
  /* LIQUID                                       */
  /* -------------------------------------------- */

  --papyrus-liquid-fallback: #fafafa;
  --papyrus-liquid-delimiters: #fafafa;
  --papyrus-liquid-tag: #e91e63;
  --papyrus-liquid-output: #81d4fa;
  --papyrus-liquid-boolean: #ff80f4;
  --papyrus-liquid-number: #935eff;
  --papyrus-liquid-punctuation: #e91e63;
  --papyrus-liquid-operator: #e91e63;
  --papyrus-liquid-parameter: #ff953c;
  --papyrus-liquid-object-name: #81d4fa;
  --papyrus-liquid-object-prop: #fafafa;
  --papyrus-liquid-filter-name: #3defb9;
  --papyrus-liquid-string: #fff9a6;
  --papyrus-liquid-comment: #888888;
  --papyrus-liquid-string-delimiters: #888888;
  --papyrus-liquid-string-object-name: #81d4fa;

  /* -------------------------------------------- */
  /* CSS                                          */
  /* -------------------------------------------- */

  --papyrus-css-selector: #a5d447;
  --papyrus-css-tag-selector: #ff93bc;
  --papyrus-css-colon: #91ebc2;
  --papyrus-css-function: #a5d447;
  --papyrus-css-variable: #b594d9;
  --papyrus-css-operator: #e91e63;
  --papyrus-css-punctuation: #fafafa;
  --papyrus-css-important: #e91e63;
  --papyrus-css-atrule: #e91e63;
  --papyrus-css-property: #81d4fa;
  --papyrus-css-property-value: #fff9a6;
  --papyrus-css-number: #f48fb1;
  --papyrus-css-hexcode: #f48fb1;
  --papyrus-css-combinator: #e91e63;
  --papyrus-css-unit: #e91e63;
  --papyrus-css-attr-name: #91ebc2;
  --papyrus-css-attr-value: #fff9a6;
  --papyrus-css-attr-punctuation: #ff93bc;
  --papyrus-css-pseudo-element: #e18d27;

  /* -------------------------------------------- */
  /* JSON                                         */
  /* -------------------------------------------- */

  --papyrus-json-punctuation: #fafafa;
  --papyrus-json-property: #81d4fa;
  --papyrus-json-string: #fff9a6;
  --papyrus-json-boolean: #ff80f4;
  --papyrus-json-number: #9753fd;
  --papyrus-json-operator: #e91e63;

  /* -------------------------------------------- */
  /* JAVASCRIPT                                   */
  /* -------------------------------------------- */

  --papyrus-js-fallback: #fafafa;
  --papyrus-js-keyword: #e91e63;
  --papyrus-js-function: #9ee34f;
  --papyrus-js-class-name: #9ee34f;
  --papyrus-js-function-name: #81d4fa;
  --papyrus-js-punctuation: #fafafa;
  --papyrus-js-special-chars: #e91e63;
  --papyrus-js-parameter: #ffab40;
  --papyrus-js-variable: #81d4fa;
  --papyrus-js-operator: #e91e63;
  --papyrus-js-operation: #e91e63;
  --papyrus-js-module: #e91e63;
  --papyrus-js-semi: #fafafa;
  --papyrus-js-flow: #e91e63;
  --papyrus-js-number: #f48fb1;
  --papyrus-js-boolean: #f48fb1;
  --papyrus-js-string: #f5ec70;
  --papyrus-js-regex: #f5ec70;
  --papyrus-js-regex-flags: #e91e63;
  --papyrus-js-literal-property: #22c0cb;
  --papyrus-js-comment: #888888;

  /* -------------------------------------------- */
  /* TYPESCRIPT                                   */
  /* -------------------------------------------- */

  --papyrus-ts-fallback: #fafafa;
  --papyrus-ts-types: #177fd4;
  --papyrus-ts-boolean: #ff80f4;
  --papyrus-ts-number: #935eff;
  --papyrus-ts-operator: #e91e63;
  --papyrus-ts-parameter: #ff953c;
  --papyrus-ts-method: #7ef0ff;
  --papyrus-ts-function-name: #9ee34f;
  --papyrus-ts-filter-name: #3defb9;
  --papyrus-ts-string: #fff9a6;
  --papyrus-ts-comment: #888888;
}
```

# Special Thanks

Thanks to [Swyxio](https://github.com/swyxio) for passing on the NPM package name.
