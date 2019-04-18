import PointComponent from './component';


class TotalCost extends PointComponent {
  constructor() {
    super();
    this._totaCost = 0;
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

  get template() {
    return `<div>
      Total:
      <span class="trip__total-cost">
        € ${this._totaCost}
      </span>
    </div>`.trim();
  }
}

export default TotalCost;

