import PointEdit from './points/point-edit';
import Filter from "./filter/filter";
import Sorting from "./sorting/sorting";
import {api} from "./api";
import moment from "moment";
import TripDay from "./components/trip-day";
import {updateCharts} from "./statistic";

const tripPoints = document.querySelector(`.trip-points`);
const mainFilter = document.querySelector(`.trip-filter`);
const mainSorting = document.querySelector(`.trip-sorting`);

const HIDDEN_CLASS = `visually-hidden`;
const ACTIVE_STAT = `view-switch__item--active`;

const statBtns = document.querySelectorAll(`.view-switch__item`);
const pointsContainer = document.querySelector(`.main`);
const statisticContainer = document.querySelector(`.statistic`);
const allContainers = [pointsContainer, statisticContainer];
const closeAllContainer = () => allContainers.forEach((it) => it.classList.add(HIDDEN_CLASS));


const filtersRawData = [
  {name: `everything`, id: `filter-everything`, isChecked: true},
  {name: `future`, id: `filter-future`, isChecked: false},
  {name: `past`, id: `filter-past`, isChecked: false},
];

const sortingRawData = [
  {name: `event`, id: `sorting-event`, isChecked: true},
  {name: `time`, id: `sorting-time`, isChecked: false},
  {name: `price`, id: `sorting-price`, isChecked: false},
];

function renderSorting(sortingData) {
  sortingData.forEach((rawSorting) => {
    let sorting = new Sorting(rawSorting);
    mainSorting.appendChild(sorting.render());

    sorting.onSorting = () => {
      const sortingName = sorting._id;
      api.getPoints()
        .then((allPoints) => {
          const sortedPoints = sortingPoints(allPoints, sortingName);
          tripPoints.innerHTML = ``;
          sortPointsByDay(sortedPoints);
          renderPoints(pointsByDay);
        });
    };
  });
}

renderSorting(sortingRawData);

let pointsByDay = new Map();
const sortPointsByDay = (data) => {
  pointsByDay.clear();
  for (let point of data) {
    if (!pointsByDay.has(point.uniqueDay)) {
      pointsByDay.set(point.uniqueDay, [point]);
    } else {
      pointsByDay.get(point.uniqueDay).push(point);
    }
  }
  pointsByDay = new Map([...pointsByDay.entries()].sort());
};

const sortingPoints = (data, sortingName) => {
  switch (sortingName) {
    case `sorting-event`:
      return sortPointsByDay(data);
    case `sorting-time`:
      return data.filter((it) => moment(it.date) > moment());
    case `sorting-price`:
      return data.filter((it) => moment(it.date) < moment());
  }
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
          sortPointsByDay(filteredPoints);
          renderPoints(pointsByDay);
        });
    };
  });
}


const renderPoints = (data) => {
  data.forEach((dayPoints) => {
    let day = new TripDay(dayPoints);
    tripPoints.appendChild(day.render());

    day.onDelete = () => {
      api.getPoints()
        .then((remainPoints) => {
          sortPointsByDay(remainPoints);
          renderPoints(pointsByDay);
        });
    };
  });
};

for (const btn of statBtns) {
  btn.addEventListener(`click`, function (e) {
    e.preventDefault();

    for (const itemBtn of statBtns) {
      itemBtn.classList.remove(ACTIVE_STAT);
    }
    closeAllContainer();
    e.target.classList.add(ACTIVE_STAT);
    const target = e.target.href.split(`#`)[1];

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
    sortPointsByDay(pointsData);
    renderPoints(pointsByDay);
  })
  .catch(() => {
    msg.innerHTML = `Something went wrong while loading your route info. Check your connection or try again later`;
  });


