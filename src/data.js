const timesFilter = [
  {
    id: `everything`,
    checked: true,
    disabled: false,
    count: 7
  },
  {
    id: `future`,
    checked: false,
    disabled: true,
    count: 0
  },
  {
    id: `past`,
    checked: false,
    disabled: false,
    count: 10
  }
];

const getRandomNum = (count) => {
  return Math.floor(Math.random() * count);
};
const getRandomElement = (array) => {
  return array[getRandomNum(array.length)];
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const offersCountMax = 3;
const descriptionCountMax = 4;

const pointsData = {
  cities: new Set([
    `Chamonix`,
    `Oslo`,
    `Berlin`,
    `Geneva`
  ]),
  point: new Set([
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ]),
  iconPoint: {
    'Taxi': `🚕`,
    'Bus': `🚌`,
    'Train': `🚂`,
    'Ship': `🛳️`,
    'Transport': `🚊`,
    'Drive': `🚗`,
    'Flight': `✈`,
    'Check-in': `🏨`,
    'Sightseeing': `🏛`,
    'Restaurant': `🍴`
  },
  get city() {
    const allCities = [...this.cities];
    return getRandomElement(allCities);
  },
  date: [`01.01.2019`, `06.09.2019`, `08.03.2019`, `23.02.2019`, `10.11.2019`],
  get day() {
    return getRandomElement(this.date);
  },
  time: [`10:00 — 11:00`, `12:30 — 15:00`, `16:00 — 18:00`],
  get period() {
    return getRandomElement(this.time);
  },
  get price() {
    return Math.floor(Math.random() * 100);
  },
  get picture() {
    return `//picsum.photos/300/150?r=${Math.random()}`;
  },
  offers: new Set([
    `Add luggage`,
    `Switch to comfort class`,
    `Add meal`,
    `Choose seats`
  ]),
  getEvent() {
    const points = [...this.point];
    const event = points[getRandomNum(points.length)];
    const icons = this.iconPoint;
    if (icons.hasOwnProperty(event)) {
      switch (event) {
        case `Check-in`:
        case `Sightseeing`:
        case `Restaurant`:
          return {title: `${event} into a`, icon: icons[event]};
        default:
          return {title: `${event} to`, icon: icons[event]};
      }
    }
    return false;
  },
  get offer() {
    const setOffers = [...this.offers];
    shuffleArray(setOffers);
    const randomNum = getRandomNum(offersCountMax);

    return setOffers.slice(0, randomNum);
  },
  get description() {
    const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
    shuffleArray(descriptions);
    const randomNum = getRandomNum(descriptionCountMax);
    return descriptions.slice(0, randomNum).join(` `);
  },
};
const createPointData = (count, data) => {
  const newPoints = [];

  for (let i = 0; i < count; i++) {
    let tempData = data.getEvent();
    newPoints.push({
      city: data.city,
      title: tempData.title,
      icon: tempData.icon,
      date: data.day,
      time: data.period,
      price: data.price,
      picture: data.picture,
      offer: data.offer,
      description: data.description
    });
  }
  return newPoints;
};

const generateData = () => {
  const allObjects = {};
  for (const el of timesFilter) {
    const currentId = el.id;
    const currentData = createPointData(el.count, pointsData);
    allObjects[`${currentId}`] = currentData;
  }
  return allObjects;
};

const allPoints = generateData();

export {timesFilter, allPoints};
