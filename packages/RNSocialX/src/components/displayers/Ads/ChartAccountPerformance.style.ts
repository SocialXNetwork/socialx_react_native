import { StyleSheet } from 'react-native';
import { Colors, colorWithAlpha, Fonts, Sizes } from '../../../environment/theme';

const HORIZONTAL_PADDING = Sizes.smartHorizontalScale(18);

const style: any = {
	container: {
		width: '100%',
		paddingHorizontal: HORIZONTAL_PADDING,
		paddingVertical: Sizes.smartVerticalScale(12),
	},
	weekText: {
		...Fonts.centuryGothic,
		color: Colors.paleSky,
		fontSize: Sizes.smartHorizontalScale(12),
		marginBottom: Sizes.smartVerticalScale(30),
	},
	chartStyle: {
		marginLeft: Sizes.smartHorizontalScale(10),
		height: Sizes.smartVerticalScale(150),
	},
	chartWithYAxis: {
		flexDirection: 'row',
	},
	chartYAxis: {
		marginBottom: Sizes.smartHorizontalScale(16),
	},
};

export default StyleSheet.create(style);

export const customStyleProps = {
	chartLineColor: Colors.pink,
	chartFillColor: colorWithAlpha(Colors.pink, 0.1),
	chartXAxisContentInset: HORIZONTAL_PADDING,
	chartXAxisSvgStyle: {
		fontSize: Sizes.smartHorizontalScale(12),
		fill: Colors.paleSky,
	},
	chartYAxisSvgStyle: {
		fontSize: Sizes.smartHorizontalScale(16),
		fill: Colors.paleSky,
	},
};
