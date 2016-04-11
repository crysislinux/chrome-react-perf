(function pageScript() {
  function onMessage(event) {
    const message = event.data;

    if (event.source !== window) {
      return;
    }

    // Only accept messages that we know are ours
    if (typeof message !== 'object' || message === null ||
      message.source !== 'chrome-react-perf') {
      return;
    }

    if (message.name === 'clean-up') {
      window.Perf.stop();
      window.removeEventListener('message', onMessage);
    }
  }
  window.addEventListener('message', onMessage);
}());
