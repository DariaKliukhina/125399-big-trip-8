import {createElement} from './create-element.js';

class Point {
  constructor(data) {
    this._city = data.city;
    this._title = data.title;
    this._picture = data.picture;
    this._event = data.event;
    this._price = data.price;
    this._offers = data.offer;
    this._icon = data.icon;
    this._description = data.description;
    this._date = data.day;
    this._time = data.period;

    this._element = null;
    this._state = {
      isEdit: false
    };
  }

  _onClickHandeler() {
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }

  get element() {
    return this._element;
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `
        <article class="trip-point">
          <i class="trip-icon">${this._icon}</i>
          <h3 class="trip-point__title">${this._title} ${this._city}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${this._time.period}</span>
             <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">${this._price}</p>
          <ul class="trip-point__offers">
             ${(Array.from(this._offers).map((offer) => (`
                      <li>
                         <button class="trip-point__offer">${offer}</button>
                      </li>`.trim()))).join(``)}
          </ul>
      </article>
    `;
  }

  bind() {
    this._element.addEventListener(`click`, this._onClickHandeler.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    // Удаление обработчиков
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

export default Point;
