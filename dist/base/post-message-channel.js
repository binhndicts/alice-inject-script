"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const post_message_stream_1 = tslib_1.__importDefault(require("post-message-stream"));
class PostMessageChannel {
    constructor() {
        this._listenereStream = new post_message_stream_1.default({
            name: 'inpage_listener',
            target: 'page_commander',
        });
    }
    postMessage(id, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((done, fail) => {
                const request = {
                    id: id,
                    message: message
                };
                let win = window;
                win.alert('postme : ' + message);
                win.ReactNativeWebView.postMessage(JSON.stringify(request));
                window.addEventListener('message', (res) => {
                    window.alert('addEventListener:' + res);
                    const response = JSON.parse(res);
                    if (response.error) {
                        fail(response.message);
                    }
                    done(response.message);
                });
            });
        });
    }
}
exports.PostMessageChannel = PostMessageChannel;
//# sourceMappingURL=post-message-channel.js.map