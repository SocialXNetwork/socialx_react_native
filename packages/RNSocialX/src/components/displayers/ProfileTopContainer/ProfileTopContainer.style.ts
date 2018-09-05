import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(100);
const AVATAR_CONTAINER_SIZE = Sizes.smartHorizontalScale(106);

const styles: any = {
	topContainer: {
		backgroundColor: Colors.white,
	},
	background: {
		backgroundColor: Colors.pink,
		width: '100%',
		height: Sizes.smartVerticalScale(75),
		marginBottom: Sizes.smartVerticalScale(30),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	avatarContainer: {
		width: AVATAR_CONTAINER_SIZE,
		height: AVATAR_CONTAINER_SIZE,
		position: 'absolute',
		alignSelf: 'center',
		top: Sizes.smartVerticalScale(25),
		borderRadius: AVATAR_CONTAINER_SIZE / 2,
		padding: 10,
		backgroundColor: Colors.white,
		borderColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	statisticsContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		transform: [{translateY: -Sizes.smartHorizontalScale(55)}],
	},
	leftStatistics: {
		flexDirection: 'row',
	},
	rightStatistics: {
		flexDirection: 'row',
	},
	textContainer: {
		transform: [{translateY: -Sizes.smartVerticalScale(10)}],
		marginBottom: Sizes.smartVerticalScale(5),
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	name: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.postFullName,
		textAlign: 'center',
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	username: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.pink,
		textAlign: 'center',
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	about: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.postText,
		textAlign: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		marginBottom: Sizes.smartVerticalScale(15),
	},
	button: {
		height: Sizes.smartVerticalScale(30),
		borderRadius: Sizes.smartHorizontalScale(4),
		backgroundColor: Colors.pink,
		marginHorizontal: Sizes.smartHorizontalScale(10),
	},
	ghostButton: {
		height: Sizes.smartVerticalScale(30),
		borderRadius: Sizes.smartHorizontalScale(4),
		backgroundColor: Colors.white,
		marginHorizontal: Sizes.smartHorizontalScale(10),
	},
};

export const buttonWidth = Sizes.smartHorizontalScale(150);
export const colors = {
	white: Colors.white,
	pink: Colors.pink,
};
export default StyleSheet.create(styles);
