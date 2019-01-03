import moment from 'moment';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { CoinIcons } from '../../environment/consts';
import { ITransactionData, TransactionType } from '../../types';
import styles from './RewardsTransactionItem.style';

export const RewardsTransactionItem: React.SFC<ITransactionData> = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Image source={CoinIcons[props.firstCoin]} style={styles.coinIcon} resizeMode="contain" />
				<View>
					{props.type === TransactionType.Converted ? (
						<Text style={styles.lineText}>{props.type}</Text>
					) : (
						<Text style={styles.lineText}>
							{props.type} {props.firstCoin}
						</Text>
					)}
					{props.from && (
						<View style={styles.descriptionContainer}>
							<Text style={styles.grayText}>From</Text>
							<Text style={styles.pinkText}>{props.from}</Text>
							<View style={styles.dot} />
							<Text style={styles.dateText}>{moment(props.date).format('MMM')}</Text>
							<Text style={styles.dateText}>{moment(props.date).format('DD')}</Text>
						</View>
					)}
					{!props.from && props.type !== TransactionType.Converted && (
						<View style={styles.descriptionContainer}>
							<Text style={styles.dateText}>{moment(props.date).format('MMM')}</Text>
							<Text style={styles.dateText}>{moment(props.date).format('DD')}</Text>
						</View>
					)}
					{props.type === TransactionType.Converted && (
						<View style={styles.descriptionContainer}>
							<Text style={styles.grayTextBold}>{props.secondCoin}</Text>
							<Text style={styles.grayText}>to</Text>
							<Text style={styles.grayTextBold}>{props.firstCoin}</Text>
						</View>
					)}
				</View>
			</View>
			<View style={styles.rightContainer}>
				{props.type === TransactionType.Received ? (
					<Text style={styles.greenText}>
						{props.firstAmount} {props.firstCoin}
					</Text>
				) : (
					<Text style={styles.grayTextBold}>
						{props.firstAmount} {props.firstCoin}
					</Text>
				)}
			</View>
		</View>
	);
};
