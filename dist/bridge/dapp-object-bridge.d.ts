export declare class DAppObjectBridge {
    private _emitter;
    private _callbacks;
    private _provider;
    static EVENT_ONETHMESSAGE: string;
    injectObject: (targetObject: any) => void;
    get emmiter(): any;
}
