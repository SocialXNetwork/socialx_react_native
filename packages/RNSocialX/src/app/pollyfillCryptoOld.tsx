import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';

import { randomBytes } from 'react-native-randombytes';
import { MainWorker, webViewWorkerString } from 'webview-crypto';

import webcrp from '@trust/webcrypto';
import { OS_TYPES } from '../environment/consts';

const injectString =
	webViewWorkerString +
	`
(function () {
  var wvw = new WebViewWorker(WebViewBridge.send.bind(WebViewBridge));
  WebViewBridge.onMessage = wvw.onMainMessage.bind(wvw);
}());
`;

// TODO: replace this with a better polly or even better, find a better solution
export default class PolyfillCrypto extends React.Component<
	{ debug: boolean },
	{}
> {
	public static defaultProps: { debug: boolean } = {
		debug: false,
	};
	shouldComponentUpdate() {
		return false;
	}

	render() {
		let worker: typeof MainWorker;
		const uri = 'file:///android_asset/html/pollyfillCrypto.html';
		return (
			<View style={styles.hidden}>
				<WebViewBridge
					ref={(c: any) => {
						if (c && !worker) {
							worker = new MainWorker(c.sendToBridge, this.props.debug);
							// @ts-ignore
							// if (window.crypto) {
							// 	// we are in chrome debugger
							// 	// this means overridng the crypto object itself won't
							// 	// work, so we have to override all of it's methods
							// 	// @ts-ignore
							// 	// window.crypto.getRandomValues = (arg: Uint8Array) => {
							// 	// 	const original = arg;
							// 	// 	if (arg.byteLength !== arg.length) {
							// 	// 		arg = new Uint8Array(arg.buffer);
							// 	// 	}
							// 	// 	const bytes = randomBytes(arg.length);
							// 	// 	for (let i = 0; i < bytes.length; i++) {
							// 	// 		arg[i] = bytes[i];
							// 	// 	}
							// 	// 	return original;
							// 	// };
							// 	// tslint:disable-next-line
							// 	for (const name in worker.crypto.subtle) {
							// 		// @ts-ignore
							// 		window.crypto.subtle[name] = worker.crypto.subtle[name];
							// 	}
							// 	// @ts-ignore
							// 	(window.crypto as any).fake = true;
							// 	// @ts-ignore
							// 	console.log('*** poly', window.crypto);
							// } else {
							// 	// @ts-ignore
							// 	(window as any).crypto = worker.crypto;
							// }
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
					injectedJavaScript={injectString}
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
