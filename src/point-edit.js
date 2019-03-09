import {createElement} from './create-element.js';

class PointEdit {
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
    this._onSubmit = null;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
        <article class="point">
          <form action="" method="get">
            <header class="point__header">
              <label class="point__date">
                choose day
                <input class="point__input" type="text" placeholder="MAR 18" name="day">
              </label>
        
              <div class="travel-way">
                <label class="travel-way__label" for="travel-way__toggle">${this._icon}</label>
        
                <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
        
                <div class="travel-way__select">
                  <div class="travel-way__select-group">
                    <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
                    <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>
        
                    <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
                    <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>
        
                    <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
                    <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>
        
                    <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" checked>
                    <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
                  </div>
        
                  <div class="travel-way__select-group">
                    <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                    <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>
        
                    <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
                    <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
                  </div>
                </div>
              </div>
        
              <div class="point__destination-wrap">
                <label class="point__destination-label" for="destination">${this._title}</label>
                <input class="point__destination-input" list="destination-select" id="destination" value="Chamonix" name="destination">
                <datalist id="destination-select">
                  <option value="airport"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="hotel"></option>
                </datalist>
              </div>
        
              <label class="point__time">
                choose time
                <input class="point__input" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
              </label>
        
              <label class="point__price">
                write price
                <span class="point__price-currency">€</span>
                <input class="point__input" type="text" value="${this._price}" name="price">
              </label>
        
              <div class="point__buttons">
                <button class="point__button point__button--save" type="submit">Save</button>
                <button class="point__button" type="reset">Delete</button>
              </div>
        
              <div class="paint__favorite-wrap">
                <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
                <label class="point__favorite" for="favorite">favorite</label>
              </div>
            </header>
        
            <section class="point__details">
              <section class="point__offers">
                <h3 class="point__details-title">offers</h3>
        
                <div class="point__offers-wrap">
                ${(Array.from(this._offers).map((offer) => (`
                          <input class="point__offers-input visually-hidden" 
                                 type="checkbox" 
                                 id="${offer.split(` `).join(`-`).toLocaleLowerCase()}" 
                                 name="offer" 
                                 value="${offer.split(``).join(`-`).toLocaleLowerCase()}">
                          <label for="add-luggage" class="point__offers-label">
                            <span class="point__offer-service">${offer}</span> + €<span class="point__offer-price"></span>
                          </label>
                         `.trim()))).join(``)}
                  </div>
          
                </section>
                <section class="point__destination">
                  <h3 class="point__details-title">Destination</h3>
                  <p class="point__destination-text">
                    ${this._description}
                  </p>
                  <div class="point__destination-images">
                    <img src="http://picsum.photos/330/140?r=123" alt="picture from place" class="point__destination-image">
                    <img src="http://picsum.photos/300/200?r=1234" alt="picture from place" class="point__destination-image">
                    <img src="http://picsum.photos/300/100?r=12345" alt="picture from place" class="point__destination-image">
                    <img src="http://picsum.photos/200/300?r=123456" alt="picture from place" class="point__destination-image">
                    <img src="http://picsum.photos/100/300?r=1234567" alt="picture from place" class="point__destination-image">
                  </div>
                </section>
                <input type="hidden" class="point__total-price" name="total-price" value="">
              </section>
            </form>
          </article>
`;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  reset() {
    this.unbind();
    this._element = null;
  }

  bind() {
    this._element.addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  unbind() {
    // Удаление обработчиков
  }
}

export default PointEdit;