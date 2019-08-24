import { promisify } from 'util';

export default object => {
  return Object.keys(object).reduce((acc, functionName) => {
    acc[functionName] = promisify(object[functionName]);
    return acc;
  }, {});
}