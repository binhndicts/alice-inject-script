export declare class GUDAppUtility {
    constructor();
    sendTransaction(payload: any, networkId: any, networkUrl: any, privateKey: any, dialog: (rawTx: any) => Promise<boolean>): Promise<{
        "jsonrpc": string;
        "id": any;
        "result": unknown;
    }>;
    personalSign(payload: any, networkUrl: any, privateKey: any, dialog: (rawTx: any) => Promise<boolean>): Promise<{
        "jsonrpc": string;
        "id": any;
        "result": any;
    }>;
}
