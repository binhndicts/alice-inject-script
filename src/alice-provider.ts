const EventEmitter = require('events').EventEmitter;

export class AliceProvider {

  private _emitter;

  constructor() {
    this._emitter = new EventEmitter();
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
      doOrigin : true
    };
    this._emitter.emit('onSendAsync', data, (result) => {
      callback(null, result);
    });
  }

  /**
   * Should be used to subscrive async request
   *
   * @method subscribeSendAsync
   * @param {Function} subscrive function
   */
  public subscribeSendAsync(func: (data, callback) => void ) {
    this._emitter.on('onSendAsync', func);
  }

  /**
   * Should be used to subscrive async request
   *
   * @method subscribeSendAsync
   * @param {Function} subscrive function
   */
  public subscribeSend(func: (data, callback) => void ) {
    this._emitter.on('onSend', func);
  }

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
      this._emitter.emit('onSendAsync', data, (result) => {
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
