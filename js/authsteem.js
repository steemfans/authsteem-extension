/* This file is inserted into content page to communicate transport js. */
const TO_TRANSPORT_MSG_TAG = 'transport';
const FROM_TRANSPORT_MSG_TAG = 'authsteem_transport';
const authsteem = {
  extension_id: null,
  current_id: 1,
  callbacks: {},
  dispatch: function(data, callback) {
    this.callbacks[this.current_id] = callback;
    data = Object.assign(
      {
        request_id: this.current_id
      },
      data
    );
    document.dispatchEvent(
      new CustomEvent(TO_TRANSPORT_MSG_TAG, {
        detail: data,
      })
    );
    this.current_id++;
  },
  testRequest: function() {
    this.dispatch({
      command: 'testRequest',
      data: 'test',
    }, function(res) {
      console.log('[fe got message from transport]: ', res);
    });
  },
};

// receive response from transport
window.addEventListener(
  "message",
  function(event) {
    if (event.source != window) return;
    if (!event.data) return;
    if (event.data.type !== FROM_TRANSPORT_MSG_TAG) return;
    if (!event.data.response) return;
    /* all checks finish */
    const res = event.data.response;
    if (res.request_id && authsteem.callbacks[res.request_id]) {
      authsteem.callbacks[res.request_id](res);
      delete authsteem.callbacks[res.request_id];
    }
  },
  false
);
