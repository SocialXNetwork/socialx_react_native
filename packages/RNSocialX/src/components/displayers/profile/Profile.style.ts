import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(120);
const AVATAR_CONTAINER_SIZE = Sizes.smartHorizontalScale(126);

const styles: any = {
	container: {
		backgroundColor: Colors.white,
	},
	avatarBackground: {
		width: '100%',
		height: Sizes.smartVerticalScale(150),
		justifyContent: 'center',
		alignItems: 'center',
	},
	top: {
		height: '50%',
		width: '100%',
		backgroundColor: Colors.pink,
	},
	bottom: {
		height: '50%',
		width: '100%',
		backgroundColor: Colors.white,
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	avatarContainer: {
		position: 'absolute',
		width: AVATAR_CONTAINER_SIZE,
		height: AVATAR_CONTAINER_SIZE,
		borderRadius: AVATAR_CONTAINER_SIZE / 2,
		padding: 10,
		backgroundColor: Colors.white,
		borderColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	statisticsContainer: {
		position: 'absolute',
		top: Sizes.smartVerticalScale(48),
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
	},
	leftStatistics: {
		flexDirection: 'row',
	},
	rightStatistics: {
		flexDirection: 'row',
	},
	textContainer: {
		marginBottom: Sizes.smartVerticalScale(10),
		paddingHorizontal: Sizes.smartHorizontalScale(64),
	},
	about: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartHorizontalScale(20),
		color: Colors.paleSky,
		textAlign: 'center',
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(15),
		marginBottom: Sizes.smartVerticalScale(20),
	},
	primary: {
		height: Sizes.smartVerticalScale(30),
		backgroundColor: Colors.pink,
		marginHorizontal: Sizes.smartHorizontalScale(10),
	},
	secondary: {
		height: Sizes.smartVerticalScale(30),
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
