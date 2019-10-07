import { AliceProvider } from './alice-provider';

const Web3 = require('./web3/0.2/web3/lib/web3.js');

declare let window;

const callbacks:object = {};

const provider = new AliceProvider();

provider.subscribeSend((data, callback) => {
  const payload = data.payload;

  data['timestamp'] = Date.now();

  window.alert('sendTransaction:' + JSON.stringify(data));

  callbacks[data.timestamp] = callback;
  window.ReactNativeWebView.postMessage(JSON.stringify(data));

  data.doOrigin = false;
});
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
