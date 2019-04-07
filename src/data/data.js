const timesFilter = [
  {
    name: `everything`,
    checked: true,
    disabled: false,
  },
  {
    name: `future`,
    checked: false,
    disabled: false,
  },
  {
    name: `past`,
    checked: false,
    disabled: false,
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

const descriptionCountMax = 4;

const pointsData = {
  cities: new Set([
    `Chamonix`,
    `Oslo`,
    `Berlin`,
    `Geneva`
  ]),
  point: new Set([
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
    `check-in`,
    `sightseeing`,
    `restaurant`
  ]),
  iconPoint: {
    'taxi': `🚕`,
    'bus': `🚌`,
    'train': `🚂`,
    'ship': `🛳️`,
    'transport': `🚊`,
    'drive': `🚗`,
    'flight': `✈`,
    'check-in': `🏨`,
    'sightseeing': `🏛`,
    'restaurant': `🍴`
  },
  offers: {
    'taxi': [{label: `Add luggage`, checked: false, cost: `23`}, {label: `35345`, checked: false, cost: `23`}],
    'bus': [{label: `test`, checked: false, cost: `23`}, {label: `test`, checked: false, cost: `23`}],
    'train': [{label: `Add 123`, checked: false, cost: `23`}, {label: `asdfasdf`, checked: false, cost: `23`}],
    'ship': [{label: `Adasdfasd luggage`, checked: false, cost: `23`}, {label: `234235`, checked: false, cost: `23`}],
    'transport': [{label: `Add xcvbcxn`, checked: false, cost: `23`}, {label: `adsfgdfh`, checked: false, cost: `23`}],
    'drive': [{label: `Add xcvnxcn`, checked: false, cost: `23`}, {label: `nbvmcbnm`, checked: false, cost: `23`}],
    'flight': [{label: `Add something`, checked: false, cost: `23`}, {label: `vip`, checked: false, cost: `23`}],
    'check-in': [{label: `Add luggage`, checked: false, cost: `23`}, {label: `35345`, checked: false, cost: `23`}],
    'sightseeing': [{label: `Add luggage`, checked: false, cost: `23`}, {label: `35345`, checked: false, cost: `23`}],
    'restaurant': [{label: `Add desert`, checked: false, cost: `23`}, {label: `35345`, checked: false, cost: `23`}]
  },
  get city() {
    const allCities = [...this.cities];
    return getRandomElement(allCities);
  },
  date: [`01.01.2019`, `06.09.2019`, `08.03.2019`, `23.02.2019`, `10.11.2019`],
  get day() {
    return getRandomElement(this.date);
  },
  time: `12:00`,
  get price() {
    return Math.floor(Math.random() * 100);
  },
  get picture() {
    return `//picsum.photos/300/150?r=${Math.random()}`;
  },
  get offerPrice() {
    return Math.floor(Math.random() * 30);
  },
  getEvent() {
    const points = [...this.point];
    const event = points[getRandomNum(points.length)];
    const icons = this.iconPoint;
    if (icons.hasOwnProperty(event)) {
      switch (event) {
        case `check-in`:
        case `sightseeing`:
        case `restaurant`:
          return {title: `${event} into a`, icon: icons[event], offer: this.offers[event], eventType: event};
        default:
          return {title: `${event} to`, icon: icons[event], offer: this.offers[event], eventType: event};
      }
    }
    return false;
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
  function generateToken(length) {
    const a = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`.split(``);
    const b = [];
    for (let i = 0; i < length; i++) {
      let j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join(``);
  }

  for (let i = 0; i < count; i++) {
    let tempData = data.getEvent();
    newPoints.push({
      token: generateToken(32),
      eventType: tempData.eventType,
      city: data.city,
      title: tempData.title,
      icon: tempData.icon,
      icons: data.iconPoint,
      date: data.day,
      time: data.time,
      price: data.price,
      picture: data.picture,
      offers: tempData.offer,
      offerPrice: data.offerPrice,
      offersList: data.offers,
      description: data.description
    });
  }
  return newPoints;
};

const eventsCount = getRandomNum(26);

const generateData = () => {
  return createPointData(eventsCount, pointsData);
};

const allPoints = generateData();

export {timesFilter, allPoints};
