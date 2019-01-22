import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ButtonSizes, PrimaryButton } from '../../components';
import { Colors } from '../../environment/theme';
import { ITranslatedProps, TREND_OPTIONS } from '../../types';
import styles from './MyWalletInfo.style';

interface IMyWalletInfoProps extends ITranslatedProps {
	coins: string;
	trendPercentage: string;
	trendArrow: TREND_OPTIONS;
	onViewAccount: () => void;
}

// TODO: Add 'View account' to dictionary
export const MyWalletInfo: React.SFC<IMyWalletInfoProps> = ({
	coins,
	trendPercentage,
	trendArrow,
	onViewAccount,
	getText,
}) => {
	let iconName = 'md-trending-up';
	if (trendArrow === TREND_OPTIONS.DOWN) {
		iconName = 'md-trending-down';
	}

	return (
		<View style={styles.container}>
			<Text style={styles.myCoinsValue}>
				{'SOCX '}
				{coins}
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
					label="View Account"
					size={ButtonSizes.Small}
					onPress={onViewAccount}
					borderColor={Colors.transparent}
				/>
			</View>
		</View>
	);
};
