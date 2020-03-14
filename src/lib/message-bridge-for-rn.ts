import { AliceProvider } from '../web3/alice-provider';
declare let window;

const Web3 = require('web3-02');

export class Web3BridgeForReactNative {

  private _callbacks: object = {};
  private _provider = new AliceProvider();

  init = () => {
    console.log('ALICE: web3 injected.');
  }
}