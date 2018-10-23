import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';

import { MainWorker, webViewWorkerString } from 'webview-crypto';

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
                            // tslint:disable
							worker = new MainWorker(c.sendToBridge, this.props.debug);
							// @ts-ignore
							(window as any).crypto = worker.crypto;

							for (const name in worker.crypto.subtle) {
								// @ts-ignore
								window.mkcrypto.subtle[name] = worker.crypto.subtle[name];
							}
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
					source={{ uri: Platform.OS === OS_TYPES.Android ? uri : 'about:blank' }}
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
