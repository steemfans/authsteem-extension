const BACKGROUND_PORT_TAG = 'authsteem_background';

chrome.runtime.onConnect.addListener(function(port) {
  console.log('port connected: ', port.name);
  console.assert(port.name === BACKGROUND_PORT_TAG);
  // receive msg
  port.onMessage.addListener(function(msg) {
    switch (msg.command) {
      case 'testRequest':
        popWindow();
        port.postMessage({
          request_id: msg.request_id,
          response: 'finish',
        });
        break;
    }
  });
});


function popWindow() {
  const popupPageUrl = chrome.runtime.getURL('html/popup.html');
  chrome.windows.create(
    {
      focused: true,
      height: 400,
      width: 200,
      left: 20,
      top: 20,
      type: 'popup',
      url: popupPageUrl,
    },
    () => {
      console.log('opened window');
    },
  )
}
