import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../environment/theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.pink,
	},
	scrollContainer: {
		width: '100%',
		backgroundColor: Colors.white,
	},
	aboutMeContainer: {
		width: '100%',
		borderTopColor: Colors.dustWhite,
		borderTopWidth: Sizes.smartVerticalScale(1),
		paddingTop: Sizes.smartVerticalScale(20),
		paddingLeft: Sizes.smartHorizontalScale(17),
		paddingRight: Sizes.smartHorizontalScale(28),
	},
	aboutMeTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		paddingBottom: Sizes.smartVerticalScale(23),
	},
	aboutMeText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(23),
		color: Colors.postText,
	},
	recentPostsTitle: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postFullName,
		paddingTop: Sizes.smartVerticalScale(23),
		paddingBottom: Sizes.smartVerticalScale(27),
		paddingLeft: Sizes.smartHorizontalScale(17),
	},
	wallPostContainer: {
		paddingBottom: Sizes.smartVerticalScale(25),
	},
	contentContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	postsContainer: {
		width: '100%',
	},
	gridContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		minHeight: 1,
		width: '100%',
	},
	whiteBottomView: {
		position: 'absolute',
		backgroundColor: Colors.white,
		width: '100%',
		height: SCREEN_HEIGHT / 2,
		bottom: 0,
	},
};

export default StyleSheet.create(styles);
export const colors = {
	white: Colors.white,
};
