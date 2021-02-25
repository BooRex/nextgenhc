import fs from 'fs';

const convert = name => {
  const raw = fs.readFileSync(`./files/${ name }.txt`).toString().split('\n');
  const infoArr = raw[0].split(' ');

  const duration = parseInt(infoArr[0]);
  const intersectionsCount = parseInt(infoArr[1]);
  const streetsCount = parseInt(infoArr[2]);
  const carsCount = parseInt(infoArr[3]);
  const bonusPoints = parseInt(infoArr[4]);

  let streetsArr = [];
  let carsArr = [];

  for (let i = 1; i <= streetsCount; i++) {
    const rawStreet = raw[i].split(' ');

    streetsArr = [...streetsArr, {
      intersectionA: parseInt(rawStreet[0]),
      intersectionB: parseInt(rawStreet[1]),
      name: rawStreet[2],
      time: parseInt(rawStreet[3])
    }];
  }
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

  return {
    name,
    duration, intersectionsCount, streetsCount, carsCount, bonusPoints,
    streets: JSON.stringify(streetsArr),
    cars: JSON.stringify(carsArr),
  };
}

// fileNames = ['a','b'...]
export const parse = (fileNames) => {
  return fileNames.map(convert);
};
