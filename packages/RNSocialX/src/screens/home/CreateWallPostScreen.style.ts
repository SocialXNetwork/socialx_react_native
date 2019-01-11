import { StyleSheet } from 'react-native';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		backgroundColor: Colors.white,
		flex: 1,
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	addMediaButton: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
	},
	photoIcon: {
		width: Sizes.smartHorizontalScale(22),
		height: Sizes.smartHorizontalScale(22),
		marginRight: Sizes.smartHorizontalScale(8),
	},
	addMediaText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.paleSky,
	},
	mediaContainer: {
		marginTop: Sizes.smartVerticalScale(5),
		marginBottom: Sizes.smartVerticalScale(10),
		paddingHorizontal: '5%',
		width: '100%',
		height: Sizes.smartHorizontalScale(130),
	},
	buttonContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(30),
		marginTop: Sizes.smartVerticalScale(10),
	},
};

export const buttonWidth = Sizes.smartHorizontalScale(150);
export default StyleSheet.create(styles);
