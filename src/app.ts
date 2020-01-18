import { MessageBridgeForRN } from './bridge/message-bridge-for-rn';

function initAliceForRN() {
  const bridge = new MessageBridgeForRN();
  bridge.init();
  bridge.injectWeb3Object();
  bridge.injectEtheremObject();
}

initAliceForRN();