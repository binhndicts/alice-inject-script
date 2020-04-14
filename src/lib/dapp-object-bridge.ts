import Web3 from 'web3-02';
import { AliceProvider } from '../web3/alice-provider';
import { EventEmitter } from "events"

const ALICE_DEFAULT_METHOD_HANDLER = 'ALICE_DEFAULT_METHOD_HANDLER';
export class DAppObjectBridge {

  private _web3;
  private _provider;
  private _emitter  = new EventEmitter();

  private eventMethodMap: {[ethMethod: string]: string} = {};

  constructor(
    public _host?: string,
    public defaultAccount: string = ''
  ) {
    // this binding
    this.injectObject = this.injectObject.bind(this);
    this.setDefaultAccount = this.setDefaultAccount.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onSendAsync = this.onSendAsync.bind(this);

  }

  public injectObject(targetObject) {
    this._provider = new AliceProvider(this._host);
    this._web3 = new Web3(this._provider);
    targetObject.web3 = this.web3;
    targetObject.ethereum = this._provider;

    if ( this.defaultAccount != '') {
      this._web3.eth.defaultAccount = this.defaultAccount;
    }
    this._provider.onSendAsync(this.onSendAsync);
    console.log('Web3 injected');
  }

  public get web3() {
    return this._web3;
  }

  public setDefaultAccount(address) {
    this._web3.eth.defaultAccount = address;
  }

  public onSend(data) {
    let result: any;
    const payload = data.payload;
    console.log('DAppObjectBridge : onSend:' + JSON.stringify(data));
    switch ( payload.method ) {
      case 'eth_accounts':
        result = this.defaultAccount ? [this.defaultAccount] : []
        // need to stop execution after eventemitter
        break;
      case 'eth_coinbase':
        result = this.defaultAccount ? [this.defaultAccount] : []
        // need to stop execution after eventemitter
        break;
      // case 'eth_uninstallFilter':
      //   this.sendAyncTransaction(payload, () => {});
      //   result = true
      //   break
      // case 'net_version':
      //   const networkVersion =
      //   result = networkVersion || null
      //   break
      default:
        // The payload is not target method which we should handle, so executre original httpprovider code
        data.doOrigin = true;    
        return;   
    }

    // return the result
    return {
      id: payload.id,
      jsonrpc: payload.jsonrpc,
      result: result,
    }
  }

  public onSendAsync(data, callback) {
    const payload = data.payload;
    console.log('onSendAsync : ' + JSON.stringify(payload));
    switch ( payload.method ) {
      // case 'eth_sendTransaction':
      //   this._emitter.emit('onSendTransaction', payload, (result) => {
      //     callback(result);
      //   });
      //   break;
      // case 'personal_sign':
      //   this._emitter.emit('onPersonalSign', payload, (result) => {
      //     callback(result);
      //   });
      //   break;
      // case 'net_version':
      //   console.log('onSendAsync : net_version' + JSON.stringify(data));
      //   this._emitter.emit('onNetVersion', payload, (result) => {
      //     callback(result);
      //   });
      //   break;
      case 'eth_accounts':
        const result = this.defaultAccount ? [this.defaultAccount] : []
        // need to stop execution after eventemitter
        callback({
          id: payload.id,
          jsonrpc: payload.jsonrpc,
          result: result,
        });
        break;
      default:
        if (this.eventMethodMap[payload.method]) {
          this._emitter.emit(this.eventMethodMap[payload.method], payload, (result) => {
            callback(result);
          });
        } else if (this.eventMethodMap[ALICE_DEFAULT_METHOD_HANDLER]) {
          this._emitter.emit(this.eventMethodMap[ALICE_DEFAULT_METHOD_HANDLER], payload, (result) => {
            callback(result);
          });
        } else {
          // The payload is not target method which we should handle, so executre original httpprovider code
          data.doOrigin = true;
        }
    }
  }

  /**
   * Should be used to subscrive async request
   *
   * @method onSendAsync
   * @param {Function} subscrive function
   */
  onSendTransaction = (func : (data, callback) => void ) => {
    this.registerEthHander('eth_sendTransaction', 'onSendTransaction', func);
  }

  onPersonalSign = (func : (data, callback) => void ) => {
    this.registerEthHander('personal_sign', 'onPersonalSign', func);
  }

  onNetVersion = (func : (data, callback) => void ) => {
    this.registerEthHander('net_version', 'onNetVersion', func);
  }

  onGetTransactionByHash = (func : (data, callback) => void ) => {
    this.registerEthHander('eth_getTransactionByHash', 'onGetTransactionByHash', func);
  }

  onGetBalance = (func : (data, callback) => void ) => {
    this.registerEthHander('eth_getBalance', 'onGetBalance', func);
  }

  // For iOS only to handle unknown methods
  onDoOrigin = (func : (data, callback) => void ) => {
    this.registerEthHander(ALICE_DEFAULT_METHOD_HANDLER, 'onDoOrigin', func);
  }

  private registerEthHander = (methodName: string, eventName: string, func: (data, callback) => void) => {
    this.eventMethodMap[methodName] = eventName;
    this._emitter.on(eventName, func);
  }
}
