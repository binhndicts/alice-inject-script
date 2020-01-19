"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alice_provider_1 = require("../web3/alice-provider");
const Web3 = require('web3-02');
class DAppObjectBridge {
    constructor() {
        this._callbacks = {};
        this._provider = new alice_provider_1.AliceProvider();
        this.injectObject = (targetObject) => {
            targetObject.ethereum = this._provider;
            targetObject.web3 = new Web3(this._provider);
            this._provider.emmiter.on(alice_provider_1.EVENT_SENDSYNC, event => {
                this._emitter.emit(DAppObjectBridge.EVENT_ONETHMESSAGE, event);
            });
        };
    }
    get emmiter() {
        return this.emmiter;
    }
}
exports.DAppObjectBridge = DAppObjectBridge;
DAppObjectBridge.EVENT_ONETHMESSAGE = 'ON_ETH_MESSAGE';
//# sourceMappingURL=dapp-object-bridge.js.map