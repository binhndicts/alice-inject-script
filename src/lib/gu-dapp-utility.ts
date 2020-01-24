import * as TransactionUtils from './transaction/transaction-utils';
import * as Web3Utils from 'web3-utils';
import Web3 from 'web3';

export class GUDAppUtility {

  constructor(
    private _onShowPeersonalSignDialog: (rawTx) => Promise<boolean>,
    private _onshowConfirmDialog: (rawTx) => Promise<boolean>
  
  ) {
    // this._web3 = new Web3(_network.endpoint);

    this.sendTransaction = this.sendTransaction.bind(this);
    this.personalSign = this.personalSign.bind(this);
  }

  protected async sendTransaction(payload, networkId, networkUrl, privateKey) {
    const oldTx = payload.params[0];
    const web3 = new Web3(networkUrl);
    if ( oldTx.gas == undefined) {
      const gas = await TransactionUtils.estimateGas(networkUrl, {
        chainId: networkId,
        from: oldTx.from,
        to: oldTx.to,
        gasPrice: oldTx.gasPrice,
        value: oldTx.value,
        data: oldTx.data
      });
      oldTx.gas = web3.utils.toHex(gas);
    }
    if ( oldTx.gasPrice == undefined ) {
      oldTx.gasPrice = await TransactionUtils.estimateGasPrice(networkUrl);
    }
    if ( oldTx.value == undefined ) {
      oldTx.value = web3.utils.toHex(0);
    }

    const rawTx = {
      from: oldTx.from,
      to: oldTx.to,
      gas: oldTx.gas,
      gasPrice: oldTx.gasPrice,
      value: oldTx.value,
      data: oldTx.data
    }

    try {
      if ( await this._onshowConfirmDialog(rawTx) == true ) {
        let result = await TransactionUtils.sendSignedTransaction(networkUrl, privateKey, rawTx);
        return {
          "jsonrpc":"2.0",
          "id": payload.id,
          "result": result
        };
      } else {
        throw new Error("Signing request canceled.")
      }
    } catch ( err ) {
      throw new Error(err.message)
    }
  }

  protected async personalSign(payload, networkUrl, privateKey) {
    const dataToSign = payload.params[0];
    const address = payload.params[1];
    const message = Web3Utils.hexToUtf8(dataToSign);

    try {
      if ( await this._onShowPeersonalSignDialog(message) == true ) {
        let result =  await TransactionUtils.signPersonal(dataToSign, privateKey);
        return {
          "jsonrpc":"2.0",
          "id": payload.id,
          "result": result
        };
      } else {
        throw new Error("Sign-in request canceled.")
      }
    } catch ( err ) {
      throw new Error(err.message)
    }
  }

  public onShowPeersonalSignDialog( func : (rawTx) => Promise<boolean> ) {
    this._onShowPeersonalSignDialog = func;
  }

  public onshowConfirmDialog( func : (rawTx) => Promise<boolean> ) {
    this._onshowConfirmDialog = func;
  }
}
