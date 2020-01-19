import PostMessageStream from 'post-message-stream';

declare let window;

export type PostMessageRequest = {
  id: string,
  message: any;
};

export type PostMessageResponse = {
  error: boolean;
  message: any;
};

export class PostMessageChannel {

  private _listenereStream = new PostMessageStream({
    name: 'inpage_listener',
    target: 'page_commander',
  });

  public async postMessage<T>(id: string, message: any): Promise<T> {
    return new Promise((done, fail) => {
      const request: PostMessageRequest = {
        id: id,
        message: message
      };

      let win: any = window;
      win.alert('postme : ' + message);
      win.ReactNativeWebView.postMessage(JSON.stringify(request));

      window.addEventListener('message', (res: any) => {
      // this._listenereStream.on('data', (response :PostMessageResponse ) => {
        window.alert('addEventListener:' + res);
        const response = JSON.parse(res);
        if (response.error) {
          fail(response.message);
        }
        done(response.message);
      });
    });
  }
}
