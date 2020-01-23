import { AliceProvider } from '../alice-provider';

describe('Web3BridgeForChrome tset', () => {

  test('Injected web3 test', (done) => {
    let window: any = {};
    const aliceProvider = new AliceProvider();
    aliceProvider.onSendAsync( (data, callback) => {
      expect(data.payload.from).toEqual('0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe');
      expect(data.payload.data).toEqual('hoge');
      data.doOrigin = false;
      callback('testresult');
    });

   aliceProvider.sendAsync({
      from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
      data: 'hoge' // deploying a contracrt
    }, function(error, hash){
      expect(hash).toEqual('testresult');
      done();
    });
  })

});