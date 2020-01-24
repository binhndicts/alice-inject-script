import Web3 from 'web3';
const LocalMessageDuplexStream = require('post-message-stream')

export default class EthereumUtils {

    constructor(
      public host: string,
      public web3: any = undefined)
    {
      if ( web3 == undefined ) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(host));
      }
    }

    public createAccount(): any {
      const account = this.web3.eth.accounts.create();
      console.log(account);
      return account;
    }

    public getAccountFromPrivateKey(privateKey: string): any {
        const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        console.log(account);
        return account;
    }

    public async getDefaultAccount() {
      return await this.web3.eth.defaultAccount;
    }

    public async getBalance(address?: string) {
      if ( address === undefined ) {
        address = await this.web3.eth.defaultAccount;
      }
      let balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, 'ether');
    }

    public async getTransactionCount(address?: string) {
      if ( address === undefined ) {
        address = await this.web3.eth.defaultAccount;
      }
      return await this.web3.eth.getTransactionCount(address);
    }
}
