/* global chrome */
import * as ActionTypes from '../../actions/types';

export const injectedActions = [
  ActionTypes.START_RECORD_REQUEST,
  ActionTypes.STOP_RECORD_REQUEST,
];

const actionToCommandMap = {
  [ActionTypes.START_RECORD_REQUEST]: 'Perf.start()',
  [ActionTypes.STOP_RECORD_REQUEST]: 'Perf.stop()',
};

function executeCommand(command, callback) {
  chrome.devtools.inspectedWindow.eval(
    command,
    (result, isException) => {
      if (isException) {
        callback(isException, result);
      } else {
        callback(isException, result);
      }
    }
  );
}

export function inject(action) {
  const [requestType] = action.types;
  const promise = new Promise((resolve, reject) => {
    executeCommand(actionToCommandMap[requestType], (isException, result) => {
      if (isException) {
        reject(isException);
      } else {
        resolve(result);
      }
    });
  });

  return promise;
}
