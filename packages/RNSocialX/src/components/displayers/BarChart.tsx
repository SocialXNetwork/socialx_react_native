import * as React from 'react';
import { FlatList, StyleProp, Text, View, ViewStyle } from 'react-native';

import {
	IMonthlyBarChartData,
	IWeeklyBarChartData,
} from '../../environment/consts';
import styles, { barChartStyles } from './BarChart.style';

interface IBarChartProps {
	dataSeries: IWeeklyBarChartData[] | IMonthlyBarChartData[];
	contentStyle?: ViewStyle;
	maxDate: number;
	CHART_ITEM_WIDTH?: number;
}

interface IBarChartItemProps {
	data: { item: IWeeklyBarChartData | IMonthlyBarChartData; index: number };
	maxDate: number;
	CHART_ITEM_WIDTH?: number;
}

export const BarChart: React.SFC<IBarChartProps> = ({
	dataSeries,
	maxDate,
	contentStyle,
	CHART_ITEM_WIDTH,
}) => {
	return (
		<FlatList
			alwaysBounceHorizontal={false}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={contentStyle}
			horizontal={true}
			data={dataSeries}
			renderItem={(data: {
				item: IWeeklyBarChartData | IMonthlyBarChartData;
				index: number;
			}) => (
				<BarChartItem
					data={data}
					maxDate={maxDate}
					CHART_ITEM_WIDTH={CHART_ITEM_WIDTH}
				/>
			)}
			getItemLayout={(data, index) => ({
				length: CHART_ITEM_WIDTH!,
				offset: CHART_ITEM_WIDTH! * index,
				index,
			})}
			initialNumToRender={10}
			windowSize={30}
			keyExtractor={(item, index) => index.toString()}
		/>
	);
};

const BarChartItem: React.SFC<IBarChartItemProps> = ({
	data,
	maxDate,
	CHART_ITEM_WIDTH,
}) => {
	const barChartColumnStyles = [
		barChartStyles.barChartColumn,
		{
			backgroundColor:
				data.index % 2 === 0
					? barChartStyles.barChartColumnColor
					: barChartStyles.barChartColumnLightColor,
			height: Math.round((data.item.value * 100) / maxDate) + '%',
		},
	];

	return (
		<View style={[styles.weekChartItem, { width: CHART_ITEM_WIDTH }]}>
			<View style={styles.barChartColumnContainer}>
				<View style={barChartColumnStyles} />
			</View>
			<View style={styles.barChartLabelContainer}>
				<Text style={styles.barCharItemLabel}>{data.item.label}</Text>
			</View>
		</View>
	);
};
