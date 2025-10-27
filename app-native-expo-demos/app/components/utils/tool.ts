import type { ITokenProps } from '../index';
// import designToken from '../../design/default';

export function getNowToken(defaultVal = {}, diyVal = {}): ITokenProps {
  return {
    ...defaultVal,
    ...diyVal,
  } as ITokenProps;
}

// export const getDesignType = () => {
//   const aaa = {};
//   for (let key in designToken) {
//     if (typeof designToken[key] === 'string') {
//       aaa[key] = 'string';
//     } else if (typeof designToken[key] === 'number') {
//       aaa[key] = 'number';
//     } else {
//       aaa[key] = 'object';
//     }
//   }
//   console.log(aaa);
// };
