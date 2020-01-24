import { DAppObjectBridge } from '../dapp-object-bridge';

describe('DAppObjectBridge tset', () => {

test('Injected web3 test', (done) => {
    let window: any = {};
    const bridge = new DAppObjectBridge();
    bridge.injectObject(window);
    expect(window.web3).not.toBeNull();

    bridge.onSendTransaction( (data, callback) => {
      expect(data.payload.params[0].from).toEqual('0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe');
      expect(data.payload.params[0].data).toEqual('hoge');     
      data.doOrigin = false;
      callback({
        "id":1,
        "jsonrpc":"2.0",
        "result":"0xb5c10ddb7...f6a6c332cd7fe06397ef59eb23a6f788cde"
      });
    });

    const web3: any = window.web3;

    web3.eth.sendTransaction({
      from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
      data: 'hoge' // deploying a contracrt
    }, function(error, hash){
      expect(error).toBeNull();
      expect(hash).toBe('0xb5c10ddb7...f6a6c332cd7fe06397ef59eb23a6f788cde');
      done();
    });
  })
});