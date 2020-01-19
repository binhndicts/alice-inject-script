export declare class AliceProvider {
    private _emitter;
    constructor();
    send(payload: any, callback: any): void;
    sendAsync(payload: any, callback: any): void;
    subscribeSendAsync(func: (data: any, callback: any) => void): void;
    enable(): Promise<string[]>;
    private getAccounts;
}
