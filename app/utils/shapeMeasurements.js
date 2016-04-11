import Perf from 'react-addons-perf';
import mockConsole from './mockConsole';

let placeToStoreValueTemporarily;

function saveTableValue(value) {
  placeToStoreValueTemporarily = placeToStoreValueTemporarily || [];
  placeToStoreValueTemporarily.push(value);
}

function saveLogValue(...args) {
  placeToStoreValueTemporarily.push(Array.prototype.join.call(args, ' '));
}

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

export function getDom(measurements) {
  mockConsole.mock(callbacks);
  Perf.printDOM(measurements);
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
  getDom,
  getInclusive,
  getExclusive,
};
