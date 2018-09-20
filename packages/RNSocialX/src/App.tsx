/**
 * TODO list:
 * 1. Move splash screen to where proper screen is loaded after app is started.
 */

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';

import {HelloFoo} from './app/';
import {ManagedKeyboard} from './components/';
import {KeyboardContext} from './environment/consts';

export default class App extends React.Component<{}> {
	public componentDidMount(): void {
		SplashScreen.close({
			animationType: SplashScreen.animationType.fade,
			duration: 1000,
			delay: 100,
		});
	}

	public render() {
		return (
			<ManagedKeyboard>
				{(keyboardContextProps) => (
					<KeyboardContext.Provider value={keyboardContextProps}>
						<View style={styles.container}>
							<HelloFoo style={styles.placeholder} message={'SocialX'} />
						</View>
					</KeyboardContext.Provider>
				)}
			</ManagedKeyboard>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000',
	},
	placeholder: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#FFFFFF',
	},
});
