"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TransactionUtils = tslib_1.__importStar(require("./transaction/transaction-utils"));
const Web3Utils = tslib_1.__importStar(require("web3-utils"));
const web3_1 = tslib_1.__importDefault(require("web3"));
class GUDAppUtility {
    constructor() {
        this.sendTransaction = this.sendTransaction.bind(this);
        this.personalSign = this.personalSign.bind(this);
    }
    sendTransaction(payload, chainId, networkUrl, privateKey, dialog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldTx = payload.params[0];
            const web3 = new web3_1.default(networkUrl);
            if (oldTx.gas == undefined) {
                const gas = yield TransactionUtils.estimateGas(networkUrl, {
                    chainId: chainId,
                    from: oldTx.from,
                    to: oldTx.to,
                    gasPrice: oldTx.gasPrice,
                    value: oldTx.value,
                    data: oldTx.data
                });
                oldTx.gas = web3.utils.toHex(gas);
            }
            if (oldTx.gasPrice == undefined) {
                oldTx.gasPrice = yield TransactionUtils.estimateGasPrice(networkUrl);
            }
            if (oldTx.value == undefined) {
                oldTx.value = web3.utils.toHex(0);
            }
            const rawTx = {
                from: oldTx.from,
                to: oldTx.to,
                gas: oldTx.gas,
                gasPrice: oldTx.gasPrice,
                value: oldTx.value,
                data: oldTx.data
            };
            try {
                if ((yield dialog(rawTx)) == true) {
                    let result = yield TransactionUtils.sendSignedTransaction(networkUrl, privateKey, rawTx);
                    return {
                        "jsonrpc": "2.0",
                        "id": payload.id,
                        "result": result
                    };
                }
                else {
                    return "Signing request canceled.";
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    personalSign(payload, privateKey, dialog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dataToSign = payload.params[0];
            const message = Web3Utils.hexToUtf8(dataToSign);
            try {
                if ((yield dialog(message)) == true) {
                    let result = yield TransactionUtils.signPersonal(dataToSign, privateKey);
                    return {
                        "jsonrpc": "2.0",
                        "id": payload.id,
                        "result": result
                    };
                }
                else {
                    return "Signing request canceled.";
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
}
exports.GUDAppUtility = GUDAppUtility;
//# sourceMappingURL=gu-dapp-utility.js.map