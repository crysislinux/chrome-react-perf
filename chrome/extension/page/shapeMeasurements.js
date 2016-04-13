/* global Perf, chrome */
import mockConsole from './mockConsole';

let placeToStoreValueTemporarily;

function saveTableValue(value) {
  placeToStoreValueTemporarily = placeToStoreValueTemporarily || [];
  placeToStoreValueTemporarily.push(value);
}

function saveLogValue(...args) {
  placeToStoreValueTemporarily.push(Array.prototype.join.call(args, ' '));
}

// react-addons-perf uses console.table && console.log to print output,
// so we need to mock them to get the data.
const callbacks = {
  table: saveTableValue,
  log: saveLogValue
};

export function getWasted(measurements) {
  mockConsole.mock(callbacks);
  Perf.printWasted(measurements);
  mockConsole.restore();

  const output = JSON.parse(JSON.stringify(placeToStoreValueTemporarily));
  placeToStoreValueTemporarily = null;

  return output;
}

export function getDOM(measurements) {
  mockConsole.mock(callbacks);

  const printDOM = Perf.printOperations || Perf.printDOM;
  printDOM(measurements);

  mockConsole.restore();

  const output = JSON.parse(JSON.stringify(placeToStoreValueTemporarily));
  placeToStoreValueTemporarily = null;

  return output;
}

export function getInclusive(measurements) {
  mockConsole.mock(callbacks);
  Perf.printInclusive(measurements);
  mockConsole.restore();

  const output = JSON.parse(JSON.stringify(placeToStoreValueTemporarily));
  placeToStoreValueTemporarily = null;

  return output;
}

export function getExclusive(measurements) {
  mockConsole.mock(callbacks);
  Perf.printExclusive(measurements);
  mockConsole.restore();

  const output = JSON.parse(JSON.stringify(placeToStoreValueTemporarily));
  placeToStoreValueTemporarily = null;

  return output;
}

export default {
  getWasted,
  getDOM,
  getInclusive,
  getExclusive,
};
