import { html } from 'language-literals';

export default html`

  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>

    <style>
      .class {
        background: #fff;
      }
    </style>

    <!-- comment -->

    <main>
      <div id="foo" class="example">
        Hello World!
      </div>
    </main>

    <script>
      window.prop = 'xxx'
    </script>

  </body>
  </html>
`;
