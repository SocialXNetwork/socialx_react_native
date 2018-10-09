import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header, HeaderButton } from '../../components';
import { IHeaderProps, ITranslatedProps } from '../../types';

import styles from './AdsStatisticsScreen.style';

interface IAdsStatisticsScreenViewProps extends ITranslatedProps, IHeaderProps {
	transactions: Array<{
		number: number;
		date: Date;
	}>;
}

export const AdsStatisticsScreenView: React.SFC<
	IAdsStatisticsScreenViewProps
> = ({ transactions, onGoBack, getText }) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header
			title={getText('ad.management.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<View style={styles.transactions}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Transactions</Text>
			</View>
			{transactions.map((transaction) => (
				<View style={styles.transaction}>
					<Text style={styles.text}>
						Transaction{' '}
						{transaction.number < 10
							? '0' + transaction.number
							: transaction.number}
					</Text>
				</View>
			))}
		</View>
		<View style={styles.separator} />
	</SafeAreaView>
);
