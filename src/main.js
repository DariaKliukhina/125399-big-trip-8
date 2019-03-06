import makeFilter from './make-filter.js';
import makeCard from './make-card.js';
import {timesFilter, allObjects} from './data.js';

const tripForm = document.querySelector(`.trip-filter`);
const tripDay = document.querySelector(`.trip-day__items`);
const filterInput = document.getElementsByName(`filter`);

const startFilter = allObjects.everything;

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

const createPointElement = (parent, dataEl) => {
  const currentPoint = makeCard(dataEl);
  addElement(parent, currentPoint);
};

const createAllPoints = (array) => {
  for (const el of array) {
    createPointElement(tripDay, el);
  }
};

const getCurrentFilter = (target) => {
  const currentId = target.getAttribute(`id`);
  return currentId.split(`-`)[1];
};

const renderPoints = (target, data) => {
  const filter = getCurrentFilter(target);
  createAllPoints(data[`${filter}`]);
};

for (const el of filterInput) {
  el.addEventListener(`change`, function (evt) {
    const target = evt.target;
    clearBlock(tripDay);
    renderPoints(target, allObjects);
  });
}

createAllPoints(startFilter);
