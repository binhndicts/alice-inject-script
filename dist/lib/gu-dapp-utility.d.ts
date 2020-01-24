export declare class GUDAppUtility {
    private _onShowPeersonalSignDialog;
    private _onshowConfirmDialog;
    constructor(_onShowPeersonalSignDialog: (rawTx: any) => Promise<boolean>, _onshowConfirmDialog: (rawTx: any) => Promise<boolean>);
    protected sendTransaction(payload: any, networkId: any, networkUrl: any, privateKey: any): Promise<{
        "jsonrpc": string;
        "id": any;
        "result": unknown;
    }>;
    protected personalSign(payload: any, networkUrl: any, privateKey: any): Promise<{
        "jsonrpc": string;
        "id": any;
        "result": any;
    }>;
    onShowPeersonalSignDialog(func: (rawTx: any) => Promise<boolean>): void;
    onshowConfirmDialog(func: (rawTx: any) => Promise<boolean>): void;
}
