import { liquid } from 'language-literals';

export default liquid`


  {%
    liquid
    if condition == assertion
      echo 'hello world!'
    endif
  %}

  {%- if condition == assert -%}
    <div
      class="xxx"
      id="some-id">
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
                {{
                  i.something
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

  {% comment %}
    lorem ipsum
  {% endcomment %}

  <aside>
    Hello World!
  </aside>

  {% comment %}
    lorem ipsum
  {% endcomment %}
`;
