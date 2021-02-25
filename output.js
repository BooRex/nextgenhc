import fs from 'fs';
import { getTime } from './input.js';

export const stringify = (object, customName) => {
  const filename = `./outputs/${ object.name }-output${ customName ? `-${ customName }` : '' }.txt`;

  try {
    fs.unlinkSync(filename);
  } catch (_) {}
  let output = fs.createWriteStream(filename, {
    flags: 'a'
  });
  output.write(`${ object.schedules.length }\n`);
  object.schedules.forEach((schedule, schIdx) => {
    output.write(`${ schedule.intersectionId }\n`);
    output.write(`${ schedule.streetsCount }\n`);

    schedule.scheduleItems.forEach((item, itemIdx) => {
      const isEnd = schIdx === object.schedules.length + 1 && itemIdx === schedule.scheduleItems.length + 1;

      output.write(`${ item.streetName } ${item.duration}${isEnd ? '' : '\n'}`);
    })
  });

  console.log(`created ${ object.name }-output${ customName ? `-${ customName }` : '' }.txt`, getTime());
};
