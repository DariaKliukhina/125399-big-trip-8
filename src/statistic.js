import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

const BAR_HEIGHT = 55;
moneyCtx.height = BAR_HEIGHT * 6;
transportCtx.height = BAR_HEIGHT * 4;
timeSpendCtx.height = BAR_HEIGHT * 6;

let moneyChart;
let transportChart;
let timeChart;

const updateCharts = (points) => {
  let convertedPoints = [];
  points.forEach((point) => {
    convertedPoints.push(...point);
  });

  const dataChartEventsMoney = getEventsMoney(convertedPoints);
  const dataChartEventsTime = getEventsTime(convertedPoints);
  const dataChartEventsTransport = getEventsTransport(convertedPoints);

  moneyChart = new Chart(moneyCtx, createDataChart({
    data: {
      labels: dataChartEventsMoney.uniqTypes,
      datasets: [{
        data: dataChartEventsMoney.data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    }
  }, `MONEY`, `€`)
  );
  timeChart = new Chart(timeSpendCtx, createDataChart({
    data: {
      labels: dataChartEventsTime.uniqTypes,
      datasets: [{
        data: dataChartEventsTime.data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    }
  }, `TIME`, `H`));
  transportChart = new Chart(transportCtx, createDataChart({
    data: {
      labels: dataChartEventsTransport.transportTypes,
      datasets: [{
        data: dataChartEventsTransport.dataTransport,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
  }, `TRANSPORT`, ``)
  );
};

function getEventsMoney(points) {
  const types = {};
  const data = [];

  for (let event of points) {
    const prop = `${event.typeIcon} ${event.type.toUpperCase()}`;
    if (!types.hasOwnProperty(prop)) {
      types[prop] = Number(event.price);
    } else {
      types[prop] += Number(event.price);
    }
  }

  for (let prop in types) {
    if (types.hasOwnProperty(prop)) {
      data.push(types[prop]);
    }
  }

  return {
    uniqTypes: Object.keys(types),
    data
  };
}

function getEventsTime(points) {
  const types = {};
  const data = [];

  for (let event of points) {
    const prop = `${event.typeIcon} ${event.type.toUpperCase()}`;
    if (!types.hasOwnProperty(prop)) {
      types[prop] = Number(event.duration);
    } else {
      types[prop] += Number(event.duration);
    }
  }

  for (let prop in types) {
    if (types.hasOwnProperty(prop)) {
      let convertedTime = Math.floor(types[prop] / 3600000);
      data.push(convertedTime);
    }
  }

  return {
    uniqTypes: Object.keys(types),
    data
  };
}

function getEventsTransport(points) {
  const transportTypes = {};
  const otherTypes = {};
  const dataTransport = [];
  const dataOther = [];

  function updateTypes(obj, prop1, prop2) {
    const prop = `${prop1} ${prop2.toUpperCase()}`;
    if (!obj.hasOwnProperty(prop)) {
      obj[prop] = 1;
    } else {
      obj[prop] += 1;
    }
  }

  function updateData(arr, obj, prop) {
    prop.toUpperCase();
    arr.push(obj[prop]);
  }

  for (let event of points) {
    switch (event.type.toLowerCase()) {
      case `check-in`:
      case `sightseeing`:
      case `restaurant`:
        updateTypes(otherTypes, event.typeIcon, event.type);
        break;
      default:
        updateTypes(transportTypes, event.typeIcon, event.type);
    }
  }

  for (let prop in transportTypes) {
    if (transportTypes.hasOwnProperty(prop)) {
      updateData(dataTransport, transportTypes, prop);
    }
  }

  for (let prop in otherTypes) {
    if (otherTypes.hasOwnProperty(prop)) {
      updateData(dataOther, otherTypes, prop);
    }
  }

  return {
    transportTypes: Object.keys(transportTypes),
    otherTypes: Object.keys(otherTypes),
    dataTransport,
    dataOther
  };
}

const createDataChart = (data, titleText, symbol) => {
  return {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data.data.labels,
      datasets: [{
        data: data.data.datasets[0].data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${symbol} ${val}`
        }
      },
      title: {
        display: true,
        text: titleText,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  };
};

export {updateCharts, moneyChart, transportChart, timeChart};

