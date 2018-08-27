import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {HelloFoo} from './app';

export default class App extends React.Component<{}> {
	public render() {
		return (
			<View style={styles.container}>
				<HelloFoo style={styles.placeholder} message={'SocialX'} />
			</View>
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
