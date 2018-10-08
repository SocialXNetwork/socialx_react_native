/**
 * TODO list:
 * 1. Check how we can implement chart fill color
 * 2. Check why data on X axis is not sown correct
 */
import * as React from 'react';
import { Text, View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';

import { IAdsAccountPerformanceValues } from '../../../types';
import styles, { customStyleProps } from './ChartAccountPerformance.style';

const chartVerticalInset = { top: 0, bottom: 10 };

interface IChartAccountPerformanceProps {
	performanceValues: IAdsAccountPerformanceValues[];
	week: string;
}

export const ChartAccountPerformance: React.SFC<
	IChartAccountPerformanceProps
> = ({ performanceValues, week }) => (
	<View style={styles.container}>
		<Text style={styles.weekText}>{week}</Text>
		<View style={styles.chartWithYAxis}>
			<YAxis
				data={performanceValues.map(
					(performanceValue) => performanceValue.value,
				)}
				contentInset={chartVerticalInset}
				svg={customStyleProps.chartYAxisSvgStyle}
				numberOfTicks={5}
				formatLabel={(value: number) => value}
			/>
			<View style={{ flex: 1 }}>
				<LineChart
					yMin={0}
					style={styles.chartStyle}
					data={performanceValues.map(
						(performanceValue) => performanceValue.value,
					)}
					svg={{
						stroke: customStyleProps.chartLineColor,
						// fill: customStyleProps.chartFillColor,
						// fillOpacity: 0.5,
						// fillRule: 'evenodd',
					}}
					contentInset={chartVerticalInset}
				>
					<Grid />
				</LineChart>
				<XAxis
					style={{ marginHorizontal: -10 }}
					data={performanceValues.map((performanceValue) =>
						performanceValue.date.getDate(),
					)}
					formatLabel={(value: number) => value + 'th'}
					contentInset={{
						left: customStyleProps.chartXAxisContentInset,
						right: customStyleProps.chartXAxisContentInset,
					}}
					svg={customStyleProps.chartXAxisSvgStyle}
				/>
			</View>
		</View>
	</View>
);
