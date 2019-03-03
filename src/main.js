import makeFilter from './make-filter.js';
import makeCard from './make-card.js';
import {pointsData, timesFilter} from './data.js';

const tripForm = document.querySelector(`.trip-filter`);
const tripDay = document.querySelector(`.trip-day__items`);
const filterInput = document.getElementsByName(`filter`);

const startCount = 7;
const randomRange = 10;

const getRandomNum = (count) => {
  return Math.floor(Math.random() * count);
};

const getRandomElement = (array) => {
  return array[getRandomNum(array.length)];
};

const addElement = (parent, currentElement) => {
  parent.insertAdjacentHTML(`beforeEnd`, currentElement);
};

const createFilterElement = (parent, id, checked, disabled) => {
  const currentFilter = makeFilter(id, checked, disabled);
  addElement(parent, currentFilter);
};

const createAllFilters = (array) => {
  for (const el of array) {
    createFilterElement(tripForm, el.id, el.checked, el.disabled);
  }
};

createAllFilters(timesFilter);

const clearBlock = (block) => {
  block.innerHTML = ``;
};

const createPointData = (count, data) => {
  const newPoints = [];

  for (let i = 0; i < count; i++) {
    let tempData = data.getEvent();
    newPoints.push({
      city: getRandomElement(data.city),
      event: tempData.event,
      title: tempData.title,
      icon: tempData.icon,
      date: data.date,
      price: data.price,
      picture: data.picture,
      offer: data.offer,
      description: data.description
    });
  }
  return newPoints;
};

const createPointElement = (parent, dataEl) => {
  const currentPoint = makeCard(dataEl);
  addElement(parent, currentPoint);
};

const createAllPoints = (array) => {
  for (const el of array) {
    createPointElement(tripDay, el);
  }
};

const createNewPoint = (count) => {
  const currentDataArray = createPointData(count, pointsData);
  createAllPoints(currentDataArray);
};

const onClickHandler = () => {
  const randomNum = getRandomNum(randomRange);
  createNewPoint(randomNum);
};

for (let el of filterInput) {
  el.addEventListener(`change`, function () {
    clearBlock(tripDay);
    onClickHandler();
  });
}

createNewPoint(startCount);
