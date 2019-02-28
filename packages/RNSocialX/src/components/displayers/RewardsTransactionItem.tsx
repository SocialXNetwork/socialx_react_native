import moment from 'moment';
import React from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';

import { CoinIcons, TransactionFromType, TransactionIcons } from '../../environment/consts';
import { ITransactionData, TRANSACTION_TYPES } from '../../types';
import styles from './RewardsTransactionItem.style';

export const RewardsTransactionItem: React.SFC<ITransactionData> = (props) => {
	const firstAmount =
		props.firstAmount > 0 ? props.firstAmount.toString().replace(/^/, '+') : props.firstAmount;
	const secondAmount =
		props.secondAmount && props.secondAmount > 0
			? props.secondAmount.toString().replace(/^/, '+')
			: props.secondAmount;

	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				{props.type === TRANSACTION_TYPES.RECEIVED ? (
					<Image
						source={CoinIcons[props.firstCoin]}
						style={styles.coinIcon as ImageStyle}
						resizeMode="contain"
					/>
				) : (
					<Image
						source={TransactionIcons[props.transactionIcon!]}
						style={styles.coinIcon as ImageStyle}
						resizeMode="contain"
					/>
				)}
				<View>
					{props.type === TRANSACTION_TYPES.CONVERTED ? (
						<Text style={styles.lineText}>{props.type}</Text>
					) : (
						<Text style={styles.lineText}>
							{props.type} {props.firstCoin}
						</Text>
					)}
					{(props.from || props.fromType) && (
						<View style={styles.descriptionContainer}>
							<Text style={styles.grayTextWithPadding}>From</Text>
							{props.fromType === TransactionFromType.USER ? (
								<TouchableOpacity onPress={() => props.onViewUserProfile!(props.from!)}>
									<Text style={styles.pinkText}>{props.from}</Text>
								</TouchableOpacity>
							) : (
								<Text style={styles.grayTextWithoutPadding}>
									{TransactionFromType.POOL.toLowerCase()}
								</Text>
							)}
							<View style={styles.dot} />
							<Text style={styles.dateText}>{moment(props.date).format('MMM')} </Text>
							<Text style={styles.dateText}>{moment(props.date).format('DD')}</Text>
						</View>
					)}
					{!props.from && !props.fromType && props.type !== TRANSACTION_TYPES.CONVERTED && (
						<View style={styles.descriptionContainer}>
							<Text style={styles.dateText}>{moment(props.date).format('MMM')} </Text>
							<Text style={styles.dateText}> {moment(props.date).format('DD')}</Text>
						</View>
					)}
					{props.type === TRANSACTION_TYPES.CONVERTED && (
						<View style={styles.descriptionContainer}>
							<Text style={styles.grayTextBold}>{props.secondCoin}</Text>
							<Text style={styles.grayTextWithPadding}>to</Text>
							<Text style={styles.grayTextBold}>{props.firstCoin}</Text>
						</View>
					)}
				</View>
			</View>
			<View style={styles.rightContainer}>
				{props.type === TRANSACTION_TYPES.RECEIVED && (
					<Text style={styles.greenText}>
						{firstAmount} {props.firstCoin}
					</Text>
				)}
				{props.type === TRANSACTION_TYPES.SENT && (
					<Text style={styles.firstCoinGrayText}>
						{firstAmount} {props.firstCoin}
					</Text>
				)}
				{props.type === TRANSACTION_TYPES.CONVERTED && (
					<View>
						<Text style={styles.firstCoinGrayText}>
							{firstAmount} {props.firstCoin}
						</Text>
						<Text style={styles.secondCoinGrayText}>
							{secondAmount} {props.secondCoin}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};
