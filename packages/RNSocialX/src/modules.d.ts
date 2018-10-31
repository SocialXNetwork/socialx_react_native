declare module 'hex-rgb' {
	export default function(
		color: string,
	): { red: number; green: number; blue: number };
}

declare module 'react-native-swipeable';

declare module 'react-native-spinkit';

declare module 'react-native-android-keyboard-adjust';

declare module 'react-native-modal-dropdown';

declare module 'react-native-smart-splash-screen';

declare module 'react-native-svg-charts';

declare module 'react-native-app-intro-slider';

declare module 'react-native-country-picker-modal';

// declare module 'react-native-image-crop-picker';

// declare module 'react-native-image-resizer';

declare module 'react-native-mime-types';

// declare module 'native-base';

declare module '*.json' {
	const value: any;
	export default value;
}
declare module 'react-native-webview' {
	export const WebView: any;
}

declare module 'react-native-webview-bridge' {
	const WebViewBridge: any;
	export default WebViewBridge;
}

declare module 'webview-crypto' {
	export const MainWorker: any;
	export const webViewWorkerString: any;
}

declare module 'react-native-randombytes' {
	export const randomBytes: (size: number) => any;
}

declare module '@ptomasroos/react-native-multi-slider';
