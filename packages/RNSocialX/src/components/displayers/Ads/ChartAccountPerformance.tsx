import * as React from 'react';
import { Text, View } from 'react-native';
import { AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

import { IAdsAccountPerformanceValues } from '../../../types';
import styles, { customStyleProps } from './ChartAccountPerformance.style';

const chartVerticalInset = { top: 0, bottom: 10 };
const numberOfTicks = 5;

interface IChartAccountPerformanceProps {
	performanceValues: IAdsAccountPerformanceValues[];
	week: string;
}

export const ChartAccountPerformance: React.SFC<IChartAccountPerformanceProps> = ({
	performanceValues,
	week,
}) => (
	<View style={styles.container}>
		<Text style={styles.weekText}>{week}</Text>
		<View style={styles.chartWithYAxis}>
			<YAxis
				style={styles.chartYAxis}
				data={performanceValues.map((performanceValue) => performanceValue.value).concat(0)}
				contentInset={chartVerticalInset}
				svg={customStyleProps.chartYAxisSvgStyle}
				numberOfTicks={numberOfTicks}
				formatLabel={(value: number) => value}
			/>
			<View style={{ flex: 1 }}>
				<AreaChart
					yMin={0}
					numberOfTicks={numberOfTicks}
					style={styles.chartStyle}
					data={performanceValues.map((performanceValue) => performanceValue.value)}
					svg={{
						stroke: customStyleProps.chartLineColor,
						fill: customStyleProps.chartFillColor,
					}}
					contentInset={chartVerticalInset}
				>
					<Grid />
				</AreaChart>
				<XAxis
					data={performanceValues}
					xAccessor={(obj: { index: number; item: IAdsAccountPerformanceValues }) =>
						obj.item.date.getDate()
					}
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
