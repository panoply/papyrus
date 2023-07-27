---
layout: usage.liquid
permalink: '/examples/index.html'
title: '𓁁 Papyrus Languages'
description: ''
---

# Examples

Below is the cherry-picked list of languages using the default Potion theme. You can enable/disable editing mode on each to see the how text editor behaves.

# Bash / CLI

```bash
# Various characters or structures applying highlights
$ cmd
$ cmd && cmd
$ cmd --flag, -f
$ cmd <paths>
```

# JSON

```json
{
  "boolean": true,
  "string": "string" /* block comment */,
  "number": 100,
  "object": {
    "array": [
      {
        "null": null // line comment
      }
    ]
  }
}
```

### YAML

```yaml
#Comment: Student record
#Describes some characteristics and preferences
---
name: 'value' #key-value
number: 26
boolean: true
others:
  - 'string' #first list item
  - null #second list item
  - true #third list item
prop: Unquoted
---
```

# HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!--
Some Comment
-->

    <main>
      <div>Hello World!</div>
    </main>

    <footer class="foo bar">
      <ul>
        <li>Foo Bar</li>
      </ul>
    </footer>
  </body>
</html>
```

# Liquid

```liquid
{%- if condition == assert -%}
  <div class="xxx" id="some-id">

    {% # comment %}

    <ul>
      <li
        class="some-class"
        data-attr="xxx"
        {% if xxx %}
          id="{{ object.prop }}"
        {% endif %}>

          {% for i in list %}
            <ul>
              <li data-attr="{{ i.xxx }}">
                {{ i.something
                  | filter: 'some-filter'
                  | append: 'some-append'
                  | prepend: 'some-prepend'
                  | example:
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4
                }}
              </li>
          </ul>
        {% endfor %}

      </li>
    </ul>
  </div>
{% endif %}

{% schema %}
  {
    "foo": "bar"
  }
{% endschema %}
```

# XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<table summary="Product Sales Summary" border="1">
  <!--list products-->
  <tr align="center">
    <xsl:for-each select="//product">
      <th>
        <b><xsl:value-of select="."/></b>
      </th>
    </xsl:for-each>
  </tr>
</table>
```
