const BACKGROUND_PORT_TAG = 'authsteem_background';
const port = chrome.runtime.connect({name: BACKGROUND_PORT_TAG});

port.postMessage({
    command: 'testRequest',
});

// get msg from background
port.onMessage.addListener(function(msg) {
  console.log('from background at popjs:', msg);
});
