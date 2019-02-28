import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ButtonSizes, PrimaryButton } from '../../components';
import { Colors, Icons } from '../../environment/theme';
import { IDictionary, TREND_OPTIONS } from '../../types';
import styles from './MyWalletInfo.style';

interface IProps extends IDictionary {
	coins: string;
	trendPercentage: string;
	trendArrow: TREND_OPTIONS;
	onViewAccount: () => void;
}

export const MyWalletInfo: React.SFC<IProps> = ({
	coins,
	trendPercentage,
	trendArrow,
	dictionary,
	onViewAccount,
}) => {
	let iconName = Icons.trending.up;
	if (trendArrow === TREND_OPTIONS.DOWN) {
		iconName = Icons.trending.down;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.coins}>
				{dictionary.components.displayers.wallet.socx}
				{coins}
			</Text>
			<View style={styles.secondLine}>
				<View style={styles.secondLineLeft}>
					<Icon name={iconName} style={styles.icon} />
					<Text style={styles.trendPercentage}>{`${trendPercentage}%`}</Text>
				</View>
				<PrimaryButton
					autoWidth={true}
					label={dictionary.components.buttons.viewAccount}
					size={ButtonSizes.Small}
					onPress={onViewAccount}
					borderColor={Colors.transparent}
				/>
			</View>
		</View>
	);
};
