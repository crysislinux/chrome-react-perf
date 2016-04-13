/* global chrome */
import * as ActionTypes from '../../actions/types';

let backgroundPageConnection;
const source = 'chrome-react-perf';

const actionsRecorder = {};

export function passMessage(action) {
  const tabId = chrome.devtools.inspectedWindow.tabId;

  const { message, types: [requestType] } = action;
  const promise = new Promise((resolve, reject) => {
    if (requestType === ActionTypes.CONNECT_REQUEST && !backgroundPageConnection) {
      backgroundPageConnection = chrome.runtime.connect({
        name: 'devpanel'
      });
      backgroundPageConnection.postMessage({
        name: 'devpanel-init',
        tabId
      });

      backgroundPageConnection.onMessage.addListener((request, /* sender, sendResponse */) => {
        if (actionsRecorder[request.name] && actionsRecorder[request.name].length > 0) {
          const first = actionsRecorder[request.name].shift();
          first[0](request.data);
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
