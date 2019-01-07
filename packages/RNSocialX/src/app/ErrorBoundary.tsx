import * as React from 'react';
import { Linking, StatusBar, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { PrimaryButton } from '../components';
import { Colors, Fonts, Sizes } from '../environment/theme';

const url = 'https://github.com/SocialXNetwork/socialx_react_native/issues';

export default class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
	state = { hasError: false };

	public componentDidCatch() {
		StatusBar.setBarStyle('dark-content');
		this.setState({ hasError: true });
	}

	public render() {
		if (this.state.hasError) {
			return (
				<View style={styles.container}>
					<Icon name="ios-warning" style={styles.icon} />
					<Text style={styles.header}>Something went wrong</Text>
					<Text style={styles.text}>
						Please create a detailed report of what you were doing on our GitHub page
					</Text>
					<PrimaryButton label="Report" width="60%" onPress={() => Linking.openURL(url)} />
				</View>
			);
		}

		return this.props.children;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white,
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(50),
		color: Colors.cloudBurst,
		marginBottom: Sizes.smartVerticalScale(5),
	},
	header: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(25),
		marginBottom: Sizes.smartVerticalScale(5),
	},
	text: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(18),
		textAlign: 'center',
		marginBottom: Sizes.smartVerticalScale(10),
	},
} as any);
