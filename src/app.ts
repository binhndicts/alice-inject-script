// import { MessageBridgeForRN } from './bridge/message-bridge-for-rn';

// function initAliceForRN() {
//   const bridge = new MessageBridgeForRN();
//   bridge.init();
//   bridge.injectWeb3Object();
//   bridge.injectEtheremObject();
// }

// initAliceForRN();

import { AliceProvider } from './web3/alice-provider';

const Web3 = require('web3-02');

declare let window;

const callbacks:object = {};

const provider = new AliceProvider();

provider.subscribeSendAsync((data, callback) => {
  const payload = data.payload;

  data['timestamp'] = Date.now();

  callbacks[data.timestamp] = callback;
  window.ReactNativeWebView.postMessage(JSON.stringify(data));

  data.doOrigin = false;
});

window.ethereum = provider;
window.web3 = new Web3(provider);

window.alice = {
  callback: (response) => {
    const result = JSON.parse(response);

    if (callbacks[result.timestamp]) {
      callbacks[result.timestamp](result.data);
    }

    delete callbacks[result.timestamp];
  }
};
