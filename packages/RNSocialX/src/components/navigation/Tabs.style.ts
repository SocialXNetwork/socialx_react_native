import { Dimensions, StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';
export const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headings: {
		width: '100%',
		height: Sizes.smartVerticalScale(50),
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.dustGray,
	},
	heading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		...Fonts.centuryGothic,
	},
	indicator: {
		height: Sizes.smartVerticalScale(1),
		backgroundColor: Colors.pink,
		top: -1,
	},
	children: {
		flex: 1,
		flexDirection: 'row',
	},
});
