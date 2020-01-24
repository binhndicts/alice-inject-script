declare const HttpProvider: any;
export declare class AliceProvider extends HttpProvider {
    private _emitter;
    constructor(host?: string);
    send(payload: any): any;
    sendAsync(payload: any, callback: any): void;
    onSend: (targetFunction: (data: any, callback: any) => void) => void;
    onSendAsync: (targetFunction: (data: any, callback: any) => void) => void;
}
export {};
