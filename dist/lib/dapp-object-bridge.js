"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const web3_02_1 = tslib_1.__importDefault(require("web3-02"));
const alice_provider_1 = require("../web3/alice-provider");
const events_1 = require("events");
class DAppObjectBridge {
    constructor(_host, defaultAccount = '') {
        this._host = _host;
        this.defaultAccount = defaultAccount;
        this._emitter = new events_1.EventEmitter();
        this.eventMethodMap = {};
        this.onSendTransaction = (func) => {
            this.registerEthHander('eth_sendTransaction', 'onSendTransaction', func);
        };
        this.onPersonalSign = (func) => {
            this.registerEthHander('personal_sign', 'onPersonalSign', func);
        };
        this.onNetVersion = (func) => {
            this.registerEthHander('net_version', 'onNetVersion', func);
        };
        this.onGetTransactionByHash = (func) => {
            this.registerEthHander('eth_getTransactionByHash', 'onGetTransactionByHash', func);
        };
        this.registerEthHander = (methodName, eventName, func) => {
            this.eventMethodMap[methodName] = eventName;
            this._emitter.on(eventName, func);
        };
        this.injectObject = this.injectObject.bind(this);
        this.setDefaultAccount = this.setDefaultAccount.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onSendAsync = this.onSendAsync.bind(this);
    }
    injectObject(targetObject) {
        this._provider = new alice_provider_1.AliceProvider(this._host);
        this._web3 = new web3_02_1.default(this._provider);
        targetObject.web3 = this.web3;
        targetObject.ethereum = this._provider;
        if (this.defaultAccount != '') {
            this._web3.eth.defaultAccount = this.defaultAccount;
        }
        this._provider.onSendAsync(this.onSendAsync);
        console.log('Web3 injected');
    }
    get web3() {
        return this._web3;
    }
    setDefaultAccount(address) {
        this._web3.eth.defaultAccount = address;
    }
    onSend(data) {
        let result;
        const payload = data.payload;
        console.log('DAppObjectBridge : onSend:' + JSON.stringify(data));
        switch (payload.method) {
            case 'eth_accounts':
                result = this.defaultAccount ? [this.defaultAccount] : [];
                break;
            case 'eth_coinbase':
                result = this.defaultAccount ? [this.defaultAccount] : [];
                break;
            default:
                data.doOrigin = true;
                return;
        }
        return {
            id: payload.id,
            jsonrpc: payload.jsonrpc,
            result: result,
        };
    }
    onSendAsync(data, callback) {
        const payload = data.payload;
        console.log('onSendAsync : ' + JSON.stringify(payload));
        switch (payload.method) {
            case 'eth_accounts':
                const result = this.defaultAccount ? [this.defaultAccount] : [];
                callback({
                    id: payload.id,
                    jsonrpc: payload.jsonrpc,
                    result: result,
                });
                break;
            default:
                if (this.eventMethodMap[payload.method]) {
                    this._emitter.emit(this.eventMethodMap[payload.method], payload, (result) => {
                        callback(result);
                    });
                }
                else {
                    data.doOrigin = true;
                }
        }
    }
}
exports.DAppObjectBridge = DAppObjectBridge;
//# sourceMappingURL=dapp-object-bridge.js.map