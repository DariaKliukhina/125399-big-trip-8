import PointEdit from './points/point-edit';
import Filter from "./filter/filter";
import Sorting from "./sorting/sorting";
import {api} from "./api";
import moment from "moment";
import TripDay from "./components/trip-day";
import ModelPoint from "./points-adapter";
import {updateCharts} from "./statistic";
import {setTotalCost, sortPointsByDay} from './utils/helpers';

const HIDDEN_CLASS = `visually-hidden`;
const ACTIVE_STAT = `view-switch__item--active`;

const tripPoints = document.querySelector(`.trip-points`);
const mainFilter = document.querySelector(`.trip-filter`);
const mainSorting = document.querySelector(`.trip-sorting`);
const offersBlock = document.querySelector(`.trip-sorting__item--offers`);
const newTask = document.querySelector(`.new-event`);
const totaCostContainer = document.querySelector(`.trip__total`);
const statBtns = document.querySelectorAll(`.view-switch__item`);
const pointsContainer = document.querySelector(`.main`);
const statisticContainer = document.querySelector(`.statistic`);
const allContainers = [pointsContainer, statisticContainer];
const closeAllContainer = () => allContainers.forEach((it) => it.classList.add(HIDDEN_CLASS));


const filtersRawData = [
  {name: `everything`, id: `filter-everything`, checked: true},
  {name: `future`, id: `filter-future`, checked: false},
  {name: `past`, id: `filter-past`, checked: false},
];

const sortingRawData = [
  {name: `event`, id: `sorting-event`, checked: true},
  {name: `time`, id: `sorting-time`, checked: false},
  {name: `price`, id: `sorting-price`, checked: false},
];

function renderSorting(sortingData) {
  sortingData.forEach((rawSorting) => {
    let sorting = new Sorting(rawSorting);
    mainSorting.insertBefore(sorting.render(), offersBlock);

    sorting.onSorting = () => {
      const sortedPoints = sortingPoints(pointsByDay, sorting._id);
      tripPoints.innerHTML = ``;
      renderPoints(sortedPoints);
    };
  });
}

renderSorting(sortingRawData);

let pointsByDay = new Map();
let currentFilter;
const sortingPoints = (data, sortingName) => {
  currentFilter = sortingName;
  let sortingParam;
  switch (sortingName) {
    case `sorting-event`:
      sortingParam = `type`;
      break;
    case `sorting-time`:
      sortingParam = `duration`;
      break;

    case `sorting-price`:
      sortingParam = `price`;
      break;
  }
  return sortingByFilter(data, sortingParam);
};

const sortingByFilter = (data, parameter) => {
  data.forEach((day) => {
    if (day.length > 1) {
      day.sort(function (a, b) {
        if (a[parameter] > b[parameter]) {
          return 1;
        }
        if (a[parameter] < b[parameter]) {
          return -1;
        }
        return 0;
      });
    }
  });

  return data;
};

const filterPoints = (data, filterName) => {
  switch (filterName) {
    case `filter-everything`:
      return data;
    case `filter-future`:
      return data.filter((it) => moment(it.date) > moment());
    case `filter-past`:
      return data.filter((it) => moment(it.date) < moment());
  }
  return data;
};

function renderFilters(filtersData) {
  filtersData.forEach((rawFilter) => {
    let filter = new Filter(rawFilter);
    mainFilter.appendChild(filter.render());

    filter.onFilter = () => {
      const filterName = filter._id;
      api.getPoints()
        .then((allPoints) => {
          const filteredPoints = filterPoints(allPoints, filterName);
          tripPoints.innerHTML = ``;
          sortPointsByDay(filteredPoints, pointsByDay);
          renderPoints(pointsByDay);
          setTotalCost(pointsByDay, totaCostContainer);
          updateCharts(pointsByDay);
        });
    };
  });
}

const renderPoints = (data) => {
  tripPoints.innerHTML = ``;
  setTotalCost(data, totaCostContainer);
  data.forEach((dayPoints) => {
    let day = new TripDay(dayPoints);
    tripPoints.appendChild(day.render());
    day.onDelete = () => {
      api.getPoints()
        .then((remainPoints) => {
          sortPointsByDay(remainPoints, pointsByDay);
          const sortedPoints = sortingPoints(pointsByDay, currentFilter);
          renderPoints(sortedPoints);
        });
    };
  });
};

newTask.addEventListener(`click`, (e) => {
  e.target.setAttribute(`disabled`, true);

  const newPoint = {
    'id': String(Date.now()),
    'date_from': new Date(),
    'date_to': new Date(),
    'destination': {
      name: ``,
      description: ``,
      pictures: []
    },
    'base_price': 0,
    'is_favorite': false,
    'offers': [],
    'type': `bus`,
  };

  const point = new ModelPoint(newPoint);
  const pointEdit = new PointEdit(point);

  pointEdit.onSubmit = (newObject) => {
    newPoint.destination = {
      name: newObject.city,
      description: newObject.description,
      pictures: newObject.picture
    };
    newPoint.type = newObject.type.toLowerCase();
    newPoint.offers = newObject.offers;
    newPoint[`is_favorite`] = newObject.isFavorite;
    newPoint[`base_price`] = newObject.price;
    newPoint[`date_from`] = newObject.date.getTime();
    newPoint[`date_to`] = newObject.dateDue.getTime();
    const obj = ModelPoint.parsePoint(newPoint).toRAW();
    api.createPoint({point: obj})
      .then();

    api.getPoints()
      .then((points) => {
        sortPointsByDay(points, pointsByDay);
        const sortedPoints = sortingPoints(pointsByDay, currentFilter);
        renderPoints(sortedPoints);
        setTotalCost(pointsByDay, totaCostContainer);
      });

    newTask.removeAttribute(`disabled`);
  };
  pointEdit.onDelete = () => {
    pointEdit.unrender();
    newTask.removeAttribute(`disabled`);
  };

  pointEdit.onNewCardUpdate = () => {
    const priceInput = pointEdit._element.querySelector(`.point__input[name="price"]`);
    priceInput.removeAttribute(`readonly`);
  };

  tripPoints.insertBefore(pointEdit.render(), tripPoints.firstChild);
  const priceInput = pointEdit._element.querySelector(`.point__input[name="price"]`);
  priceInput.removeAttribute(`readonly`);
});

for (const btn of statBtns) {
  btn.addEventListener(`click`, function (e) {
    e.preventDefault();

    for (const itemBtn of statBtns) {
      itemBtn.classList.remove(ACTIVE_STAT);
    }
    closeAllContainer();
    e.target.classList.add(ACTIVE_STAT);
    const target = e.target.href.split(`#`)[1];
    if (target === `stats`) {
      newTask.setAttribute(`disabled`, true);
      newTask.style = `opacity: 0;`;
    } else {
      newTask.removeAttribute(`disabled`);
      newTask.style = `opacity: 1;`;
    }
    const targetContainer = document.querySelector(`#${target}`);
    targetContainer.classList.remove(HIDDEN_CLASS);
    updateCharts(pointsByDay);
  });
}

renderFilters(filtersRawData);

let msg = document.createElement(`div`);
msg.innerHTML = `Loading route...`;
msg.classList.add(`trip-points__message`);
tripPoints.appendChild(msg);

Promise.all([api.getPoints(), api.getDestinations(), api.getOffers()])
  .then(([pointsData, destinations, offers]) => {
    tripPoints.removeChild(msg);
    PointEdit.setDestinations(destinations);
    PointEdit.setAllOffers(offers);
    sortPointsByDay(pointsData, pointsByDay);
    renderPoints(pointsByDay);
  })
  .catch(() => {
    msg.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later`;
  });


