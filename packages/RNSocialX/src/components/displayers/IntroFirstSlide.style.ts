import { StyleSheet } from 'react-native';

import { Colors, Fonts, Images, Sizes } from '../../environment/theme';

const style: any = {
	container: {
		flex: 1,
		alignItems: 'center',
	},
	logoImage: {
		marginBottom: Sizes.smartVerticalScale(50),
	},
	slideImage: {
		width: Sizes.smartHorizontalScale(323),
		height: Sizes.smartHorizontalScale(242),
	},
	textContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	slideTitle: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(42),
		color: Colors.white,
		textAlign: 'center',
		paddingVertical: Sizes.smartVerticalScale(20),
	},
	slideDescription: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(18),
		color: Colors.white,
		textAlign: 'center',
		paddingTop: Sizes.smartVerticalScale(10),
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	slideBackgroundImage: Images.IntroWalkThrough1,
	slideLogoImage: Images.IntroWalkThrough1Logo,
};
