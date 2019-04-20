import TotalCost from '../components/total-cost';

const getRandomNum = (count) => {
  return Math.floor(Math.random() * count);
};

const getRandomElement = (array) => {
  return array[getRandomNum(array.length)];
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const getTime = (date, dateDue) => {
  const diffMs = dateDue - date;
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

  const msHrs = diffMs / 3600000;
  let diffDays = Math.floor(msHrs / 24);

  const msDays = diffDays * 86400000;

  const msDiffHours = (diffMs - msDays);
  const tmpDiffHrs = Math.floor(msDiffHours / 3600000);
  let diffHrs = `${tmpDiffHrs}H`;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dueHours = dateDue.getHours();
  let dueMinutes = dateDue.getMinutes();
  if (dueHours < 10) {
    dueHours = `0${dueHours}`;
  }
  if (dueMinutes < 10) {
    dueMinutes = `0${dueMinutes}`;
  }
  if (diffDays === 0) {
    diffDays = ``;

    if (tmpDiffHrs === 0) {
      diffHrs = ``;
    } else {
      diffHrs = `${diffHrs}`;
    }
  } else {
    diffDays = `${diffDays}D `;
  }

  return {
    from: `${hours}:${minutes}`,
    due: `${dueHours}:${dueMinutes}`,
    duration: `${diffDays} ${diffHrs} ${diffMins}M`
  };
};
const getDuration = (date, dateDue) => {
  return dateDue - date;
};
const types = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳️`,
  'Transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈️`,
  'check-in': `🏨`,
  'sightseeing': `🏛`,
  'Restaurant': `🍴`,
};

const setTotalCost = (points, container) => {
  container.innerHTML = ``;
  const newTotalCostComponent = new TotalCost();

  newTotalCostComponent.getPrice(points);
  container.appendChild(newTotalCostComponent.render());

};

const sortPointsByDay = (data, points) => {
  points.clear();
  for (let point of data) {
    if (!points.has(point.uniqueDay)) {
      points.set(point.uniqueDay, [point]);
    } else {
      points.get(point.uniqueDay).push(point);
    }
  }

  points = new Map([...points.entries()].sort());
};

export {getRandomElement, getRandomNum, shuffleArray, getTime, getDuration, types, setTotalCost, sortPointsByDay};
