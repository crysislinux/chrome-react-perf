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

/**
 * check whether window.Perf exist or not
 * @return null
 */
function detectPerf() {
  function report(found) {
    window.postMessage({
      name: 'detect-perf',
      source: 'chrome-react-perf',
      data: { found },
      sender: 'pageScript'
    }, '*');
  }

  function check() {
    if (window.Perf) {
      report(true);
    } else {
      setTimeout(check, 500);
    }
  }

  check();
}

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
    window.Perf.stop();
    return;
  }

  if (message.name === 'devpanel-init') {
    detectPerf();
    return;
  }

  if (perfCallbacks[message.name]) {
    const result = perfCallbacks[message.name]();
    window.postMessage({
      name: message.name,
      source: 'chrome-react-perf',
      data: result,
      sender: 'pageScript'
    }, '*');
    return;
  }
}

export default function hookChromeReactPerf() {
  window.addEventListener('message', onMessage);
}
