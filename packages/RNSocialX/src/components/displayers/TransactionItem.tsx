import moment from 'moment';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { CoinIcons, CoinSymbol } from '../../environment/consts';
import styles from './TransactionItem.style';

export enum TransactionType {
	Sold = 'SOLD',
	Bought = 'BOUGHT',
}

interface ITransactionItemProps {
	type: TransactionType;
	firstAmount: number;
	firstCoin: CoinSymbol;
	secondAmount: number;
	secondCoin: CoinSymbol;
	date: Date;
}

export const TransactionItem: React.SFC<ITransactionItemProps> = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Image
					source={CoinIcons[props.firstCoin]}
					style={styles.coinIcon}
					resizeMode={'contain'}
				/>
				<View>
					<Text style={styles.lineText}>
						{props.type} {props.firstAmount} {props.firstCoin}
					</Text>
					<Text style={styles.lineText}>
						<Text style={styles.grayText}>{'for '}</Text>
						{props.secondAmount} {props.secondCoin}
					</Text>
				</View>
			</View>
			<View style={styles.rightContainer}>
				<Text style={styles.dateText}>{moment(props.date).format('MMM')}</Text>
				<Text style={styles.dateText}>{moment(props.date).format('DD')}</Text>
			</View>
		</View>
	);
};
