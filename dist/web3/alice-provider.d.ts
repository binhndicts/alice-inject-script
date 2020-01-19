export declare const EVENT_SENDSYNC = "onSendAsync";
export declare class AliceProvider {
    private _emitter;
    constructor();
    get emmiter(): any;
    send(payload: any, callback: any): void;
    sendAsync(payload: any, callback: any): void;
    subscribeEthMessage(func: (data: any, callback: any) => void): void;
    enable(): Promise<string[]>;
    private getAccounts;
}
