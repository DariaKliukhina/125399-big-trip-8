import Point from "../points/point";
import PointEdit from "../points/point-edit";
import {api} from '../api';
import {setTotalCost, sortPointsByDay} from '../utils/helpers';

class TripDay {
  constructor(data) {
    this._pointsData = data;
    this._points = [];
    this._day = data[0].day;
    this._month = data[0].month;
    this._uniqueDay = data[0].uniqueDay;
    this._dayElements = ``;
    this._recentlyDeletedId = null;
    this._element = null;
    this._onDelete = null;
    this._onSubmit = null;

  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
    <section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">${this._day}</p>
        <h2 class="trip-day__title">${this._month}</h2>
      </article>
      <div class="trip-day__items">
      </div>
    </section>`.trim();
  }

  render() {
    this._element = this._createElement(this.template);
    this._dayElements = this._element.querySelector(`.trip-day__items`);
    this.build();

    this._points.map((curPoint) => {
      this._dayElements.appendChild(curPoint.element);
    });
    return this._element;
  }
  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }
  build() {
    this._pointsData.forEach((pointData, i) => {
      let point = new Point(pointData);
      let pointEdit = new PointEdit(pointData);
      point.render();

      this._points.push(point);

      point.onClick = () => {
        pointEdit.render();
        this._dayElements.replaceChild(pointEdit.element, point.element);
        point.unrender();
      };

      pointEdit.onSubmit = (newObject) => {
        pointData.city = newObject.city;
        pointData.type = newObject.type;
        pointData.typeIcon = newObject.typeIcon;
        pointData.description = newObject.description;
        pointData.price = newObject.price;
        pointData.time = newObject.time;
        pointData.offers = newObject.offers;
        pointData.date = newObject.date;
        pointData.dateDue = newObject.dateDue;
        pointData.isFavorite = newObject.dateDue;

        const block = () => {
          pointEdit.element.querySelector(`.point__button--save`).innerText = `Saving...`;
          pointEdit.element.classList.remove(`point--error`);
          pointEdit.element.querySelector(`.point__button--save`).disabled = true;
        };
        const unblock = () => {
          pointEdit.element.querySelector(`.point__button--save`).innerText = `Save`;
          pointEdit.element.querySelector(`.point__button--save`).disabled = false;
        };

        const totalCostContainer = document.querySelector(`.trip__total`);

        block();
        let pointsByDay = new Map();
        api.updatePoint({id: pointData.id, data: pointData.toRAW()})
          .then((newPoint) => {
            unblock();
            point.update(newPoint);
            point.render();
            this._dayElements.replaceChild(point.element, pointEdit.element);
            pointEdit.unrender();
            api.getPoints()
            .then((remainPoints) => {
              sortPointsByDay(remainPoints, pointsByDay);
              setTotalCost(pointsByDay, totalCostContainer);
            });
          })
          .catch(() => {
            pointEdit.shake();
            pointEdit.element.classList.add(`point--error`);
            unblock();
          });
      };

      pointEdit.onEsc = (initialObject) => {
        point._price = initialObject.price;
        point._offers = initialObject.offers;
        point._isFavorite = initialObject.isFavorite;
        pointEdit.update(pointData);
        point.render();
        this._dayElements.replaceChild(point.element, pointEdit.element);
        pointEdit.unrender();
      };

      pointEdit.onDelete = ({id}) => {
        const block = () => {
          pointEdit.element.querySelector(`.point__button--delete`).innerText = `Deleting...`;
          pointEdit.element.classList.remove(`point--error`);
          pointEdit.element.querySelector(`.point__button--delete`).disabled = true;
        };
        const unblock = () => {
          pointEdit.element.querySelector(`.point__button--delete`).innerText = `Delete`;
          pointEdit.element.querySelector(`.point__button--delete`).disabled = false;
        };

        block();

        api.deletePoint({id})
          .then(() => api.getPoints())
          .then(() => {
            this._points[i] = null;
            pointEdit.unrender();
            if (this._points.every((element) => element === null)) {
              this._element.remove();
            }
            this._onDelete();
          })
          .catch(() => {
            pointEdit.shake();
            pointEdit.element.classList.add(`point--error`);
            unblock();
          });
      };
    });
  }
  unrender() {
    this._element = null;
  }
}

export default TripDay;
