import PointComponent from './point-component';


class TotalCost extends PointComponent {
  constructor() {
    super();
    this._totaCost = 0;
  }

  get template() {
    return `<div>
      Total:
      <span class="trip__total-cost">
        € ${this._totaCost}
      </span>
    </div>`.trim();
  }
  getPrice(data) {
    let tripPointPrice = 0;
    for (let [, value] of data) {
      value.map((point) => {
        tripPointPrice += Number(point.price);
      });
    }
    this._totaCost = tripPointPrice;
    return this._totaCost;
  }
}

export default TotalCost;

