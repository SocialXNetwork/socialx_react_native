import { Platform, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { Colors, Fonts, Sizes } from '../../environment/theme';

const getMargin = () => {
	const model = DeviceInfo.getModel();
	if (
		model === 'iPhone X' ||
		model === 'iPhone XR' ||
		model === 'iPhone XS' ||
		model === 'iPhone XS Max'
	) {
		return Sizes.smartVerticalScale(75);
	}

	return Sizes.smartVerticalScale(50);
};

const styles: any = {
	outer: {
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		backgroundColor: Colors.white,
		borderRadius: Sizes.smartHorizontalScale(5),
		marginBottom: getMargin(),
		paddingHorizontal: Sizes.smartHorizontalScale(10),
		paddingVertical: Sizes.smartVerticalScale(10),
		...Platform.select({
			ios: {
				shadowOpacity: 0.75,
				shadowRadius: 5,
				shadowColor: Colors.gray,
				shadowOffset: { height: 2, width: 0 },
			},
			android: {
				borderWidth: StyleSheet.hairlineWidth,
				borderColor: Colors.wildSand,
				elevation: 4,
				width: '98%',
			},
		}),
	},
	textContainer: {
		flexShrink: 1,
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(16),
		color: Colors.cloudBurst,
	},
	icon: {
		fontSize: Sizes.smartHorizontalScale(25),
		color: Colors.ceriseRed,
		marginRight: Sizes.smartHorizontalScale(10),
	},
};

export default StyleSheet.create(styles);
