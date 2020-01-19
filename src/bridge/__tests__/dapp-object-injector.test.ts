import { DAppObjectBridge } from '../dapp-object-bridge';

describe('Web3BridgeForChrome tset', () => {

  test('Injected web3 test', (done) => {
    let window: any = {};
    const bridge = new DAppObjectBridge();
    // injector.hello();
    bridge.init(window);
    expect(window.web3).not.toBeNull();

    console.log(window.web3.version);

    bridge.onEthMessage( e => {
      return new Promise( (resolve, reject) => {
        console.log('onEthMessageCallback : ', e);
        console.log('params : ', JSON.stringify(e));
        expect(e.payload.params[0].from).toEqual('0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe');
        expect(e.payload.params[0].data).toEqual('hoge');      
        resolve('hoge');
      });
    })

    const web3: any = window.web3;

    web3.eth.sendTransaction({
      from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
      data: 'hoge' // deploying a contracrt
    }, function(error, hash){
      done();
    });
  })

});