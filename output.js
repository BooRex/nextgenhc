import fs from 'fs';

export const stringify = (object, customName) => {
  const filename = `./outputs/${ object.name }-output${ customName ? `-${ customName }` : '' }.txt`;

  fs.unlinkSync(filename);
  let output = fs.createWriteStream(filename, {
    flags: 'a'
  });
  output.write(`${ object.schedules.length }\n`);
  object.schedules.forEach((schedule, schIdx) => {
    output.write(`${ schedule.intersectionId }\n`);
    output.write(`${ schedule.streetsCount }\n`);

    schedule.scheduleItems.forEach((item, itemIdx) => {
      const isEnd = schIdx === object.schedules.length + 1 && itemIdx === schedule.scheduleItems.length + 1;

      output.write(`${ item.streetName } ${item.duration}${isEnd ? '\n' : ''}`);
    })
  });
};
