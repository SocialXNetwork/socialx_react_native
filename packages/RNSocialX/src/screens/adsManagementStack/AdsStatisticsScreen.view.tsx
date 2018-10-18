import { Button, Segment, Text } from 'native-base';
import * as React from 'react';
import { TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header, HeaderButton } from '../../components';
import { IHeaderProps, ITranslatedProps } from '../../types';

import styles, { customStyleProps } from './AdsStatisticsScreen.style';

interface IAdsStatisticsScreenViewProps extends ITranslatedProps, IHeaderProps {
	transactions: Array<{
		number: number;
		date: Date | string;
	}>;
	onShowAllTransactions: () => void;
	handleStatistics: (text: 'weekly' | 'monthly') => void;
	weeklySelected: boolean;
	monthlySelected: boolean;
	totalAmountSOCX: number;
}

export const AdsStatisticsScreenView: React.SFC<
	IAdsStatisticsScreenViewProps
> = ({
	transactions,
	onShowAllTransactions,
	onGoBack,
	handleStatistics,
	getText,
	weeklySelected,
	monthlySelected,
	totalAmountSOCX,
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
				underlayColor={customStyleProps.highlightButton}
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
					<Button
						style={
							weeklySelected
								? styles.segmentButtonWeeklyActive
								: styles.segmentButtonWeeklyInactive
						}
						first={true}
						active={weeklySelected}
						onPress={() => {
							handleStatistics('weekly');
						}}
					>
						<Text
							style={
								weeklySelected
									? styles.segmentTitleActive
									: styles.segmentTitleInactive
							}
						>
							{getText('ad.statistics.buttons.weekly').toLowerCase()}
						</Text>
					</Button>
					<Button
						style={
							monthlySelected
								? styles.segmentButtonMonthlyActive
								: styles.segmentButtonMonthlyInactive
						}
						last={true}
						active={monthlySelected}
						onPress={() => {
							handleStatistics('monthly');
						}}
					>
						<Text
							style={
								monthlySelected
									? styles.segmentTitleActive
									: styles.segmentTitleInactive
							}
						>
							{getText('ad.statistics.buttons.monthly').toLowerCase()}
						</Text>
					</Button>
				</Segment>
			</View>
			<View style={styles.amountContainer}>
				<Text style={styles.textAmount}>{totalAmountSOCX}</Text>
				<Text style={styles.textDate}>
					{getText('ad.statistics.amount.text')}
				</Text>
			</View>
			<View style={styles.graphContainer} />
		</View>
	</SafeAreaView>
);
