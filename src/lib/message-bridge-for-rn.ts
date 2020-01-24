import { AliceProvider } from '../web3/alice-provider';
declare let window;

const Web3 = require('web3-02');

export class Web3BridgeForReactNative {

  private _callbacks: object = {};
  private _provider = new AliceProvider();

  init = () => {
    // this._provider.subscribeEthMessage((data, callback) => {
    //   data['timestamp'] = Date.now();
    //   this._callbacks[data.timestamp] = callback;
    //   window.ReactNativeWebView.postMessage(JSON.stringify(data));
    // });

    // window.ethereum = this._provider;
    // window.web3 = new Web3(this._provider);

    // window.alice = {
    //   callback: (response) => {
    //     const result = JSON.parse(response);

    //     if (this._callbacks[result.timestamp]) {
    //       this._callbacks[result.timestamp](result.data);
    //     }

    //     delete this._callbacks[result.timestamp];
    //   }
    // };

    console.log('ALICE: web3 injected.');
  }
}