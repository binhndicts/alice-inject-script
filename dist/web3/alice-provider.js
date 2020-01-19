"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
exports.EVENT_SENDSYNC = 'onSendAsync';
class AliceProvider {
    constructor() {
        this._registry = new Map();
    }
    register(id, func) {
        this._registry.set(id, func);
    }
    send(payload, callback) {
        this.sendAsync(payload, callback);
    }
    sendAsync(payload, callback) {
        let data = {
            payload: payload,
        };
        if (this._registry.has(exports.EVENT_SENDSYNC)) {
            const func = this._registry.get(exports.EVENT_SENDSYNC);
            if (func) {
                func(data).then(result => {
                    callback(null, result);
                });
            }
        }
        ;
    }
    onEthMessage(func) {
        this.register(exports.EVENT_SENDSYNC, func);
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
            });
        });
    }
}
exports.AliceProvider = AliceProvider;
//# sourceMappingURL=alice-provider.js.map