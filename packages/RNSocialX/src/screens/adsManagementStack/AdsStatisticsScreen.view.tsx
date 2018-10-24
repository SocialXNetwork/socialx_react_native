import { Button, Segment, Text } from 'native-base';
import * as React from 'react';
import {
	Animated,
	FlatList,
	LayoutChangeEvent,
	TouchableHighlight,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header, HeaderButton } from '../../components';
import {
	IMonthlyBarChartData,
	ISpentTillNow,
	IWeeklyBarChartData,
} from '../../environment/consts';
import { IHeaderProps, ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './AdsStatisticsScreen.style';

interface IAdsStatisticsScreenViewProps extends ITranslatedProps, IHeaderProps {
	transactions: Array<{
		number: number;
		date: Date | string;
	}>;
	onShowAllTransactions: () => void;
	handleStatistics: (text: ISpentTillNow) => void;
	selectedSpentButton: ISpentTillNow;
	totalAmountSOCX: string;
	translateXValue: Animated.Value;
	weeklyChartContainerOnLayout: (event: LayoutChangeEvent) => void;
	scrollRef: FlatList<IWeeklyBarChartData> | undefined;
	weeklySeries: IWeeklyBarChartData[];
	renderBarChartWeeklyItem: (
		data: { item: IWeeklyBarChartData; index: number },
	) => JSX.Element;
	getWeeklyChartItemLayout: (
		data: any,
		index: number,
	) => { length: number; offset: number; index: number };
	monthlySeries: IMonthlyBarChartData[];
	renderBarChartMonthlyItem: (
		data: { item: IMonthlyBarChartData; index: number },
	) => JSX.Element;
}

const SPENT_TILL_NOW_BUTTONS = [
	{
		label: 'ad.statistics.buttons.weekly',
		value: ISpentTillNow.weekly,
	},
	{
		label: 'ad.statistics.buttons.monthly',
		value: ISpentTillNow.monthly,
	},
];

export const AdsStatisticsScreenView: React.SFC<
	IAdsStatisticsScreenViewProps
> = ({
	transactions,
	onShowAllTransactions,
	onGoBack,
	handleStatistics,
	getText,
	selectedSpentButton,
	totalAmountSOCX,
	translateXValue,
	weeklyChartContainerOnLayout,
	scrollRef,
	weeklySeries,
	renderBarChartWeeklyItem,
	getWeeklyChartItemLayout,
	monthlySeries,
	renderBarChartMonthlyItem,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header
			title={getText('ad.management.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<Text style={styles.title}>
			{getText('ad.statistics.title').toUpperCase()}
		</Text>
		<View style={styles.separator} />
		<View style={styles.transactionsContainer}>
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{getText('ad.statistics.transactions.title')}
				</Text>
			</View>
			<View style={styles.separator} />
			{transactions.map((transaction) => (
				<View style={styles.transaction} key={transaction.number}>
					<Text style={styles.text}>
						{getText('ad.statistics.transactions.transaction')}{' '}
						{transaction.number < 10
							? '0' + transaction.number
							: transaction.number}
					</Text>
					<Text style={styles.textDate}>{transaction.date}</Text>
				</View>
			))}
			<TouchableHighlight
				style={styles.moreTransactionsContainer}
				underlayColor={defaultStyles.highlightButton}
				onPress={() => {
					onShowAllTransactions();
				}}
			>
				<Text style={styles.moreTransactionsText}>
					{getText('ad.statistics.buttons.alltransactions')}
				</Text>
			</TouchableHighlight>
		</View>
		<View style={styles.separator} />
		<View style={styles.spentContainer}>
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{getText('ad.statistics.spent.title')}
				</Text>
			</View>
			<View style={styles.separator} />
			<View style={styles.buttonsContainer}>
				<Segment style={styles.segment}>
					{SPENT_TILL_NOW_BUTTONS.map((spentTillNowButton, index) => (
						<Button
							style={
								selectedSpentButton === spentTillNowButton.value
									? styles.segmentButtonSpentTillNowActive
									: styles.segmentButtonSpentTillNowInactive
							}
							first={index === 0}
							last={index === SPENT_TILL_NOW_BUTTONS.length - 1}
							active={selectedSpentButton === spentTillNowButton.value}
							onPress={() => {
								handleStatistics(spentTillNowButton.value);
							}}
						>
							<Text
								style={
									selectedSpentButton === spentTillNowButton.value
										? styles.segmentTitleActive
										: styles.segmentTitleInactive
								}
							>
								{getText(spentTillNowButton.label).toLowerCase()}
							</Text>
						</Button>
					))}
				</Segment>
			</View>
			<View style={styles.amountContainer}>
				<Text style={styles.textAmount}>{totalAmountSOCX}</Text>
				<Text style={styles.textDate}>
					{getText('ad.statistics.amount.text')}
				</Text>
			</View>
			<View style={styles.graphContainer}>
				<View style={styles.animatedViewport}>
					<Animated.View
						style={[
							styles.animatedView,
							{ transform: [{ translateX: translateXValue }] },
						]}
					>
						<View
							style={styles.fullWidth}
							onLayout={weeklyChartContainerOnLayout}
						>
							<FlatList
								showsHorizontalScrollIndicator={false}
								ref={(ref: FlatList<IWeeklyBarChartData>) => (scrollRef = ref)}
								horizontal={true}
								data={weeklySeries}
								renderItem={renderBarChartWeeklyItem}
								getItemLayout={getWeeklyChartItemLayout}
								initialNumToRender={10}
								windowSize={30}
								keyExtractor={(item: IWeeklyBarChartData, index: number) =>
									index.toString()
								}
							/>
						</View>
						<View style={styles.fullWidth}>
							<FlatList
								alwaysBounceHorizontal={false}
								contentContainerStyle={{
									flex: 1,
									justifyContent: 'space-between',
								}}
								horizontal={true}
								data={monthlySeries}
								renderItem={renderBarChartMonthlyItem}
								keyExtractor={(item: IMonthlyBarChartData, index: number) =>
									index.toString()
								}
							/>
						</View>
					</Animated.View>
				</View>
			</View>
		</View>
	</SafeAreaView>
);
