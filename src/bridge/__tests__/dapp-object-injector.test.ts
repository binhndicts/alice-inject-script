import { DAppObjectBridge } from '../dapp-object-bridge';

describe('Web3BridgeForChrome tset', () => {

  test('a', () => {
    const injector = new DAppObjectBridge();
    injector.emmiter.on(DAppObjectBridge.EVENT_ONETHMESSAGE, e => {

    });
  })

});