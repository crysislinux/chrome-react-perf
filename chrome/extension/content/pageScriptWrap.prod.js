/* global chrome */
(function pageWrapScript() {
  const s = document.createElement('script');
  s.type = 'text/javascript';

  s.src = chrome.runtime.getURL('page.bundle.js');
  s.onload = function removeWrapScript() {
    this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(s);
}());
