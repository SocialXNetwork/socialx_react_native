import encodeUtf8 from 'encode-utf8';
import encodeBase64 from 'fast-base64-encode';
import React from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { MainWorker, webViewWorkerString } from 'webview-crypto';

const base64EncodeString = (input: string) => {
	return encodeBase64(new Uint8Array(encodeUtf8(input)));
};

const styles = StyleSheet.create({
	hidden: {
		height: 0,
		opacity: 0,
	},
});

const internalLibrary = `
(function () {
  function postMessage (message) {
    if (window.postMessage.length !== 1) {
      setTimeout(postMessage, 200, message)
    } else {
      window.postMessage(JSON.stringify(message))
    }
  }

  var wvw = new WebViewWorker(postMessage)
  window.document.addEventListener('message', (e) => wvw.onMainMessage(e.data))
}())
`;

let resolveWorker: any;
const workerPromise = new Promise((resolve) => {
	resolveWorker = resolve;
});

const sendToWorker = (message: string) => {
	console.warn(message);
	workerPromise.then((worker: any) => worker.onWebViewMessage(message));
};

const subtle = {
	decrypt(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.decrypt(...args),
		);
	},
	deriveKey(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.deriveKey(...args),
		);
	},
	digest(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.digest(...args),
		);
	},
	encrypt(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.encrypt(...args),
		);
	},
	exportKey(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.exportKey(...args),
		);
	},
	generateKey(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.generateKey(...args),
		);
	},
	importKey(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.importKey(...args),
		);
	},
	sign(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.sign(...args),
		);
	},
	unwrapKey(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.unwrapKey(...args),
		);
	},
	verify(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.verify(...args),
		);
	},
	wrapKey(...args: any[]) {
		return workerPromise.then((worker: any) =>
			worker.crypto.subtle.wrapKey(...args),
		);
	},
};

export default class PolyfillCrypto extends React.Component<{}> {
	webViewRef: any;
	constructor(props: any) {
		super(props);
		this.webViewRef = React.createRef();
	}

	shouldComponentUpdate() {
		return false;
	}

	componentDidMount() {
		const webView = this.webViewRef.current;

		console.warn('CREATING MAIN WORKER');

		resolveWorker(
			new MainWorker((msg: string) => {
				console.warn(msg);
				webView.postMessage(msg);
			}),
		);
	}

	render() {
		// The uri 'about:blank' doesn't have access to crypto.subtle
		const uri = 'file:///android_asset/html/pollyfillCrypto.html';

		// Base64 dance is to work around https://github.com/facebook/react-native/issues/20365
		const code = `((function () {${webViewWorkerString};${internalLibrary}})())`;
		const injectString = `eval(window.atob('${base64EncodeString(code)}'))`;

		return (
			<WebView
				style={styles.hidden}
				injectedJavaScript={injectString}
				javaScriptEnabled={true}
				onError={(a) => console.error(a)}
				onMessage={(ev) => sendToWorker(ev.nativeEvent.data)}
				ref={this.webViewRef}
				source={{ uri }}
			/>
		);
	}
}
// @ts-ignore
window.polynewcrypto = { subtle };
