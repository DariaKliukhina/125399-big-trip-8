import PointComponent from './component';


class TotalCost extends PointComponent {
  constructor() {
    super();
    this._totalPrice = 0;
  }

  getPrice(data) {
    let tripPointPrice = 0;
    for (let point of data) {
      //Тест. Не хватает на сохранении карточки.
      tripPointPrice += Number(point.price);
    }

    this._totalPrice = tripPointPrice;
    return this._totalPrice;
  }

  get template() {
    return `<div>
      Total: 
      <span class="trip__total-cost">
        € ${this._totalPrice}
      </span>
    </div>`.trim();
  }
}

export default TotalCost;

