import component from '../components/component';
import moment from 'moment';

class Point extends component {
  constructor(data) {
    super();
    this._token = data.token;
    this._city = data.city;
    this._title = data.title;
    this._picture = data.picture;
    this._event = data.event;
    this._price = data.price;
    this._offers = data.offers;
    this._offerPrice = data.offerPrice;
    this._icon = data.icon;
    this._description = data.description;
    this._date = data.day;
    this._time = data.time;
    this._timeStart = data.timeStart;
    this._timeStop = data.timeStop;

    this._state.isFavorite = false;

    this._element = null;
    this._state = {
      isEdit: false,
    };

    this._onEditClick = this._onEditClick.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
  }

  _onEditClick() {
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }

  _onFavoriteChange() {
    this._state.isFavorite = !this._state.isFavorite;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get duration() {
    const timeParts = this._time.split(` to `);

    const dateStart = moment(timeParts[0], `hh.mm`);
    const dateEnd = moment(timeParts[1], `hh.mm`);


    const duration = moment.duration(dateEnd.diff(dateStart));
    const hours = duration.hours();
    const minutes = duration.minutes();

    return `${hours}H:${minutes}M`;
  }

  get template() {
    return `
        <article class="trip-point">
          <i class="trip-icon">${this._icon}</i>
          <h3 class="trip-point__title">${this._title} ${this._city}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${this._time}</span>
            <span class="trip-point__duration">${this.duration}</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
          <ul class="trip-point__offers">
             ${(Array.from(this._offers).map((offer) => (`
                      <li>
                         <button class="trip-point__offer">${offer.label}</button>
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

  update(data) {
    this._title = data.title;
    this._city = data.city;
    this._price = data.price;
    this._icon = data.icon;
    this._time = data.time;
    this._offers = data.offers;
  }
}

export default Point;
