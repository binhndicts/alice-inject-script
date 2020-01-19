"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alice_provider_1 = require("../web3/alice-provider");
const Web3 = require('web3-02');
class DAppObjectBridge {
    constructor() {
        this._registry = new Map();
        this._provider = new alice_provider_1.AliceProvider();
        this.init = (targetObject) => {
            targetObject.ethereum = this._provider;
            targetObject.web3 = new Web3(this._provider);
            this._provider.onEthMessage((event) => {
                return new Promise((resolve, reject) => {
                    if (this._registry.has(DAppObjectBridge.EVENT_ONETHMESSAGE)) {
                        const func = this._registry[DAppObjectBridge.EVENT_ONETHMESSAGE];
                        func(event).then(result => {
                            resolve(result);
                        });
                    }
                    reject('Handler Not Registered');
                });
            });
        };
        this.onEthMessage = (func) => {
            this.register(DAppObjectBridge.EVENT_ONETHMESSAGE, func);
        };
    }
    register(id, func) {
        this._registry.set(id, func);
    }
}
exports.DAppObjectBridge = DAppObjectBridge;
DAppObjectBridge.EVENT_ONETHMESSAGE = 'ON_ETH_MESSAGE';
//# sourceMappingURL=dapp-object-bridge.js.map