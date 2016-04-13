/* global chrome */
(function load() {
  chrome.runtime.sendMessage({
    name: 'content-init',
    source: 'chrome-react-perf',
  });
}());
