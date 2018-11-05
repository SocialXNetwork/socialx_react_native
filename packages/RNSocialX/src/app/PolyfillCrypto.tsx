import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import WebViewBridge from 'react-native-webview-bridge';

import { MainWorker, webViewWorkerString } from '@socialx/webview-crypto';

import { OS_TYPES } from '../environment/consts';

import encodeUtf8 from 'encode-utf8';
import encodeBase64 from 'fast-base64-encode';

const base64EncodeString = (input: string) => {
	return encodeBase64(new Uint8Array(encodeUtf8(input)));
};

const internalLibIOS = `
${webViewWorkerString}
(function () {
  var wvw = new WebViewWorker(WebViewBridge.send.bind(WebViewBridge));
  WebViewBridge.onMessage = wvw.onMainMessage.bind(wvw);
}());
`;

const intermediateLib = `
${webViewWorkerString}
(function () {
  var wvw = new WebViewWorker(WebViewBridge.send.bind(WebViewBridge));
  WebViewBridge.onMessage = wvw.onMainMessage.bind(wvw);
}());
`;

const internalLibAndroid = `eval(window.atob('${base64EncodeString(intermediateLib)}'))`;

// TODO: replace this with a better polly or even better, find a better solution
export default class PolyfillCrypto extends React.Component<{ debug: boolean }, {}> {
	public static defaultProps: { debug: boolean } = {
		debug: false,
	};

	shouldComponentUpdate() {
		return false;
	}

	render() {
		let worker: MainWorker;
		const uri = 'file:///android_asset/html/blank.html';
		return (
			<View style={styles.hidden}>
				<WebViewBridge
					ref={(c: any) => {
						if (c && !worker) {
							worker = new MainWorker(c.sendToBridge, this.props.debug);

							// @ts-ignore
							if (window.crypto) {
								// we are in chrome debugger
								// this means overridng the crypto object itself won't
								// work, so we have to override all of it's methods
								// tslint:disable-next-line
								// for (const name in worker.crypto.subtle) {
								// 	// @ts-ignore
								// 	window.crypto.subtle[name] = worker.crypto.subtle[name];
								// }
								// @ts-ignore
								(window.crypto as any).fake = true;
								// @ts-ignore
							} else {
								// @ts-ignore
								(window as any).crypto = worker.crypto;
							}

							// @ts-ignore
							window.crypto.loaded = true;
							// @ts-ignore
							console.log('*** poly injected', window.crypto);
						}
					}}
					onBridgeMessage={
						// can't refer to this.state.onBridgeMessage directly
						// because it is not defined when this component is first
						// started, only set in `ref`
						(message: string) => {
							worker.onWebViewMessage(message);
						}
					}
					injectedJavaScript={
						Platform.OS === OS_TYPES.Android ? internalLibAndroid : internalLibIOS
					}
					onError={(error: string) => {
						console.warn('Error creating webview: ', error);
					}}
					javaScriptEnabled={true}
					source={{
						uri: Platform.OS === OS_TYPES.Android ? uri : 'about:blank',
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	hidden: {
		height: 0,
		opacity: 0,
	},
});
