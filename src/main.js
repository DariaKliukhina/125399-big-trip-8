import Point from './points/point';
import PointEdit from './points/point-edit';
import Filter from "./filter/filter";
import {timesFilter, allPoints} from './data/data';
import updateData from "./statistic";

const tripForm = document.querySelector(`.trip-filter`);
const tripDay = document.querySelector(`.trip-day__items`);

const addElement = (parent, currentElement) => {
  parent.appendChild(currentElement.render());
};

const clearBlock = (block) => {
  block.innerHTML = ``;
};
const createFilterElement = (parent, data) => {
  const filterElement = new Filter(data);
  addElement(parent, filterElement);
};

const renderFilters = (data) => {
  for (const el of data) {
    createFilterElement(tripForm, el);
  }
};

renderFilters(timesFilter);

const createPointElement = (parent, data) => {
  const point = new Point(data);
  const editPoint = new PointEdit(data);
  point.onClick = () => {
    editPoint.render();
    tripDay.replaceChild(editPoint.element, point.element);
    document.querySelector(`.flatpickr-input.form-control`).value = data.time;
    point.unrender();
  };

  editPoint.onSubmit = (newObject) => {
    data.title = newObject.title;
    data.city = newObject.city;
    data.price = newObject.price;
    data.icon = newObject.icon;
    data.time = newObject.time;
    data.offers = newObject.offers;
    data.isFavorite = newObject.isFavorite;

    point.update(data);
    point.render();
    tripDay.replaceChild(point.element, editPoint.element);
    editPoint.unrender();
  };

  editPoint.onEsc = (initialObject) => {
    point.price = initialObject.price;
    editPoint.update(data);
    point.render();
    tripDay.replaceChild(point.element, editPoint.element);
    editPoint.unrender();
  };

  editPoint.onDelete = () => {
    deleteTask(editPoint);
    tripDay.removeChild(editPoint.element);
    editPoint.unrender();
  };
  addElement(parent, point);
};

const deleteTask = (task) => {
  for (let i = 0; i < allPoints.length; i++) {
    if ((allPoints[i] !== null) && (allPoints[i].token === task._token)) {
      allPoints[i] = null;
    }
  }
};

const renderPoints = (data) => {
  for (const el of data) {
    createPointElement(tripDay, el);
  }
};

const filterTasks = (tasks, filterName) => {
  let tasksResult;
  switch (filterName) {
    case `everything`:
      tasksResult = tasks;
      break;

    case `future`:
      tasksResult = tasks.filter((it) => it.date > Date.now());
      break;
    case `past`:
      tasksResult = tasks.filter((it) => it.date < Date.now());
      break;
  }
  return tasksResult;
};

const filterForm = document.querySelector(`.trip-filter`);

filterForm.addEventListener(`change`, function (evt) {
  const filterName = evt.target.value;
  const filteredTasks = filterTasks(allPoints, filterName);
  clearBlock(tripDay);
  renderPoints(filteredTasks);
});

renderPoints(allPoints);


