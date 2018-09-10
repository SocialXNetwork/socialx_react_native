import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../environment/theme';

const style: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	commentsList: {
		flex: 1,
	},
	noCommentsContainer: {
		paddingTop: Sizes.smartVerticalScale(30),
		alignItems: 'center',
	},
	noCommentsText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.postText,
		paddingTop: Sizes.smartVerticalScale(20),
		textAlign: 'center',
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	commentWidthThreshold: Sizes.smartHorizontalScale(150),
	commentsLikeBottomStartPosition: Sizes.smartHorizontalScale(-18),
	commentsLikeBottomAdaptivePosition: Sizes.smartHorizontalScale(10),
	commentsLikeRightAdaptivePosition: Sizes.smartHorizontalScale(-30),
};
