/* global Perf */
import shapeMeasurements from './shapeMeasurements';
import * as ActionTypes from '../../../app/actions/types';

function getPerfData() {
  return {
    wasted: shapeMeasurements.getWasted(),
    dom: shapeMeasurements.getDOM(),
    inclusive: shapeMeasurements.getInclusive(),
    exclusive: shapeMeasurements.getExclusive(),
  };
}

const perfCallbacks = {
  [ActionTypes.GET_PERF_DATA_REQUEST]: getPerfData,
};

function onMessage(event) {
  const message = event.data;

  if (event.source !== window) {
    return;
  }

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null ||
    message.source !== 'chrome-react-perf') {
    return;
  }

  // Ignore messages send from pageScript, avoid infinite dispatching
  if (message.sender === 'pageScript') {
    return;
  }

  if (message.name === 'clean-up') {
    window.removeEventListener('message', onMessage);
    window.Perf.stop();
  }

  if (perfCallbacks[message.name]) {
    const result = perfCallbacks[message.name]();
    window.postMessage({
      name: message.name,
      source: 'chrome-react-perf',
      data: result,
      sender: 'pageScript'
    }, '*');
  }
}

export default function hookChromeReactPerf() {
  // testPostMesage();
  window.addEventListener('message', onMessage);
}
