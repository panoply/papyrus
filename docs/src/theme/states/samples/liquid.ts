import { liquid } from 'language-literals';

export default liquid`
  {%
    liquid
    if condition == assertion
      echo 'hello world!'
    endif
  %}

  {%- if condition == assert -%}
    <div class="xxx" id="some-id">
       {% # comment %}
      <ul>
        <li class="some-class" data-attr="{{ i.xxx }}"
          {% if xxx %}
            id="{{ object.prop }}"
          {% endif %}>
          {% for i in list %}
            <div>
              {{ object.something
                | filter: 'some-filter'
                | example: one: 1, two: 2, three: 3,
              }}
            </div>
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

  {% comment %} lorem ipsum {% endcomment %}

`;
