/* global chrome */
import injectContent from './injectContent';

(function eventPage() {
  const tabIdToPortMap = {};
  const portIdToTabIdMap = {};
  const portIdToPortMap = {};
  // To assign port IDs to ports because ports aren't hashable
  let lastPortId = 0;

  chrome.runtime.onConnect.addListener(port => {
    let portId;

    function onMessage(message, /* sender, sendResponse */) {
      // The original connection event doesn't include the tab ID of the
      // DevTools page, so we need to send it explicitly.
      if (message.name === 'devpanel-init') {
        ++lastPortId;
        portId = lastPortId;
        tabIdToPortMap[message.tabId] = port;
        portIdToTabIdMap[portId] = message.tabId;
        portIdToPortMap[portId] = port;

        injectContent(message.tabId);
        return;
      }

      // other message handling
    }

      // Listen to messages sent from the DevTools page
    port.onMessage.addListener(onMessage);

    port.onDisconnect.addListener(() => {
      // Find the tab
      const tabId = portIdToTabIdMap[portId];

      chrome.tabs.sendMessage(tabId, {
        name: 'clean-up',
        source: 'chrome-react-perf',
      });

      port.onMessage.removeListener(onMessage);

      // Delete all associations
      delete portIdToTabIdMap[portId];
      delete portIdToPortMap[portId];
      delete tabIdToPortMap[tabId];
    });
  });

  // Receive message from content script and relay to the devTools page for the
  // current tab
  chrome.runtime.onMessage.addListener((request, sender, /* sendResponse */) => {
    // Messages from content scripts should have sender.tab set
    /* eslint-disable no-console */
    if (sender.tab) {
      const tabId = sender.tab.id;
      if (tabId in tabIdToPortMap) {
        tabIdToPortMap[tabId].postMessage(request);
      } else {
        console.log('Tab not found in connection list.');
      }
    } else {
      console.log('sender.tab not defined.');
    }
    /* eslint-enable no-console */
    return true;
  });
}());
