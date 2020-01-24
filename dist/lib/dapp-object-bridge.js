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
        this.onSendTransaction = (func) => {
            this._emitter.on("onSendTransaction", func);
        };
        this.onPersonalSign = (func) => {
            this._emitter.on("onPersonalSign", func);
        };
        this.onNetVersion = (func) => {
            this._emitter.on("onNetVersion", func);
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
    onSend(data, callback) {
        let result;
        const payload = data.payload;
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
        switch (payload.method) {
            case 'eth_sendTransaction':
                this._emitter.emit('onSendTransaction', data, (result) => {
                    callback(result);
                });
                break;
            case 'personal_sign':
                this._emitter.emit('onPersonalSign', data, (result) => {
                    callback(result);
                });
                break;
            case 'net_version':
                this._emitter.emit('onNetVersion', data, (result) => {
                    callback(result);
                });
                break;
            case 'eth_accounts':
                const result = this.defaultAccount ? [this.defaultAccount] : [];
                callback({
                    id: payload.id,
                    jsonrpc: payload.jsonrpc,
                    result: result,
                });
                break;
            default:
                data.doOrigin = true;
        }
    }
}
exports.DAppObjectBridge = DAppObjectBridge;
//# sourceMappingURL=dapp-object-bridge.js.map