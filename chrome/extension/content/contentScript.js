/* global chrome */
(function contentScript() {
  function onPageMessage(event) {
    const message = event.data;

    if (event.source !== window) {
      return;
    }

    // Only accept messages that we know are ours
    if (typeof message !== 'object' || message === null ||
      message.source !== 'chrome-react-perf') {
      return;
    }

    // Ignore messages send from contentScript, avoid infinite dispatching
    if (message.sender === 'contentScript') {
      return;
    }

    chrome.runtime.sendMessage(message);
  }

  function onMessage(message, /* sender, sendResponse */) {
    if (message.name === 'clean-up') {
      window.removeEventListener('message', onPageMessage);
      chrome.runtime.onMessage.removeListener(onMessage);
    }

    // relay all messages to pageScript
    window.postMessage({ ...message, sender: 'contentScript' }, '*');
  }

  window.addEventListener('message', onPageMessage);
  chrome.runtime.onMessage.addListener(onMessage);
}());
