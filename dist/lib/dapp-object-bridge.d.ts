export declare class DAppObjectBridge {
    _host?: string | undefined;
    defaultAccount: string;
    private _web3;
    private _provider;
    private _emitter;
    private eventMethodMap;
    constructor(_host?: string | undefined, defaultAccount?: string);
    injectObject(targetObject: any): void;
    get web3(): any;
    setDefaultAccount(address: any): void;
    onSend(data: any): {
        id: any;
        jsonrpc: any;
        result: any;
    } | undefined;
    onSendAsync(data: any, callback: any): void;
    onSendTransaction: (func: (data: any, callback: any) => void) => void;
    onPersonalSign: (func: (data: any, callback: any) => void) => void;
    onNetVersion: (func: (data: any, callback: any) => void) => void;
    onGetTransactionByHash: (func: (data: any, callback: any) => void) => void;
    onGetBalance: (func: (data: any, callback: any) => void) => void;
    private registerEthHander;
}
