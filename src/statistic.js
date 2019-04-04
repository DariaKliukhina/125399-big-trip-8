import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

const BAR_HEIGHT = 55;
moneyCtx.height = BAR_HEIGHT * 6;
transportCtx.height = BAR_HEIGHT * 4;
timeSpendCtx.height = BAR_HEIGHT * 4;

const getEventsMoney = (events) => {
  const types = {};
  const data = [];

  for (let event of events) {
    const prop = `${event.icon} ${event.eventType.toUpperCase()}`;
    if (!types.hasOwnProperty(prop)) {
      types[prop] = event.price;
    } else {
      types[prop] += event.price;
    }
  }

  for (let prop in types) {
    data.push(types[prop]);
  }

  return {
    uniqTypes: Object.keys(types),
    data
  };
};

const getEventsTransport = (events) => {
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

  for (let event of events) {
    switch (event.eventType) {
      case `check-in`:
      case `sightseeing`:
      case `restaurant`:
        updateTypes(otherTypes, event.icon, event.eventType);
        break;
      default:
        updateTypes(transportTypes, event.icon, event.eventType);
    }
  }

  for (let prop in transportTypes) {
    updateData(dataTransport, transportTypes, prop);
  }

  for (let prop in otherTypes) {
    updateData(dataOther, otherTypes, prop);
  }

  return {
    transportTypes: Object.keys(transportTypes),
    otherTypes: Object.keys(transportTypes),
    dataTransport,
    dataOther
  };
};

const getResultMoney = (result) => {
  const dataChartEventsMoney = getEventsMoney(result);

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: dataChartEventsMoney.uniqTypes,
      datasets: [{
        data: dataChartEventsMoney.data,
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
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
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
  });
  return moneyChart;
};
const getResultTransport = (result) => {
  const dataChartEventsTransport = getEventsTransport(result);
  const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: dataChartEventsTransport.transportTypes,
      datasets: [{
        data: dataChartEventsTransport.dataTransport,
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
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
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
  });
  return transportChart;
};

export {getResultMoney, getResultTransport};

