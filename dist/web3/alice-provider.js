"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EventEmitter = require('events').EventEmitter;
class AliceProvider {
    constructor() {
        this._emitter = new EventEmitter();
    }
    send(payload, callback) {
        this.sendAsync(payload, callback);
    }
    sendAsync(payload, callback) {
        let data = {
            payload: payload,
        };
        this._emitter.emit('onSendAsync', data, (result) => {
            callback(null, result);
        });
    }
    subscribeSendAsync(func) {
        this._emitter.on('onSendAsync', func);
    }
    enable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield this.getAccounts();
                return accounts;
            }
            catch (err) {
                console.log(err);
                return [];
            }
        });
    }
    getAccounts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const payload = {
                    method: 'eth_accounts'
                };
                let data = {
                    payload: payload,
                    doOrigin: false
                };
                this._emitter.emit('onSendAsync', data, (result) => {
                    if (result != undefined) {
                        const accounts = result.result;
                        resolve(accounts);
                    }
                    reject('getAcco0unts failed');
                });
            });
        });
    }
}
exports.AliceProvider = AliceProvider;
//# sourceMappingURL=alice-provider.js.map