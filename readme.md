# 𓁁 Papyrus

Papyrus is a bare bones text editor leveraging [prismjs](https://prismjs.com) for highlighting. The module assumes pre-defined theme styling for the applied highlighting and defaults to using the [Potion](#) color palette. You can leverage an existing prism [themes](#) or take advantage of the extended token captures papyrus provides using the generator application:

Generate a custom theme: [papyrus.js.og](#)

### Why?

Papyrus is merely a wrapper around [prismjs](https://prismjs.com) and was developed for drop-in usage within Liquify projects. The main purpose for its existence is to align coloring with that applied in [vscode potion theme](#). It helps alleviate some of cumbersome configuration incurred for showcasing code snippets in documentation and websites.

### Benefits?

Papyrus extends upon the default grammars provided by prism which allows for more control of syntax highlighting. It comes pre-packaged with support with a refined set of languages common in font-end development. In addition, papyrus ships with a couple of the most common used plugins pre-installed.

### Limitations

Papyrus performs consistently at around 5k~loc but anything exceeding that will result in bottlenecks. If you require editor support for large files use Monaco or CodeMirror. Because Papyrus is appropriating PrismJS grammars and neither modules are designed for high level edge cases.

### Languages

The papyrus build of PrismJS includes support for the following languages:

- html
- shell
- css
- scss
- liquid
- xml
- json
- javascript
- typescript
- jsx
- tsx
- yaml

### Plugins

The papyrus build of PrismJS includes support for the following plugins:

- line-numbers
- show-invisibles
- treeview
- command-line

# Installation

The module ships with all languages and plugins included. It is using [prismjs](https://prismjs.com) version **1.29.0** in the distributed bundle.

```bash
pnpm add papyrus
```

# Usage

The module acts a wrapper around Prism and aims to make the applied syntax highlighting as simple as possible. There are 3 different distribution bundles available depending on how you wish to invoke and use Papyrus. You can leverage attributes to customizing the applied highlighting operations using `data-papyrus-*` annotations or alternatively use the default function on the export namespace.

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
  readonly: true,
  indentChar: 'none',
  indentSize: 2,
  input: '',
  language: null,
  lineHighlight: true,
  lineIndent: true,
  lineNumbers: true,
  lineLimit: 1000,
  tabIndent: false,
  spellCheck: false,
  trim: true,
  invisibles: {
    tab: false,
    crlf: false,
    space: false,
    cr: false,
    lf: false
  }
});

code[0].enable() // activate editor mode

```

The `editor` import returns an instance which allow you to work with the code regions.

```ts
import papyrus from 'papyrus';

const p = papyrus.editor(document.querySelector('pre'), {
  autoSave: true,
  readonly: false,
  indentChar: 'none',
  indentSize: 2,
  input: '',
  language: null,
  lineHighlight: true,
  lineIndent: true,
  lineNumbers: true,
  lineLimit: 1000,
  tabIndent: false,
  spellCheck: false,
  trim: true,
  invisibles: {
    tab: false,
    crlf: false,
    space: false,
    cr: false,
    lf: false
  }
})

// The Language Name as per the `class="language-xxx"`
p.language: Languages;

// The number of lines
p.lines: number;

// The HTML `<pre>` element
p.pre(): HTMLPreElement;

// The HTML `<code>` element
p.code: HTMLElement;

// The HTML `<textarea>` element
p.textarea: HTMLTextAreaElement;

// The raw string of the `textarea`
p.raw: string;

// Update the input, optionally provide a language id to change the language mode.
p.update(input: string, language?: Languages): void

// Disable editor
p.disable(): void

// Enable editor
p.enable(): void

```

### CJS

# Methods

The default export exposes the following methods:

```ts
import papyrus from 'papyrus';

// LIQUID SPECIFIC HIGHLIGHTING
//
```
