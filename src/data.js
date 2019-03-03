const timesFilter = [
  {
    id: `everything`,
    checked: true,
    disabled: false
  },
  {
    id: `future`,
    checked: false,
    disabled: true
  },
  {
    id: `past`,
    checked: false,
    disabled: false
  }
];

const getRandomNum = (count) => {
  return Math.floor(Math.random() * count);
};

const gerRandomArray = (min, max, startArray, newArray) => {
  for (let i = min; i <= getRandomNum(max); i++) {
    let randomEl = startArray[getRandomNum(startArray.length)];
    if (!newArray.includes(randomEl)) {
      newArray.push(randomEl);
    }
  }
};

const offersCountMin = 0;
const offersCountMax = 2;

const descriptionCountMin = 1;
const descriptionCountMax = 2;

const pointsData = {
  city: [`Chamonix`, `Oslo`, `Berlin`, `Geneva`],
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
  get date() {
    const date = Date.now() + 1 + Math.random() * 7 * 24 * 60 * 60 * 1000;
    return date;
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
    const pointsArray = [...this.point];
    const event = pointsArray[getRandomNum(pointsArray.length)];
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
  },
  get offer() {
    const setOffers = [...this.offers];
    const offers = [];

    gerRandomArray(offersCountMin, offersCountMax, setOffers, offers);

    return offers.map((el) => `<li>
      <button class="trip-point__offer">${el}</button>
      </li>`).join(``);
  },

  get description() {
    const descriptionArray = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
    const currentDescription = [];

    gerRandomArray(descriptionCountMin, descriptionCountMax, descriptionArray, currentDescription);
    return currentDescription;
  },
};
export {pointsData, timesFilter};
