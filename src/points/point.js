import PointComponent from '../components/component.js';

class Point extends PointComponent {
  constructor(data) {
    super();
    this._city = data.city;
    this._title = data.title;
    this._picture = data.picture;
    this._event = data.event;
    this._price = data.price;
    this._offers = data.offer;
    this._icon = data.icon;
    this._description = data.description;
    this._date = data.day;
    this._time = data.time;

    this._element = null;
    this._state = {
      isEdit: false
    };

    this._onEditClick = this._onEditClick.bind(this);
  }

  _onEditClick() {
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
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
            <span class="trip-point__timetable">${this._time.hour}:${this._time.minute}&nbsp;&mdash; ${this._time.hour + 1}:00</span>
            <span class="trip-point__duration">00h ${60 - this._time.minute}m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
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
    this._element.addEventListener(`click`, this._onEditClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEditClick);
  }
}

export default Point;
