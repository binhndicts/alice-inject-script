import mitt from 'mitt'
import { AliceProvider, EVENT_SENDSYNC } from '../web3/alice-provider';

declare let window;

const Web3 = require('web3-02');

export class DAppObjectBridge {

  private _emitter;  
  private _callbacks: object = {};
  private _provider = new AliceProvider();

  public static EVENT_ONETHMESSAGE = 'ON_ETH_MESSAGE';

  injectObject = (targetObject) => {
    targetObject.ethereum = this._provider;
    targetObject.web3 = new Web3(this._provider);

    this._provider.emmiter.on(EVENT_SENDSYNC, event => {
      this._emitter.emit(DAppObjectBridge.EVENT_ONETHMESSAGE, event);
    });
  }

  get emmiter() {
    return this.emmiter;
  }
}