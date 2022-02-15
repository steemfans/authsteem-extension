const BACKGROUND_PORT_TAG = 'authsteem_background';

chrome.runtime.onConnect.addListener(function(port) {
  console.log('port connected: ', port.name);
  console.assert(port.name === BACKGROUND_PORT_TAG);
  // receive msg
  port.onMessage.addListener(function(msg) {
    switch (msg.command) {
      case 'testRequest':
        port.postMessage({
          request_id: msg.request_id,
          response: 'finish',
        });
        break;
    }
  });
});
