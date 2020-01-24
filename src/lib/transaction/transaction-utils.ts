import Web3 from 'web3';
const ethUtil = require('ethereumjs-util')
import { TransactionConfig } from 'web3-core';
const sigUtil = require('eth-sig-util')

export function sendSignedTransaction(host, pkey, rawTx) {
  return new Promise((done, fail) => {
    const web3 = new Web3(host);
    var account = web3.eth.accounts.privateKeyToAccount(pkey);
      account.signTransaction(rawTx).then((signed) => {
        if ( signed.rawTransaction != undefined ) {
          web3.eth.sendSignedTransaction(signed.rawTransaction, (err, txhash) => {
            if (err) {
              console.log(err);
              fail(err)
            } else {
              console.log('hash', txhash);
              done(txhash)
            }
          });
        }
      });
  });
};

export async function signPersonal(data, pkey) {
  const privKey = ethUtil.stripHexPrefix(pkey)
  const privKeyBuffer = new Buffer(privKey, 'hex')
  const sig = sigUtil.personalSign(privKeyBuffer, { data: data })
  return Promise.resolve(sig)
}

export async function estimateGas(host, transactionConfig: TransactionConfig) {
  const web3 = new Web3(host);
  return web3.eth.estimateGas(transactionConfig);
}

export async function estimateGasPrice(host) {
  const web3 = new Web3(host);
  return new Promise((done, fail) => {
    web3.eth.getGasPrice(function(error, result) {
      const hexValue = web3.utils.numberToHex(result);
      done(hexValue);
    });
  });
}
