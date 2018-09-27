import numeral from 'numeral';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles, { icons } from './SendCoinsHeader.style';

export interface ISendCoinsHeaderProps {
	coins: number;
	onDropDownPress?: () => void;
}

export const SendCoinsHeader: React.SFC<ISendCoinsHeaderProps> = ({
	coins,
	onDropDownPress,
}) => {
	const formattedCoins = numeral(coins).format('0.00a');
	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Image
					source={icons.socxCoinIcon}
					style={styles.coinIcon}
					resizeMode="contain"
				/>
				<View>
					<Text style={styles.coinTitle}>SOCX</Text>
					<Text style={styles.coinDetails}>
						{formattedCoins}
						SOCX in wallet
					</Text>
				</View>
			</View>
			<TouchableOpacity style={styles.dropDownArrow} onPress={onDropDownPress}>
				<Icon name="md-arrow-round-down" style={styles.arrowIcon} />
			</TouchableOpacity>
		</View>
	);
};
