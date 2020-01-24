import { Web3BridgeForReactNative } from './lib/message-bridge-for-rn';

declare let window;

if ( window.ReactNativeWebView ) {  
  // React Native 
  const web3Bridge = new Web3BridgeForReactNative();
  web3Bridge.init();
}