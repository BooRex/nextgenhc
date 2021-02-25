import { parse } from "./input.js";
import { stringify } from "./output.js";
import { calc } from "./calc.js";

const files = process.argv.slice(2);

console.log('Processing files: ', files);

const parsedArray = parse(files);

parsedArray.forEach((data) => {
    const result = calc(data);
    stringify(result, 'drobot')
});
