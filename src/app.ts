import { Web3BridgeForReactNative } from './bridge/message-bridge-for-rn';
import { Web3BridgeForChrome } from './bridge/message-birdge-for-chrome';

declare let window;

if ( window.ReactNativeWebView ) {  
  // React Native 
  const web3Bridge = new Web3BridgeForReactNative();
  web3Bridge.init();
} else {
  const web3Bridge = new Web3BridgeForReactNative();
  web3Bridge.init();
}