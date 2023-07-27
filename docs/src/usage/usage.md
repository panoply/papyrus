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
papyrus.mount(element: string | HTMLPreElement, options?: {}): Papyrus;

// Render papyrus to a specific element
papyrus.render(input: string, output: string | HTMLElement, options?: {}): Papyrus;

// Returns generated papyrus markup
papyrus.static(input: string, options?: {}): string;

// Return a specific papyrus instance or all instances
papyrus.get(id?: string): Papyrus | Papyrus[];

// GLOBAL SCOPE

// Same as papyrus.get() but returns the instance Map
window.papyrus: Map<string, Papyrus>;
```

### Instance

Papyrus execution will return an instance. Instances will give you control over the element papyrus has been rendered and will allow you to hooks into editor logic to perform additional enhancements.

```js
import papyrus from 'papyrus';

const p = papyrus.mount(document.querySelector('#code'))

// INFORMATION

p.mode: 'static' | 'error' | 'editing';        // The current mode
p.language: Languages;                         // The current language id
p.lines: number;                               // The number of lines
p.raw: string                                  // The code input text content

// ELEMENTS

p.pre: HTMLPreElement;                        // The Papyrus HTML `<pre>` element
p.code: HTMLElement;                          // The Papyrus HTML `<code>` element
p.textarea: HTMLTextAreaElement;              // The Papyrus HTML `<textarea>` element

// UPDATE CONTROL

p.options(opts?: {}): Options;                // Update editor options
p.update('', language?, history?);            // Update code input, language (optional history clear)

// EDITOR CONTROL

p.editor(opts?: {});                          // Enable text editing
p.editor.disable();                           // Disable text editing

// ERROR RENDERING

p.error('', opts?: {});                       // Render an error overlay on the editor.
p.error.hide();                               // Hide any errors that were previously shown.

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

### Options

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
