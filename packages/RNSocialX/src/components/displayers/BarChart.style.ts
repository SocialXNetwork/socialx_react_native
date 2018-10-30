import { StyleSheet } from 'react-native';
import { Colors, colorWithAlpha, Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	weekChartItem: {
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	barChartColumnContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	barChartLabelContainer: {
		marginTop: Sizes.smartHorizontalScale(9),
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	barCharItemLabel: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		color: Colors.paleSky,
	},
	monthChartItem: {
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
};

export default StyleSheet.create(styles);

export const barChartStyles = {
	barChartColumnColor: Colors.pink,
	barChartColumnLightColor: colorWithAlpha(Colors.pink, 0.5),
	barChartColumn: {
		width: Sizes.smartHorizontalScale(8),
	},
};
