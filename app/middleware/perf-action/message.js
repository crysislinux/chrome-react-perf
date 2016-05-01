/* global chrome */
import * as ActionTypes from '../../actions/types';
import {
  detectPerf
} from '../../actions';

let backgroundPageConnection;
const source = 'chrome-react-perf';

const actionsRecorder = {};

export function passMessage(action, next) {
  const tabId = chrome.devtools.inspectedWindow.tabId;

  const { message, types: [requestType] } = action;
  const promise = new Promise((resolve, reject) => {
    if (requestType === ActionTypes.CONNECT_REQUEST && !backgroundPageConnection) {
      backgroundPageConnection = chrome.runtime.connect({
        name: 'devpanel'
      });
      backgroundPageConnection.postMessage({
        name: 'devpanel-init',
        source,
        tabId
      });

      backgroundPageConnection.onMessage.addListener((request, /* sender, sendResponse */) => {
        if (actionsRecorder[request.name] && actionsRecorder[request.name].length > 0) {
          const first = actionsRecorder[request.name].shift();
          first[0](request.data);
        } else {
          if (request.name === 'detect-perf') {
            // I think it should not be handled here, maybe a new middleware is needed.
            // But do not have that much time now.
            next(detectPerf(request.data.found));
          }
        }
      });

      resolve();

      return;
    }

    if (!actionsRecorder[requestType]) {
      actionsRecorder[requestType] = [];
    }

    actionsRecorder[requestType].push([resolve, reject]);
    backgroundPageConnection.postMessage({ ...message, source, tabId, name: requestType });
  });

  return promise;
}
