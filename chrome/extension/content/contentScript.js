/* global chrome */
(function contentScript() {
  function onMessage(message, /* sender, sendResponse */) {
    if (message.name === 'clean-up') {
      window.postMessage(message, '*');
      chrome.runtime.onMessage.removeListener(onMessage);
    }
  }

  chrome.runtime.onMessage.addListener(onMessage);
}());
