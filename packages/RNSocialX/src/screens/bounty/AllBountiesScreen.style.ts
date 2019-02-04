import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../environment/theme';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		height,
	},
	entries: {
		flex: 1,
	},
});

export const tabsStyles = {
	activeTintColor: Colors.pink,
	inactiveTintColor: Colors.background,
	indicatorStyle: {
		height: 1,
		backgroundColor: Colors.pink,
	},
	pressOpacity: 1,
	upperCaseLabel: false,
	labelStyle: {
		fontSize: 14,
		...Fonts.centuryGothic,
	},
	style: {
		backgroundColor: Colors.white,
	},
};
