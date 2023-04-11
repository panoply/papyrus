import { tsx } from 'language-literals';

export default tsx`


function foo (prop: { name: string }) {

  return <Component name={prop.name} />;

}

`;
