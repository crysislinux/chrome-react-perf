/* global chrome */
import * as ActionTypes from '../../actions/types';

let backgroundPageConnection;
const source = 'chrome-react-perf';

export function passMessage(action) {
  const tabId = chrome.devtools.inspectedWindow.tabId;
  const { message, type } = action;
  const promise = new Promise((resolve, /* reject */) => {
    setTimeout(() => {
      resolve();
    });

    if (type === ActionTypes.CONNECT) {
      backgroundPageConnection = chrome.runtime.connect({
        name: 'devpanel'
      });
      backgroundPageConnection.postMessage({
        name: 'devpanel-init',
        tabId
      });

      return;
    }

    backgroundPageConnection.postMessage({ ...message, source, tabId });
  });

  return promise;
}
