export default (data) => {
  return `<article class="trip-point">
    <i class="trip-icon">${data.icon}</i>
  <h3 class="trip-point__title">${data.title} ${data.city}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${data.time}</span>
  <span class="trip-point__duration">1h 30m</span>
  </p>
  <p class="trip-point__price">&euro;&nbsp;${data.price}</p>
  <ul class="trip-point__offers">
  ${data.offer}
  </ul>
  </article>`;
};