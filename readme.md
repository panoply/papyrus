# 𓁁 Papyrus

An embedded code editor with textarea enhancements leveraging [PrismJS](https://prismjs.com). Papyrus is a drop-in solution for code sample showcasing and offers syntax highlighting theme customizations.

Documentation + Custom Theming: [papyrus.js.og](https://papyrus.js.org)

### Reasoning

Papyrus was created to help alleviate some of cumbersome configuration incurred for showcasing code snippets in documentation and websites. PrismJS is dope and does dope shit, but I wanted something more flexible and integrated which provided basic editing capabilities.

### Benefits

Papyrus extends upon the default grammars provided by prism which allows for more control of syntax highlighting. It comes pre-packaged and supports only a small subset of languages common in font-end development and offers text editor capabilities out of the box along with highly customizable theming solution.

### Limitations

Papyrus is appropriating PrismJS grammars and neither modules are designed for high level edge cases but can perform consistently at around 5k~loc. If you require support for large files which exceed 5k~loc maybe choose [Monaco](https://github.com/microsoft/monaco-editor), [CodeMirror](https://codemirror.net/) or [Copenhagen](https://copenhagen.autocode.com/).

# Installation

Papyrus requires you to install [PrismJS](https://prismjs.com).

```bash
pnpm add papyrus
```

# Options

Papyrus defaults to using the following options.

| Option          | Default | Description                                                 |
| --------------- | ------- | ----------------------------------------------------------- |
| `autoSave`      | `false` | Saves text edits to local storage between refreshes         |
| `editor`        | `true`  | Enable/Disable the text editor feature                      |
| `indentSize`    | `2`     | The size of indentation                                     |
| `indentChar`    | `none`  | The indentation character, also accepts `tab` or `space`    |
| `input`         | `''`    | The input code, fallbacks to `<code>` inner HTML            |
| `language`      | `null`  | The language id, fallbacks to `<code>` class name reference |
| `lineHighlight` | `true`  | Whether or not to highlight lines                           |
| `lineIndent`    | `true`  | Whether or not to preserve indentation levels on newlines   |
| `lineNumbers`   | `true`  | Whether or not to show line numbers                         |
| `locLimit`      | `1500`  | The maximum lines of code to allow                          |
| `showSpace`     | `false` | Show invisible whitespace characters                        |
| `showTab`       | `false` | Show invisible tab characters                               |
| `showCRLF`      | `false` | Show invisible LF + CR character combinator sequences       |
| `showLF`        | `false` | Show invisible LF (newline) characters                      |
| `showCR`        | `false` | Show invisible CR (carriage return) characters              |
| `spellcheck`    | `false` | Allow spellchecking in the text editor                      |
| `tabIndent`     | `false` | Allow tab indentation on selections                         |
| `trimStart`     | `true`  | Strip leading extraneous newlines and whitespace            |
| `trimEnd`       | `true`  | Strip ending extraneous newlines and whitespace             |

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
