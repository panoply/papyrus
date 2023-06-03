---
layout: usage.liquid
permalink: '/usage/index.html'
title: '𓁁 Papyrus'
description: ''
---

# Getting Started

Papyrus is an ESM module and can be downloaded via the NPM registry.

```
pnpm add papyrus
```

# Render

The `render` method is for usage within Node and will render a Papyrus code block.

```html
<div>
  <h1>Hello World</h1>
</div>
```

You will typically leverage this with a solution like [markdown-it](#).

```js

const markdown = require('markdown-it');

const md = markdown({
  html: true,
  highlight: (string, language) => Papyrus.render(string, {
    language,
    insertCodeElement: true,
    trimStart: true,
    trimEnd: true,
    insertPreElement: true,
    lineNumbers: true,
    lineIndent: true,
    showTab: true,
    spellcheck: false,
    tabIndent: true,
    indentSize: 2,
    editor: true,
    insertTextArea: true,
    lineHighlight: true,
    showSpace: true,
    indentChar: 'space'
  });

});

```
