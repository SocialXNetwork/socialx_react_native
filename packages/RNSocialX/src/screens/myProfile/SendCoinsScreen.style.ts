import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.white,
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: Sizes.smartHorizontalScale(25),
		paddingTop: Sizes.smartVerticalScale(4),
		justifyContent: 'space-between',
	},
	middleContainer: {
		width: '100%',
		paddingHorizontal: Sizes.smartHorizontalScale(22),
	},
	borderLine: {
		width: '100%',
		borderBottomColor: Colors.grayNurse,
		borderBottomWidth: Sizes.smartHorizontalScale(2),
	},
	firstInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: Sizes.smartVerticalScale(20),
		paddingBottom: Sizes.smartVerticalScale(12),
	},
	textInputFirst: {
		height: Sizes.smartVerticalScale(62),
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(22),
		color: Colors.cloudBurst,
		flex: 1,
	},
	secondInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: Sizes.smartVerticalScale(10),
	},
	textInputSecond: {
		height: Sizes.smartVerticalScale(62),
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(22),
		color: Colors.cloudBurst,
		flex: 1,
	},
	inputLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(20),
		color: Colors.tundora,
		paddingLeft: Sizes.smartHorizontalScale(15),
	},
	continueButtonContainer: {
		justifyContent: 'center',
		minHeight: Sizes.smartVerticalScale(100),
	},
};

export default StyleSheet.create(styles);
export const defaultStyles = {
	transparent: Colors.transparent,
};
