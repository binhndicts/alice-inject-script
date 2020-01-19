import { AliceProvider, EVENT_SENDSYNC } from '../web3/alice-provider';

declare let window;

const Web3 = require('web3-02');

const EVENT_ONETHMESSAGE = 'ON_ETH_MESSAGE';

export class DAppObjectBridge {

  private _registry = new Map<string, (request) => Promise<any>>();
  private register(id: string, func: (request) => Promise<any>) {
    this._registry.set(id, func)
  }
  private _provider = new AliceProvider();

  init = (targetObject) => {
    targetObject.ethereum = this._provider;
    targetObject.web3 = new Web3(this._provider);
    

    this._provider.onEthMessage( (event) => {  
      return new Promise( (resolve, reject) => {
        if ( this._registry.has(EVENT_ONETHMESSAGE) ) {
          const func = this._registry.get(EVENT_ONETHMESSAGE);
          if ( func ) {
            func(event).then( result => {
              resolve(result);
            });
          } else {
            reject('func is not registered');
          }
        } else {
          reject('Handler is not registered');
        }
      });
      // return new Promise<void>( ( resolve, reject ) => {
      //   if ( this._registry.has(DAppObjectBridge.EVENT_ONETHMESSAGE) ) {
      //     const func = this._registry[DAppObjectBridge.EVENT_ONETHMESSAGE];
      //     func(event).then( result => {
      //       resolve(result);
      //     });
      //   }
      //   reject('Handler Not Registered');
      // });
    });
  }

  onEthMessage = (func: (data) => Promise<any> ) => {
    this.register(EVENT_ONETHMESSAGE, func);
  }
}