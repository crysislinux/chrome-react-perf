/* global chrome */
export default function injectContent(tabId) {
  if (process.env.NODE_ENV === 'production') {
    chrome.tabs.executeScript(tabId, {
      file: 'content.bundle.js'
    });
  } else {
    fetch('http://localhost:3000/content.bundle.js')
      .then(response =>
        response.text()
      ).then(body => {
        chrome.tabs.executeScript(tabId, {
          code: body
        });
      });
  }
}
