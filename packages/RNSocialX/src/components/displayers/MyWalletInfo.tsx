import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {ButtonSizes, PrimaryButton} from '../../components';
import {ITranslatedProps} from '../../types';
import styles, {defaultStyles} from './MyWalletInfo.style';

export enum TrendOptions {
	Up = 'UP',
	Down = 'DOWN',
}

export interface IMyWalletInfoProps extends ITranslatedProps {
	myCoins: string;
	trendPercentage: string;
	trendArrow: TrendOptions;
	onViewAccount: () => void;
}

// TODO: Add 'View account' to dictionary
export const MyWalletInfo: React.SFC<IMyWalletInfoProps> = ({
	myCoins,
	trendPercentage,
	trendArrow,
	onViewAccount,
	getText,
}) => {
	let iconName = 'md-trending-up';
	if (trendArrow === TrendOptions.Down) {
		iconName = 'md-trending-down';
	}

	return (
		<View style={styles.container}>
			<Text style={styles.myCoinsValue}>
				{'SOCX '}
				{myCoins}
			</Text>
			<View style={styles.secondLine}>
				<View style={styles.secondLineLeft}>
					<Icon name={iconName} style={styles.icon} />
					<Text style={styles.trendPercentage}>
						{trendPercentage}
						{'%'}
					</Text>
				</View>
				<PrimaryButton
					autoWidth={true}
					label={'View Account'}
					size={ButtonSizes.Small}
					onPress={onViewAccount}
					borderColor={defaultStyles.transparent}
				/>
			</View>
		</View>
	);
};
