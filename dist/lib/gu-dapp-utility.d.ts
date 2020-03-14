export declare class GUDAppUtility {
    constructor();
    sendTransaction(payload: any, chainId: number, networkUrl: string, privateKey: string, dialog: (rawTx: any) => Promise<boolean>): Promise<"Signing request canceled." | {
        "jsonrpc": string;
        "id": any;
        "result": unknown;
    }>;
    personalSign(payload: any, privateKey: string, dialog: (rawTx: any) => Promise<boolean>): Promise<"Signing request canceled." | {
        "jsonrpc": string;
        "id": any;
        "result": any;
    }>;
}
