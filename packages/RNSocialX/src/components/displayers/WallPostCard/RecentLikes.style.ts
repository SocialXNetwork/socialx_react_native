import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const styles: any = {
	recentLikesContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		flexDirection: 'row',
		marginTop: Sizes.smartVerticalScale(5),
		marginBottom: Sizes.smartVerticalScale(5),
	},
	likedText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.cloudBurst,
	},
	likeTextBold: {
		...Fonts.centuryGothicBold,
		color: Colors.cloudBurst,
	},
};

export default StyleSheet.create(styles);
