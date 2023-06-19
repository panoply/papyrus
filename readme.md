# 𓁁 Papyrus

Embedded syntax highlighting and code editing with textarea enhancements leveraging [PrismJS](https://prismjs.com). Papyrus is a drop-in solution for code sample showcasing which offers theme customizations and ships pre-stacked.

Documentation + Custom Theming: [papyrus.js.og](https://papyrus.js.org)

### Reasoning

Papyrus was created to help alleviate some of cumbersome configuration incurred for showcasing code snippets in documentation and websites (specifically the [Æsthetic Documentation](https://æsthetic.dev)). I love PrismJS, it's dope and does dope shit, but going beyond the defaults and bare minimum can be a tad extraneous when you're seeking high level customizations. I wanted something more flexible and integrated, something which provided basic level text editing capabilities. The result is Papyrus.

### Benefits

Papyrus extends upon the default grammars provided by prism which allows for more control of syntax highlighting. It applied a more advanced capture approach so token colors are more granular in Papyrus theming. The module comes pre-packaged and supports only a small subset of languages common in font-end development, you simply drop it with no additional configuration required. The text editor capabilities are perfect for quick showcases while adhering to common expectations when writing code.

Papyrus is tiny, it's only 12kb~gzip and supports the following languages

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

Papyrus is appropriating PrismJS and extending its grammars. PrismJS is not built for incremental code edits or frequent changes so performance bottleneck's are incurred at around 3k~loc. There is some rumblings that PrismJS will improve its parse algorithm for use cases such as that being appropriated by Papyrus, so future in versions we may see better performance overall in when working in large documents.

If you require support for large files which exceed 3k~loc maybe choose [ACE](https://github.com/ajaxorg/ace), [Monaco](https://github.com/microsoft/monaco-editor), [CodeMirror](https://codemirror.net/) or [Copenhagen](https://copenhagen.autocode.com/). Papyrus is not designed to be a ful-featured editor, it's intended use case is for basic code editing and code sample showcasing.

> **Note**
> Papyrus does not provide completions or intelliSense capabilities.

# Installation

Papyrus ships with PrismJS pre-installed, so you only need this module.

```bash
pnpm add papyrus
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

The module acts a wrapper around PrismJS and aims to make the applied syntax highlighting as simple as possible. There are 3 different distribution bundles available depending on how you wish to invoke and use Papyrus will reflect on the build you'll use. You can leverage attributes to customizing the applied highlighting operations using `data-papyrus-*` annotations or alternatively use the default function on the export namespace.

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

The default export exposes the following methods. Most cases you'll leverage the `papyrus.mount()` method which will give you refined control over the code block instance

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

The `papyrus.render()` method is for cases where you want to return a HTMLPreElement and insert it somewhere into the DOM. It works identical to `papyrus.create()` but instead returns a element instead of a string.

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

The current theming is made available via CSS and SCSS.

### SCSS Variables

You can import the SCSS file using `@import "papyrus";`

<!--prettier-ignore-->
```scss
/* -------------------------------------------- */
/* BASE STYLES                                  */
/* -------------------------------------------- */

// FONT FAMILY
$papyrus-font-family:                    consolas, monaco, "Andale Mono", "Ubuntu Mono", monospace !default;
$papyrus-font-size-root:                 15px !default;
$papyrus-font-size:                      1em !default;
$papyrus-line-height:                    1.7 !default;

// EDITOR SIZING
$papyrus-height:                         auto !default;
$papyrus-width:                          100% !default;

// SELECTION
$papyrus-selection-bg:           255, 255, 255 !default;
$papyrus-selection-alpha:                  0.3 !default;

// CODE REGION
$papyrus-code-padding-y:                 0.3em !default;
$papyrus-code-padding-x:                 0.5em !default;
$papyrus-code-border-radius:             0.5em !default;

$papyrus-code-color:                   #fafafa !default;
$papyrus-code-bg:                      #181b20 !default;
$papyrus-code-inline-bg:               #eeebeb !default;
$papyrus-code-caret-color:             #ffffff !default;

// SCROLLBAR
$papyrus-scrollbar-width:                  2px !default;
$papyrus-scrollbar-track:              #181b20 !default;
$papyrus-scrollbar-bg:                 #384355 !default;
$papyrus-scrollbar-thumb:              #384355 !default;

// INVISIBLE CHARACTERS
$papyrus-invisible-space-color:         #42454D !default;
$papyrus-invisible-tab-color:           #808080 !default;
$papyrus-invisible-lf-color:            #808080 !default;
$papyrus-invisible-cr-color:            #808080 !default;
$papyrus-invisible-crlf-color:          #808080 !default;

// LINE NUMBERS
$papyrus-line-number-width:               3.3em !default;
$papyrus-line-number-color:             #363d49 !default;

// LINE NUMBER FENCE
$papyrus-line-fence-width:               0.01em !default;
$papyrus-line-scroll-left:                    0 !default;
$papyrus-line-fence-color:              #363d49 !default;

// LINE HIGHLIGHT
$papyrus-line-highlight-alpha:             0.05 !default;
$papyrus-line-highlight-bg:        171, 190, 206 !default;
$papyrus-line-highlight-number:         #fafafa !default;


/* -------------------------------------------- */
/* XML LANGUAGE                                 */
/* -------------------------------------------- */

$papyrus-xml-prolog:                   #BECAFF !default;
$papyrus-xml-name:                     #FF93BC !default;
$papyrus-xml-prefix:                   #BECAFF !default;
$papyrus-xml-delimiter:                #BECAFF !default;
$papyrus-xml-tag-name:                 #FF93BC !default;
$papyrus-xml-equals:                   #FF93BC !default;
$papyrus-xml-attr-name:                #91EBC2 !default;
$papyrus-xml-attr-value:               #FFF9A6 !default;
$papyrus-xml-comment:                  #888888 !default;

/* -------------------------------------------- */
/* HTML LANGUAGE                                */
/* -------------------------------------------- */

$papyrus-html-text-content:            #FAFAFA !default;
$papyrus-html-doctype:                 #FAFAFA !default;
$papyrus-html-delimiter:               #BECAFF !default;
$papyrus-html-tag-name:                #FF93BC !default;
$papyrus-html-equals:                  #FF93BC !default;
$papyrus-html-attr-name:               #91EBC2 !default;
$papyrus-html-attr-value:              #FFF9A6 !default;
$papyrus-html-comment:                 #888888 !default;

/* -------------------------------------------- */
/* CSS LANGUAGE                                 */
/* -------------------------------------------- */

$papyrus-css-selector:                #a5d447 !default;
$papyrus-css-tag-selector:            #FF93BC !default;
$papyrus-css-colon:                   #91EBC2 !default;
$papyrus-css-function:                #a5d447 !default;
$papyrus-css-variable:                #b594d9 !default;
$papyrus-css-operator:                #E91E63 !default;
$papyrus-css-punctuation:             #fafafa !default;
$papyrus-css-important:               #E91E63 !default;
$papyrus-css-atrule:                  #E91E63 !default;
$papyrus-css-property:                #81D4FA !default;
$papyrus-css-property-value:          #FFF9A6 !default;
$papyrus-css-number:                  #F48FB1 !default;
$papyrus-css-hexcode:                 #F48FB1 !default;
$papyrus-css-combinator:              #E91E63 !default;
$papyrus-css-unit:                    #E91E63 !default;
$papyrus-css-attr-name:               #91EBC2 !default;
$papyrus-css-attr-value:              #FFF9A6 !default;
$papyrus-css-attr-punctuation:        #FF93BC !default;
$papyrus-css-pseudo-element:          #e18d27 !default;

/* -------------------------------------------- */
/* CSS LANGUAGE                                 */
/* -------------------------------------------- */

$papyrus-scss-selector:               #a5d447 !default;
$papyrus-scss-tag-selector:           #FF93BC !default;
$papyrus-scss-colon:                  #91EBC2 !default;
$papyrus-scss-function:               #a5d447 !default;
$papyrus-scss-variable:               #b594d9 !default;
$papyrus-scss-operator:               #E91E63 !default;
$papyrus-scss-punctuation:            #fafafa !default;
$papyrus-scss-important:              #E91E63 !default;
$papyrus-scss-atrule:                 #E91E63 !default;
$papyrus-scss-property:               #81D4FA !default;
$papyrus-scss-property-value:         #FFF9A6 !default;
$papyrus-scss-number:                 #F48FB1 !default;
$papyrus-scss-hexcode:                #F48FB1 !default;
$papyrus-scss-combinator:             #E91E63 !default;
$papyrus-scss-unit:                   #E91E63 !default;
$papyrus-scss-attr-name:              #91EBC2 !default;
$papyrus-scss-attr-value:             #FFF9A6 !default;
$papyrus-scss-attr-punctuation:       #FF93BC !default;
$papyrus-scss-pseudo-element:         #e18d27 !default;

/* -------------------------------------------- */
/* LIQUID LANGUAGE                              */
/* -------------------------------------------- */

$papyrus-liquid-fallback:             #fafafa !default;
$papyrus-liquid-delimiters:           #fafafa !default;
$papyrus-liquid-tag:                  #E91E63 !default;
$papyrus-liquid-output:               #81d4fa !default;
$papyrus-liquid-boolean:              #ff80f4 !default;
$papyrus-liquid-number:               #935eff !default;
$papyrus-liquid-punctuation:          #E91E63 !default;
$papyrus-liquid-operator:             #E91E63 !default;
$papyrus-liquid-parameter:            #ff953c !default;
$papyrus-liquid-object-name:          #81d4fa !default;
$papyrus-liquid-object-prop:          #fafafa !default;
$papyrus-liquid-filter-name:          #3defb9 !default;
$papyrus-liquid-string:               #FFF9A6 !default;
$papyrus-liquid-comment:              #888888 !default;
$papyrus-liquid-string-delimiters:    #888888 !default;
$papyrus-liquid-string-object-name:   #81d4fa !default;

/* -------------------------------------------- */
/* JSON LANGUAGE                                */
/* -------------------------------------------- */

$papyrus-json-punctuation:            #fafafa !default;
$papyrus-json-property:               #81D4FA !default;
$papyrus-json-string:                 #FFF9A6 !default;
$papyrus-json-boolean:                #FF80F4 !default;
$papyrus-json-number:                 #9753fd !default;
$papyrus-json-operator:               #E91E63 !default;

/* -------------------------------------------- */
/* JAVASCRIPT LANGUAGE                          */
/* -------------------------------------------- */

$papyrus-js-fallback:                 #fafafa !default;
$papyrus-js-keyword:                  #E91E63 !default;
$papyrus-js-function:                 #9EE34F !default;
$papyrus-js-class-name:               #9EE34F !default;
$papyrus-js-function-name:            #81D4FA !default;
$papyrus-js-punctuation:              #FAFAFA !default;
$papyrus-js-special-chars:            #E91E63 !default;
$papyrus-js-parameter:                #FFAB40 !default;
$papyrus-js-variable:                 #81D4FA !default;
$papyrus-js-operator:                 #E91E63 !default;
$papyrus-js-operation:                #E91E63 !default;
$papyrus-js-module:                   #E91E63 !default;
$papyrus-js-semi:                     #fafafa !default;
$papyrus-js-flow:                     #E91E63 !default;
$papyrus-js-number:                   #F48FB1 !default;
$papyrus-js-boolean:                  #F48FB1 !default;
$papyrus-js-string:                   #F5EC70 !default;
$papyrus-js-regex:                    #F5EC70 !default;
$papyrus-js-regex-flags:              #E91E63 !default;
$papyrus-js-literal-property:         #22c0cb !default;
$papyrus-js-comment:                  #888888 !default;


/* -------------------------------------------- */
/* TYPESCRIPT                                   */
/* -------------------------------------------- */

$papyrus-ts-fallback:                #fafafa !default;
$papyrus-ts-types:                   #177fd4 !default;
$papyrus-ts-boolean:                 #ff80f4 !default;
$papyrus-ts-number:                  #935eff !default;
$papyrus-ts-operator:                #E91E63 !default;
$papyrus-ts-parameter:               #ff953c !default;
$papyrus-ts-method:                  #7ef0ff !default;
$papyrus-ts-function-name:           #9EE34F !default;
$papyrus-ts-filter-name:             #3defb9 !default;
$papyrus-ts-string:                  #FFF9A6 !default;
$papyrus-ts-comment:                 #888888 !default;

```

### CSS Variables

<!--prettier-ignore-->
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

# How it works?

Papyrus works just the same as PrismJS when highlighting code, however code insertion is applied using a morph opposed to hard assignment via `innerHTML` which helps performance. The Papyrus code editor is made possible by applying textarea enhancements, and unlike other modules that leverage `contenteditable` annotation (like the wonderful [CodeJar](https://github.com/antonmedv/codejar/blob/master/codejar.ts)), Papyrus leverages the `<textarea>` element.

The `<textarea>` exists as a layer over node structures generated with PrismJS and replicates the inner markup of `<code>` elements to give the impression of a real text editor. The benefits of using `<textarea>` over `contenteditable` is a matter of loc~limit and performance. Textarea is a snappy, there is less to augment and it can hold 1000's of lines with no issues.

# Special Thanks

Thanks to [Swyxio](https://github.com/swyxio) for passing on the NPM package name.
