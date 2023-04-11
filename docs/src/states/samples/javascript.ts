import { js } from 'language-literals';

export default js`

function example (param, object) {

  if (object.prop === 1000) {

    const condition = object.foo ? false : true;

    return [
      {
        object: {
          foo: 'string'
        }
      }
    ]
  }

  const regex = /(group)[a-zA-Z]+(?=)/gi
  const instance = new Something()

  instance.method()

  return regex.test(param)

}

`;
