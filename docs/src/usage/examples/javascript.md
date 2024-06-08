---
layout: usage.liquid
permalink: '/examples/javascript/index.html'
title: '𓁁 Papyrus JavaScript'
description: ''
---

# JavaScript

<!--prettier-ignore-->
```js
import { foo } from 'module';

function example (param, object) {

  if (object.prop === 1000) {
    const condition = object.foo ? false : true;
    return { foo: 'string' }
  }

  const regex = /(group)[a-zA-Z]+(?=)/gi
  const instance = new Something()
  const object = {
    import: 'string',
    export: false,
    quotes: {
      'some/path': {
        items: [ 1, 2, 3 ]
      }
    }
  }

  instance.method()
  return regex.test(param)
}
```
