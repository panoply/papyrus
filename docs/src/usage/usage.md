---
layout: usage.liquid
permalink: '/usage/index.html'
title: '𓁁 Papyrus Usage'
description: ''
---

# Usage

Papyrus exposes 3 methods from it's default export. The `papyrus.render()` method is for usage within Node and will render a Papyrus code block, whereas the `papyrus.mount()` method is for usage within the web browser.

### Methods

```js
import papyrus from 'papyrus';

// DEFAULT

// Invokes on all <pre class="papyrus"> elements
papyrus(options?: {}): Papyrus[];

// METHODS

// Mounts a specific <pre> element
papyrus.mount('.selector', /* options */);

// Render papyrus to a specific element
papyrus.render('const x = 1', '.selector', /* options */);

// Returns generated papyrus markup
papyrus.static('<ul><li> xxx </li></ul>', /* options */);

// Return a specific papyrus instance
papyrus.get('some-id')

// Return an array list of all papyrus instances
papyrus.list()


// GLOBAL SCOPE

// Same as papyrus.get() but returns the instance Map
window.papyrus;
```

### Instance

Papyrus execution will return an instance. Instances will give you control over the element papyrus has been rendered and will allow you to hooks into editor logic to perform additional enhancements.

```ts
import papyrus from 'papyrus';

const p = papyrus.mount(document.querySelector('#code'))

// INFORMATION

p.mode: 'static' | 'error' | 'editor';        // The current mode
p.language: Languages;                        // The current language id
p.lines: number;                             // The number of lines
p.raw: string                                // The code input text content

// ELEMENTS

p.pre: HTMLPreElement;                       // The Papyrus HTML `<pre>` element
p.code: HTMLElement;                         // The Papyrus HTML `<code>` element
p.textarea: HTMLTextAreaElement;             // The Papyrus HTML `<textarea>` element

// UPDATE CONTROL

p.options(/* options */);                   // Update editor options
p.update('', 'language', true);             // Update code input, language (optional history clear)

// EDITOR CONTROL

p.editor(/* options */);                    // Enable text editing
p.editor.disable();                         // Disable text editing
p.editor.enable();                          // Enable text editing, uses default or preset options

// ERROR RENDERING

p.showError('', /* options */);            // Render an error overlay on the editor.
p.hideError();                             // Hide any errors that were previously shown.

// CALLBACK

p.onupdate(function(code: string, language: Language) {

  // PARAMS

  console.log(code)       // The code input
  console.log(language)   // The language id

  // SCOPES

  this.element            // The <textarea> element;
  this.lineNumber         // The current line number

  // RETURN VALUES

  return '';             // Updates the code
  return false;          // Prevents further processing


}, scope?: {});

```

# Options

Papyrus exposes a large set of configuration options. Depending on the available methods, different options will be available. Below is the complete schema for initializing a Papyrus instance.

```js
import papyrus from 'papyrus';

papyrus({
  id: null,
  language: null,
  lineNumbers: true,
  lineFence: true,
  trimEnd: true,
  startMode: 'static',
  trimStart: true,
  showSpace: false,
  showTab: false,
  showCRLF: false,
  showLF: false,
  showCR: false,
  addClass: {
    pre: [],
    code: []
  },
  addAttrs: {
    pre: [],
    code: []
  },
  editor: {
    autoClosingPairs: [
      ['(', ')'],
      ['{', '}']
      ['[', ']']
    ]
    autoIndentPairs: [
      ['{', '}']
      ['[', ']']
    ]
    indentChar: ' ',
    indentSize: 2,
    lineNumber: 1,
    lineHighlight: true,
    lineIndent: true,
    locLimit: 1500,
    renderSpace: false,
    renderTabs: false,
    spellcheck: false,
    tabConvert: true,
    tabIndent: true,
  }
})
```
