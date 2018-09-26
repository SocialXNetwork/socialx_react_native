import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	boxContainer: {
		maxWidth: 400,
		backgroundColor: Colors.blackWithAlpha(0.7),
		paddingVertical: Sizes.smartHorizontalScale(20),
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		borderRadius: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.white,
		paddingBottom: Sizes.smartHorizontalScale(20),
		textAlign: 'center',
	},
	message: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.white,
		paddingBottom: Sizes.smartHorizontalScale(20),
		textAlign: 'center',
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	activityIndicatorColor: Colors.pink,
};
