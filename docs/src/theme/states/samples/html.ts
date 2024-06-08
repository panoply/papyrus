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

  <main>
    <div
      spx@click="key.prop { once }"
      spx-node="ref.name"
      spx-ref:number="100"
      spx-ref:boolean="true"
      spx-ref:boolean="false"
      spx-ref:string="hello world"
      spx-ref:object="{ prop: 'string', num: 1000, bool: true }"
      spx-ref:array="['string', 'string']">
      Hello World!
    </div>
  </main>

</body>
</html>
`;
