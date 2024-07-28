---
layout: usage.liquid
permalink: '/overview/index.html'
title: '𓁁 Papyrus Overview'
description: ''
---

# What is Papyrus?

Papyrus is a syntax highlighter and embedded code editor with basic text editing capabilities. The module leverages [Prism](https://prismjs.com) together with the [Prism Code Editor](https://github.com/FIameCaster/prism-code-editor/) and focuses on providing a sub-selection of languages which apply optimized grammars for extensive syntax support. The refined language definitions allow Papyrus to target and highlight more complete code structures.

### Browser Usage

Browser usage requires invocation and unlike PrismJS, it will not initialize as an IIFE. The module is distributed in ESM and exposes a couple of methods on the default export.

<!-- prettier-ignore -->
```js
import papyrus from 'papyrus';

papyrus({ /* options */ });

```

### Node Usage

For usage in Node the `{js} papyrus.static()` method is available and Papyrus will return string markup. Using the module in Node is common with solutions like [markdown-it](https://github.com/markdown-it/markdown-it) or when using a SSG like [11ty](https://www.11ty.dev/).

Basic example with markdown-it:

```js
const papyrus = require('papyrus');
const markdown = require('markdown-it');

const md = markdown({
  html: true,
  highlight: (code, language) => papyrus.static(code, { language })
});
```
