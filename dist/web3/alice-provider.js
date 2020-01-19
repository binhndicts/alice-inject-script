"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mitt_1 = tslib_1.__importDefault(require("mitt"));
exports.EVENT_SENDSYNC = 'onSendAsync';
class AliceProvider {
    constructor() {
        this._emitter = mitt_1.default();
    }
    get emmiter() {
        return this.emmiter;
    }
    send(payload, callback) {
        this.sendAsync(payload, callback);
    }
    sendAsync(payload, callback) {
        let data = {
            payload: payload,
        };
        this._emitter.emit(exports.EVENT_SENDSYNC, data, (result) => {
            callback(null, result);
        });
    }
    subscribeEthMessage(func) {
        this._emitter.on(exports.EVENT_SENDSYNC, func);
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
                this._emitter.emit(exports.EVENT_SENDSYNC, data, (result) => {
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