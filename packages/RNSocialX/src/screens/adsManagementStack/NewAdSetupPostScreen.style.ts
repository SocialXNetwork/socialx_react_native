import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const SCREEN_HORIZONTAL_PADDING = Sizes.smartHorizontalScale(24);

const style: any = {
	rootView: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	headerText: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(15),
		paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	screenContent: {
		borderTopWidth: Sizes.smartVerticalScale(2),
		borderTopColor: Colors.dustWhite,
		paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	descriptionView: {
		marginTop: Sizes.smartVerticalScale(40),
		marginBottom: Sizes.smartVerticalScale(20),
		maxHeight: Sizes.smartVerticalScale(120),
	},
	errorText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartHorizontalScale(16),
		color: Colors.monza,
		paddingVertical: Sizes.smartVerticalScale(3),
	},
	addMediaButtonContainer: {
		width: '100%',
		alignItems: 'center',
	},
	addMediaButton: {
		flexDirection: 'row',
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartHorizontalScale(10),
		alignItems: 'center',
	},
	photoIcon: {
		fontSize: Sizes.smartHorizontalScale(30),
		color: Colors.postText,
	},
	addMediaText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		marginLeft: Sizes.smartHorizontalScale(10),
		color: Colors.postFullName,
	},
	mediaContainer: {
		marginTop: Sizes.smartVerticalScale(5),
		marginBottom: Sizes.smartVerticalScale(10),
		width: '100%',
		height: Sizes.smartHorizontalScale(180),
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	inputBorderWidth: Sizes.smartHorizontalScale(1),
	inputBorderColor: Colors.dustWhite,
};
