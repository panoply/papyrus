---
layout: usage.liquid
permalink: '/examples/liquid/index.html'
title: '𓁁 Papyrus Liquid'
description: ''
---

# Liquid

```liquid

    <script>

      spx.connect({
        foo: bar;
      })
    </script>

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
