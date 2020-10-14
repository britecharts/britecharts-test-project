// Using CommonJS modules
const selection = require('d3-selection');
// Whole bundle
// const britecharts = require('britecharts');

// Individual charts
const bar = require('britecharts/dist/umd/bar.min');

// Using ESModules
import {select} from 'd3-selection';
import ESModBar from 'britecharts/dist/umd/bar.min';

import '../styles/index.scss';

// CommonJS Page
const isCommonJS = selection.select('.cjs-modules').size() === 1;

if(isCommonJS) {
  console.log('isCommonJS');
  const container = selection.select('.bar-container');
  const barChart = bar();
  const barData = [
      { name: 'Luminous', value: 2 },
      { name: 'Glittering', value: 5 },
      { name: 'Intense', value: 4 },
      { name: 'Radiant', value: 3 }
  ];

  barChart
      .margin({left: 100})
      .isHorizontal(true)
      .height(400)
      .width(600);

  container.datum(barData).call(barChart);
}

// ES Modules Page
const isESModules = selection.select('.es-modules').size() === 1;

if(isESModules) {
  console.log('isESModules');
  const container = select('.bar-container');
  const barChart = ESModBar();
  const barData = [
      { name: 'Luminous', value: 2 },
      { name: 'Glittering', value: 5 },
      { name: 'Intense', value: 4 },
      { name: 'Radiant', value: 3 }
  ];
  
  barChart
      .margin({left: 100})
      .isHorizontal(true)
      .height(400)
      .width(600);
  
  container.datum(barData).call(barChart);
}

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}


