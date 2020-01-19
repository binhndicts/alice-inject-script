export const EVENT_SENDSYNC = 'onSendAsync';

export class AliceProvider {

  private _registry = new Map<string, (request) => Promise<any>>();
  private register(id: string, func: (request) => Promise<any>) {
    this._registry.set(id, func)
  }

  constructor() {
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
    if ( this._registry.has(EVENT_SENDSYNC) ) {
      const func = this._registry.get(EVENT_SENDSYNC);
      if ( func ) {
        func(data).then( result => {
          callback(null, result);
        });
      }
    };
  }

  // /**
  //  * Should be used to subscrive async request
  //  *
  //  * @method subscribeEthMessage
  //  * @param {Function} subscrive function
  //  */
  public onEthMessage(func: (data) => Promise<any> ) {
    this.register(EVENT_SENDSYNC, func);
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
      // this._emitter.emit(EVENT_SENDSYNC, data, (result) => {
      //   if ( result != undefined ) {
      //     const accounts = result.result;
      //     resolve(accounts);
      //   }
      //   reject('getAcco0unts failed');
      // });
    });
  }
}

// export default AliceProvider;
