"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const web3_1 = tslib_1.__importDefault(require("web3"));
const ethUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');
function sendSignedTransaction(host, pkey, rawTx) {
    return new Promise((done, fail) => {
        const web3 = new web3_1.default(host);
        var account = web3.eth.accounts.privateKeyToAccount(pkey);
        account.signTransaction(rawTx).then((signed) => {
            if (signed.rawTransaction != undefined) {
                web3.eth.sendSignedTransaction(signed.rawTransaction, (err, txhash) => {
                    if (err) {
                        console.log(err);
                        fail(err);
                    }
                    else {
                        console.log('hash', txhash);
                        done(txhash);
                    }
                });
            }
        });
    });
}
exports.sendSignedTransaction = sendSignedTransaction;
;
function signPersonal(data, pkey) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const privKey = ethUtil.stripHexPrefix(pkey);
        const privKeyBuffer = new Buffer(privKey, 'hex');
        const sig = sigUtil.personalSign(privKeyBuffer, { data: data });
        return Promise.resolve(sig);
    });
}
exports.signPersonal = signPersonal;
function estimateGas(host, transactionConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const web3 = new web3_1.default(host);
        return web3.eth.estimateGas(transactionConfig);
    });
}
exports.estimateGas = estimateGas;
function estimateGasPrice(host) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const web3 = new web3_1.default(host);
        return new Promise((done, fail) => {
            web3.eth.getGasPrice(function (error, result) {
                const hexValue = web3.utils.numberToHex(result);
                done(hexValue);
            });
        });
    });
}
exports.estimateGasPrice = estimateGasPrice;
//# sourceMappingURL=transaction-utils.js.map