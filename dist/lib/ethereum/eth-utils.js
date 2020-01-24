"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const web3_1 = tslib_1.__importDefault(require("web3"));
const LocalMessageDuplexStream = require('post-message-stream');
class EthereumUtils {
    constructor(host, web3 = undefined) {
        this.host = host;
        this.web3 = web3;
        if (web3 == undefined) {
            this.web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(host));
        }
    }
    createAccount() {
        const account = this.web3.eth.accounts.create();
        console.log(account);
        return account;
    }
    getAccountFromPrivateKey(privateKey) {
        const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        console.log(account);
        return account;
    }
    getDefaultAccount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.web3.eth.defaultAccount;
        });
    }
    getBalance(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (address === undefined) {
                address = yield this.web3.eth.defaultAccount;
            }
            let balance = yield this.web3.eth.getBalance(address);
            return this.web3.utils.fromWei(balance, 'ether');
        });
    }
    getTransactionCount(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (address === undefined) {
                address = yield this.web3.eth.defaultAccount;
            }
            return yield this.web3.eth.getTransactionCount(address);
        });
    }
}
exports.EthereumUtils = EthereumUtils;
//# sourceMappingURL=eth-utils.js.map