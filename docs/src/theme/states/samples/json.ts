import { json } from 'language-literals';

export default json`
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
`;
