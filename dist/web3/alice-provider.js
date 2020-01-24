"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpProvider = require('web3-02/lib/web3/httpprovider');
const events_1 = require("events");
class AliceProvider extends HttpProvider {
    constructor(host) {
        super(host);
        this._emitter = new events_1.EventEmitter();
        this.onSend = (targetFunction) => {
            this._emitter.on("onSend", targetFunction);
        };
        this.onSendAsync = (targetFunction) => {
            this._emitter.on("onSendAsync", targetFunction);
        };
    }
    send(payload, callback) {
        if (callback != undefined) {
            return this.sendAsync(payload, callback);
        }
        console.log('AliceProvider : send payload:' + JSON.stringify(payload));
        let data = {
            payload: payload,
            doOrigin: false
        };
        this._emitter.emit('onSend', data, (result) => {
            console.log('AliceProvider : onSend:' + JSON.stringify(payload));
            return;
        });
        if (data.doOrigin) {
            console.log('AliceProvider : send payload by Original:' + JSON.stringify(payload));
            var request = this.prepareRequest(false);
            try {
                request.send(JSON.stringify(payload));
            }
            catch (error) {
            }
            var result = request.responseText;
            try {
                result = JSON.parse(result);
            }
            catch (e) {
            }
            return result;
        }
    }
    ;
    sendAsync(payload, callback) {
        console.log('SendAsync payload:' + JSON.stringify(payload));
        let data = {
            payload: payload,
            doOrigin: false
        };
        console.log('onSendAsync : ' + JSON.stringify(payload));
        this._emitter.emit('onSendAsync', data, (result) => {
            console.log('onSendAsync callback : ' + JSON.stringify(result));
            callback(null, result);
        });
        if (data.doOrigin) {
            console.log('sendAsyncOriginal : ' + JSON.stringify(payload));
            super.sendAsync(payload, callback);
        }
    }
    ;
}
exports.AliceProvider = AliceProvider;
//# sourceMappingURL=alice-provider.js.map