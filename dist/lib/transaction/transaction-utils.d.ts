import { TransactionConfig } from 'web3-core';
export declare function sendSignedTransaction(host: any, pkey: any, rawTx: any): Promise<unknown>;
export declare function signPersonal(data: any, pkey: any): Promise<any>;
export declare function estimateGas(host: any, transactionConfig: TransactionConfig): Promise<number>;
export declare function estimateGasPrice(host: any): Promise<unknown>;
