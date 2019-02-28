import React from 'react';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

import { Header } from '../../components';
import { IDictionary } from '../../types';

import { CoinIcons } from '../../environment/consts';

import { Colors } from '../../environment/theme';
import { IBounty } from '../../store/data/bounties';
import styles from './BountyScreen.style';

interface IProps extends IDictionary {
	bounty: IBounty;
	onGoBack: () => void;
}

export const BountyScreenView: React.SFC<IProps> = ({ dictionary, onGoBack, bounty }) => {
	const {
		id,
		content,
		expiryDate,
		reward,
		claimed,
		coin,
		title,
		submissionMin,
		submissionMax,
	} = bounty;

	return (
		<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
			<Header back={true} title={dictionary.screens.bounties.bounty.title} onPressBack={onGoBack} />
			<View style={styles.row}>
				<Text style={styles.title}>{title}</Text>
			</View>
			{claimed ? (
				<View style={styles.row}>
					<View style={[styles.dot, { backgroundColor: Colors.sushi }]} />
					<Text style={styles.textIcon}>{dictionary.screens.bounties.bounty.available}</Text>
				</View>
			) : (
				<View style={styles.row}>
					<View style={[styles.dot, { backgroundColor: Colors.ceriseRed }]} />
					<Text style={styles.textIcon}>{dictionary.screens.bounties.bounty.unavailable}</Text>
				</View>
			)}
			{coin && (
				<View style={styles.amountContainer}>
					<View style={styles.row}>
						<Image source={CoinIcons[coin]} style={styles.coinIcon} resizeMode={'contain'} />
						<View style={styles.spacer}>
							<View style={styles.coinDetails}>
								<Text>Bounty</Text>
								<Text>Coins</Text>
							</View>
							<Text style={styles.amount}>{`${reward} ${coin}`}</Text>
						</View>
					</View>
					<View style={styles.row}>
						<Text>Category 1</Text>
						<Text>Category 2</Text>
						<Text>Category 3</Text>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};
