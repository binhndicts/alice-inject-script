import mitt from 'mitt'
// let EventEmitter: mitt.Emitter = new mitt();

export const EVENT_SENDSYNC = 'onSendAsync';

export class AliceProvider {

  private _emitter;

  constructor() {
    this._emitter = mitt();
  }

  get emmiter() {
    return this.emmiter;
  }

  /**
   * @method send
   * @param {Object} payload
   * @param {Function} callback triggered on end with (err, result)
   */
  public send(payload, callback) {
    this.sendAsync(payload, callback);
  }

  /**
   * Should be used to make async request
   *
   * @method sendAsync
   * @param {Object} payload
   * @param {Function} callback triggered on end with (err, result)
   */
  public sendAsync(payload, callback) {
    let data = {
      payload: payload,
    };
    this._emitter.emit(EVENT_SENDSYNC, data, (result) => {
      callback(null, result);
    });
  }

  // /**
  //  * Should be used to subscrive async request
  //  *
  //  * @method subscribeEthMessage
  //  * @param {Function} subscrive function
  //  */
  public subscribeEthMessage(func: (data, callback) => void ) {
    this._emitter.on(EVENT_SENDSYNC, func);
  }

  //
  // The section is for ethereum object
  //

  /**
   * Enalbe dapp account
   */
  public async enable() {
    try {
      const accounts = await this.getAccounts();
      return accounts;
    } catch ( err ) {
      console.log(err);
      return [];
    }
  }

  private async getAccounts() {
    return new Promise<string[]>( (resolve, reject) => {
      const payload = {
        method: 'eth_accounts'
      };
      let data = {
        payload: payload,
        doOrigin : false
      };
      this._emitter.emit(EVENT_SENDSYNC, data, (result) => {
        if ( result != undefined ) {
          const accounts = result.result;
          resolve(accounts);
        }
        reject('getAcco0unts failed');
      });
    });
  }
}

// export default AliceProvider;
