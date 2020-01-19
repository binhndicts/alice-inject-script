export declare class DAppObjectBridge {
    private _registry;
    private register;
    private _provider;
    init: (targetObject: any) => void;
    onEthMessage: (func: (data: any) => Promise<any>) => void;
}
