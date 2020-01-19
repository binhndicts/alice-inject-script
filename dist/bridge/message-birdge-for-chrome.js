"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alice_provider_1 = require("../web3/alice-provider");
const Web3 = require('web3-02');
class Web3BridgeForChrome {
    constructor() {
        this._callbacks = {};
        this._provider = new alice_provider_1.AliceProvider();
        this.init = () => {
            this._provider.subscribeSendAsync((data, callback) => {
                data['timestamp'] = Date.now();
                this._callbacks[data.timestamp] = callback;
                window.ReactNativeWebView.postMessage(JSON.stringify(data));
            });
            window.ethereum = this._provider;
            window.web3 = new Web3(this._provider);
            window.alice = {
                callback: (response) => {
                    const result = JSON.parse(response);
                    if (this._callbacks[result.timestamp]) {
                        this._callbacks[result.timestamp](result.data);
                    }
                    delete this._callbacks[result.timestamp];
                }
            };
            console.log('ALICE: web3 injected.');
        };
    }
}
exports.Web3BridgeForChrome = Web3BridgeForChrome;
//# sourceMappingURL=message-birdge-for-chrome.js.map