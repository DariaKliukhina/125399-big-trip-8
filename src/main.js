import makeFilter from './templates/make-filter.js';
import Point from './points/point.js';
import PointEdit from "./points/point-edit.js";
import {timesFilter, allPoints} from './data/data.js';

const tripForm = document.querySelector(`.trip-filter`);
const tripDay = document.querySelector(`.trip-day__items`);
const filterInput = document.getElementsByName(`filter`);

const startFilter = allPoints.everything;

const addElement = (parent, currentElement) => {
  parent.insertAdjacentHTML(`beforeEnd`, currentElement);
};

const addPoint = (parent, currentElement) => {
  parent.appendChild(currentElement.render());
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

const createPointElement = (parent, data) => {
  const point = new Point(data);
  const editPoint = new PointEdit(data);
  point.onClick = () => {
    editPoint.render();
    tripDay.replaceChild(editPoint.element, point.element);
    point.unrender();
  };

  editPoint.onSubmit = () => {
    point.render();
    tripDay.replaceChild(point.element, editPoint.element);
    editPoint.reset();
  };

  addPoint(parent, point);
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
    renderPoints(target, allPoints);
  });
}

createAllPoints(startFilter);
