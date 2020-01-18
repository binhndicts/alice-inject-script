import { AliceProvider } from '../web3/alice-provider';
import { MessageBridgeBase } from './message-bridge-base';

declare let window;

const Web3 = require('web3-02');

export class MessageBridgeForRN extends MessageBridgeBase {

  private _provider: any;
  private _callbacks: object = {};

  constructor() {
    super();
    this._provider = new AliceProvider();

    this.setupCallbacks = this.setupCallbacks.bind(this);
    this.injectWeb3Object = this.injectWeb3Object.bind(this);
    this.injectEtheremObject = this.injectEtheremObject.bind(this);
  }

  public init() {
    this.setupCallbacks();
    console.log('Alice : setupCallbacks');
   }

  public injectWeb3Object() {
    const provider = new AliceProvider();

    provider.subscribeSendAsync((data, callback) => {
      this.postMessage(data, callback);
    });

    window.web3 = new Web3(provider);
    console.log('Alice : web3 injected');
  }

  public injectEtheremObject() {
    window.ethereum = this._provider;

    console.log('Alice : window.ethereum injected');
  }

  private postMessage(data, callback) {
    data['timestamp'] = Date.now();

    window.alert('sendTransaction:' + JSON.stringify(data));

    this._callbacks[data.timestamp] = callback;
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }

  private setupCallbacks() {
    window.alice = {
      callback: (response) => {
        const result = JSON.parse(response);

        if (this._callbacks[result.timestamp]) {
          this._callbacks[result.timestamp](result.data);
        }

        delete this._callbacks[result.timestamp];
      }
    };
  }
}