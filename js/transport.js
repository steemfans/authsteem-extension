const BACKGROUND_PORT_TAG = 'authsteem_background';
const port = chrome.runtime.connect({name: BACKGROUND_PORT_TAG});

// insert user interface into content pages
const setupInjection = () => {
  try {
    const scriptTag = document.createElement('script');
    const insertData = {
      id: chrome.runtime.id,
    };
    scriptTag.src = chrome.runtime.getURL('js/authsteem.js');
    const container = document.head || document.documentElement;
    container.insertBefore(scriptTag, container.children[0]);
  } catch (e) {
    console.error('AuthSteem injection failed.', e);
  }
}
setupInjection();

// send message to frontend js
function sendMsgToFe(msg) {
  window.postMessage(
    {
      type: 'authsteem_transport',
      response: msg,
    },
    window.location.origin
  );
}

// get msg from fe and send it to background
document.addEventListener("transport", function(request) {
  console.log('[transport got msg from fe]: ', request);
  port.postMessage(request.detail);
});

// get msg from background
port.onMessage.addListener(function(msg) {
  console.log('[transport got msg from background]: ', msg);
  sendMsgToFe(msg);
});

