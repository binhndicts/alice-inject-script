"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alice_provider_1 = require("../web3/alice-provider");
const Web3 = require('web3-02');
class Web3BridgeForReactNative {
    constructor() {
        this._callbacks = {};
        this._provider = new alice_provider_1.AliceProvider();
        this.init = () => {
            console.log('ALICE: web3 injected.');
        };
    }
}
exports.Web3BridgeForReactNative = Web3BridgeForReactNative;
//# sourceMappingURL=message-bridge-for-rn.js.map