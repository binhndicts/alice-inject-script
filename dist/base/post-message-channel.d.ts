export declare type PostMessageRequest = {
    id: string;
    message: any;
};
export declare type PostMessageResponse = {
    error: boolean;
    message: any;
};
export declare class PostMessageChannel {
    private _listenereStream;
    postMessage<T>(id: string, message: any): Promise<T>;
}
