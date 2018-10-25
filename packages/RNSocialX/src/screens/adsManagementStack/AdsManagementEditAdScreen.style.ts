import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: Colors.wildSand,
	},
	title: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		lineHeight: Sizes.smartHorizontalScale(18),
		color: Colors.cloudBurst,
		textAlign: 'left',
		paddingLeft: Sizes.smartVerticalScale(24),
		paddingVertical: Sizes.smartVerticalScale(20),
		backgroundColor: 'white',
	},
	separator: {
		borderWidth: 1,
		borderColor: Colors.dustWhite,
		height: Sizes.smartVerticalScale(2),
	},
	header: {
		paddingVertical: Sizes.smartVerticalScale(15),
		paddingHorizontal: Sizes.smartHorizontalScale(24),
	},
	headerText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
	},
	managementContainer: {
		marginTop: Sizes.smartHorizontalScale(29),
		backgroundColor: Colors.white,
		width: Sizes.smartVerticalScale(375),
		height: Sizes.smartHorizontalScale(172),
	},
	buttonsContainer: {
		marginTop: Sizes.smartHorizontalScale(29),
		backgroundColor: Colors.white,
	},
	previewContainer: {
		backgroundColor: Colors.white,
		marginTop: Sizes.smartVerticalScale(29),
	},
};

export default StyleSheet.create(styles) as any;

export const defaultStyles = {};
