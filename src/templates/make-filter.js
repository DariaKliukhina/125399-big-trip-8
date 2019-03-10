export default (id, isChecked = false, isDisabled = false) => {
  const input = `<input type="radio" id="filter-${id}" ${isDisabled ? `disabled` : ``} value="${id}" name="filter" ${isChecked ? `checked` : ``}/>`;
  const label = `<label for="filter-${id}" class="trip-filter__item">${id}</label>`;
  return `${input} ${label}`;
};


