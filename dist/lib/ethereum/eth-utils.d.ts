export default class EthereumUtils {
    host: string;
    web3: any;
    constructor(host: string, web3?: any);
    createAccount(): any;
    getAccountFromPrivateKey(privateKey: string): any;
    getDefaultAccount(): Promise<any>;
    getBalance(address?: string): Promise<any>;
    getTransactionCount(address?: string): Promise<any>;
}
