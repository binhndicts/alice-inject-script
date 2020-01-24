/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** @file httpprovider.js
 * @authors:
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 * @date 2015
 */

const HttpProvider = require('web3-02/lib/web3/httpprovider');

import { EventEmitter } from "events"

export class AliceProvider extends HttpProvider {

  private _emitter  = new EventEmitter();

  constructor(host?: string) {
    super(host);
  }

  /**
   * Override HttpProvider "send" function.
   * Should be called to make sync request
   *
   * @method send
   * @param {Object} payload
   * @return {Object} result
   */
  public send(payload, callback) {
    if ( callback != undefined ) {
      return this.sendAsync(payload, callback);
    }
    console.log('AliceProvider : send payload:' + JSON.stringify(payload));
    let data = {
      payload: payload,
      doOrigin : false
    };
    this._emitter.emit('onSend', data, (result) => {
      console.log('AliceProvider : onSend:' + JSON.stringify(payload));
      return;
    });
    if ( data.doOrigin ) {
      console.log('AliceProvider : send payload by Original:' + JSON.stringify(payload));
      var request = this.prepareRequest(false);

      try {
        request.send(JSON.stringify(payload));
      } catch (error) {
        // throw errors.InvalidConnection(this.host);
      }

      var result = request.responseText;

      try {
        result = JSON.parse(result);
      } catch (e) {
        // throw errors.InvalidResponse(request.responseText);
      }

      return result;
    }
  };

  /**
   * Should be used to make async request
   *
   * @method sendAsync
   * @param {Object} payload
   * @param {Function} callback triggered on end with (err, result)
   */
  public sendAsync(payload, callback) {
    console.log('SendAsync payload:' + JSON.stringify(payload));
    let data = {
      payload: payload,
      doOrigin : false
    };
    this._emitter.emit('onSendAsync', data, (result) => {
      console.log('onSendAsync callback : ' + JSON.stringify(result));
      callback(null, result);
    });

    if ( data.doOrigin ) {
      console.log('sendAsyncOriginal : ' + JSON.stringify(payload));
      super.sendAsync(payload, callback);
    }
  };

  /**
   * Should be used to subscrive async request
   *
   * @method subscribeSendAsync
   * @param {Function} subscrive function
   */
  onSend = (targetFunction : (data, callback) => void ) => {
    this._emitter.on("onSend", targetFunction);
  }

  /**
   * Should be used to subscrive async request
   *
   * @method subscribeSendAsync
   * @param {Function} subscrive function
   */
  onSendAsync = (targetFunction : (data, callback) => void ) => {
    this._emitter.on("onSendAsync", targetFunction);
  }

  //
  // Implimentation for window.ethereum
  //  
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
        reject('getAccounts failed');
      });
    });
  }
}

// export default AliceProvider;
