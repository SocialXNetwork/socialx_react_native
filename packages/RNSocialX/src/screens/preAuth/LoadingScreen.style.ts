import { StyleSheet } from 'react-native';

import { Colors, Sizes } from '../../environment/theme';

const AVATAR_SIZE = Sizes.smartHorizontalScale(40);
const SMALL_AVATAR_SIZE = Sizes.smartHorizontalScale(25);

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	topTabs: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		height: Sizes.smartVerticalScale(60),
	},
	topTab: {
		width: '25%',
		height: Sizes.smartHorizontalScale(15),
		borderRadius: Sizes.smartHorizontalScale(4),
		backgroundColor: Colors.geyser,
	},
	share: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: Sizes.smartVerticalScale(50),
		paddingHorizontal: Sizes.smartHorizontalScale(20),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		backgroundColor: Colors.geyser,
		marginRight: Sizes.smartHorizontalScale(15),
	},
	shareText: {
		height: Sizes.smartHorizontalScale(20),
		borderRadius: Sizes.smartHorizontalScale(3),
		backgroundColor: Colors.geyser,
		width: '80%',
	},
	separator: {
		height: Sizes.smartHorizontalScale(8),
		width: '100%',
		backgroundColor: Colors.geyser,
		marginVertical: Sizes.smartVerticalScale(10),
	},
	post: {
		paddingHorizontal: Sizes.smartHorizontalScale(20),
		paddingVertical: Sizes.smartVerticalScale(5),
	},
	row: {
		flexDirection: 'row',
	},
	column: { flex: 1 },
	name: {
		height: Sizes.smartHorizontalScale(15),
		borderRadius: Sizes.smartHorizontalScale(5),
		backgroundColor: Colors.geyser,
		width: '70%',
		marginBottom: Sizes.smartVerticalScale(10),
	},
	date: {
		height: Sizes.smartHorizontalScale(10),
		borderRadius: Sizes.smartHorizontalScale(3),
		backgroundColor: Colors.geyser,
		width: '50%',
	},
	dots: {
		height: Sizes.smartHorizontalScale(12),
		width: Sizes.smartHorizontalScale(30),
		borderRadius: Sizes.smartHorizontalScale(4),
		backgroundColor: Colors.geyser,
	},
	longText: {
		height: Sizes.smartHorizontalScale(15),
		borderRadius: Sizes.smartHorizontalScale(3),
		backgroundColor: Colors.geyser,
		width: '100%',
		marginVertical: Sizes.smartVerticalScale(10),
	},
	shortText: {
		height: Sizes.smartHorizontalScale(15),
		borderRadius: Sizes.smartHorizontalScale(3),
		backgroundColor: Colors.geyser,
		width: '60%',
		marginBottom: Sizes.smartVerticalScale(10),
	},
	smallAvatar: {
		width: SMALL_AVATAR_SIZE,
		height: SMALL_AVATAR_SIZE,
		borderRadius: SMALL_AVATAR_SIZE / 2,
		backgroundColor: Colors.geyser,
		marginRight: Sizes.smartHorizontalScale(15),
	},
	input: {
		flex: 1,
		height: SMALL_AVATAR_SIZE,
		borderRadius: Sizes.smartHorizontalScale(5),
		backgroundColor: Colors.geyser,
	},
	shortDate: {
		height: Sizes.smartHorizontalScale(10),
		borderRadius: Sizes.smartHorizontalScale(3),
		backgroundColor: Colors.geyser,
		width: '25%',
	},
	bottomTabs: {
		paddingVertical: Sizes.smartVerticalScale(12),
		width: '100%',
		backgroundColor: Colors.alabaster,
		position: 'absolute',
		bottom: 0,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	bottomTab: {
		height: Sizes.smartHorizontalScale(25),
		width: Sizes.smartHorizontalScale(25),
		borderRadius: Sizes.smartHorizontalScale(3),
		backgroundColor: Colors.geyser,
	},
};

export default StyleSheet.create(styles);
