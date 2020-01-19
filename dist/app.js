"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_bridge_for_rn_1 = require("./bridge/message-bridge-for-rn");
if (window.ReactNativeWebView) {
    const web3Bridge = new message_bridge_for_rn_1.Web3BridgeForReactNative();
    web3Bridge.init();
}
//# sourceMappingURL=app.js.map