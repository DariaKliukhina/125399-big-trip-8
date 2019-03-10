import {createElement} from './../utils/create-element.js';

class PointComponent {
  constructor() {
    if (new.target === PointComponent) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  bind() {}

  unbind() {}

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  reset() {
    this.unbind();
    this._element = null;
  }
}

export default PointComponent;
