import fs from 'fs';

export const getTime = () => {
  const date = new Date();

  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${date.getMilliseconds()}`;;
}

const first = (raw, streetsCount) => {
  console.log('start first', getTime());
  return raw.map((i, idx) => {
    if (idx > 1 && idx <=streetsCount) {
      const rawStreet = i.split(' ');

      return {
        intersectionA: parseInt(rawStreet[0]),
        intersectionB: parseInt(rawStreet[1]),
        name: rawStreet[2],
        time: parseInt(rawStreet[3])
      };
    } else {
      return null;
    }
  }).filter(i => i != null);
}

const second = (raw, streetsCount, carsCount) => {
  let carsArr = [];

  console.log('start second', getTime());
  for (let m = streetsCount + 1; m <= streetsCount + carsCount; m++) {
    const rawCar = raw[m].split(' ');
    const streetCount = parseInt(rawCar[0]);
    let streetsArrNew = [];

    for (let j = 1; j <= streetCount; j++) {
      streetsArrNew = [...streetsArrNew, rawCar[j]]
    }

    carsArr = [...carsArr, {
      streetCount,
      streets: streetsArrNew,
    }];

  }
  console.log('finish second', getTime());
  return carsArr;
}

const convert = name => {
  const raw = fs.readFileSync(`./files/${ name }.txt`).toString().split('\n');
  console.log('file parsed', getTime());
  const infoArr = raw[0].split(' ');

  const duration = parseInt(infoArr[0]);
  const intersectionsCount = parseInt(infoArr[1]);
  const streetsCount = parseInt(infoArr[2]);
  const carsCount = parseInt(infoArr[3]);
  const bonusPoints = parseInt(infoArr[4]);

  let streetsArr = first(raw, streetsCount);
  let carsArr = second(raw, streetsCount, carsCount);

  return {
    name,
    duration, intersectionsCount, streetsCount, carsCount, bonusPoints,
    streets: streetsArr,
    cars: carsArr,
  };
}

// fileNames = ['a','b'...]
export const parse = (fileNames) => {
  return fileNames.map(convert);
};
