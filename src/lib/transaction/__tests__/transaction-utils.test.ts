import * as TransactionUtils from '../transaction-utils';

test('estimateGas(mainnet)', async () => {
  const hostMainnet = 'https://mainnet.infura.io/v3/55868eab18114765a4e6ace5e6353599';
  const cryptKitty = {
    // chainId: "1",
    data: "0x454a2ab300000000000000000000000000000000000000000000000000000000000efc16",
    from: "0xe26882d66a3fd6b9a30184d1f4999365c5f62d4e",
    gasPrice: "0x3b9aca00",
    to: "0xb1690c08e213a35ed9bab7b318de14420fb57d8c",
    value: "0x553bd44b18332",
  };


  expect(await TransactionUtils.estimateGas(hostMainnet, cryptKitty)).not.toBeNull();
});

test('estimateGas(Rinkby)', async () => {

  const hostRinkby = 'https://rinkeby.infura.io/v3/55868eab18114765a4e6ace5e6353599';
  const yoshiTx = {
    // chainId: "4",
    data: "0xaf8adcb4000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001610000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016200000000000000000000000000000000000000000000000000000000000000",
    from: "0xe26882d66a3fd6b9a30184d1f4999365c5f62d4e",
    // gas: "0x493e0",
    gasPrice: "0x3b9aca00",
    to: "0x10adeb87e00eb7444ab800abe0af786cf2fabd17",
    value: "0x0",
  }

  expect(await TransactionUtils.estimateGas(hostRinkby, yoshiTx)).not.toBeNull();
});
