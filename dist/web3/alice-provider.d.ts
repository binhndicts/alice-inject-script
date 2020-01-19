export declare const EVENT_SENDSYNC = "onSendAsync";
export declare class AliceProvider {
    private _registry;
    private register;
    constructor();
    send(payload: any, callback: any): void;
    sendAsync(payload: any, callback: any): void;
    onEthMessage(func: (data: any) => Promise<any>): void;
    enable(): Promise<string[]>;
    private getAccounts;
}
