import { getTime, parse } from './input.js';
import { stringify } from './output.js';
import { calc } from './calc.js';

const parsedArray = parse(['c']);
console.log('array created', getTime());
const result = calc(parsedArray[0]);
console.log('calculated', getTime());
stringify(result, 'test')
