/* global chrome */
// Create a new panel
chrome.devtools.panels.create('Perf',
  null,
  'devpanel.html',
  null
);
