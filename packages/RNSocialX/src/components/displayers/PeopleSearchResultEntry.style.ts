import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(40);

const style: any = {
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: Sizes.smartHorizontalScale(12),
		paddingRight: Sizes.smartHorizontalScale(24),
		paddingVertical: Sizes.smartVerticalScale(11),
	},
	containerSelected: {
		backgroundColor: Colors.catskillWhite,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(14),
	},
	avatarNameContainer: {
		flex: 1,
	},
	fullName: {
		...Fonts.centuryGothic,
		color: Colors.postFullName,
		fontSize: Sizes.smartHorizontalScale(14),
	},
	location: {
		...Fonts.centuryGothic,
		color: Colors.postText,
		fontSize: Sizes.smartHorizontalScale(10),
	},
	isFiendIcon: {
		width: Sizes.smartHorizontalScale(23),
		height: Sizes.smartHorizontalScale(23),
	},
};

export default StyleSheet.create(style);
