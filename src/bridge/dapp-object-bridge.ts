import Web3 from 'web3-02';
import { AliceProvider } from '../web3/alice-provider';
import { EventEmitter } from "events"

export class DAppObjectBridge {

  private _web3;
  private _provider;
  private _emitter  = new EventEmitter();

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

  public onSend(data, callback) {
    let result: any;
    const payload = data.payload;
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
    switch ( payload.method ) {
      case 'eth_sendTransaction':
        this._emitter.emit('onSendTransaction', data, (result) => {
          callback(result);
        });
        break;
      case 'personal_sign':
        this._emitter.emit('onPersonalSign', data, (result) => {
          callback(result);
        });
        break;
      case 'net_version':
        this._emitter.emit('onNetVersion', data, (result) => {
          callback(result);
        });
        break;
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
        // The payload is not target method which we should handle, so executre original httpprovider code
        data.doOrigin = true;       
    }
  }

  /**
   * Should be used to subscrive async request
   *
   * @method onSendAsync
   * @param {Function} subscrive function
   */
  onSendTransaction = (func : (data, callback) => void ) => {
    this._emitter.on("onSendTransaction", func);
  }

  onPersonalSign = (func : (data, callback) => void ) => {
    this._emitter.on("onPersonalSign", func);
  }

  onNetVersion = (func : (data, callback) => void ) => {
    this._emitter.on("onNetVersion", func);
  }
}
