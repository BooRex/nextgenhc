import { parse } from './input.js';
import { stringify } from './output.js';
import { calc } from './calc.js';

const parsedArray = parse(['a']);

const result = calc(parsedArray[0]);

stringify(result, 'test')
