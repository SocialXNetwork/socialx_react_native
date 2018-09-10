import * as shape from 'd3-shape';
import numeral from 'numeral';
import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {LineChart} from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/Ionicons';

import {CoinFullName, CoinIcons, CoinSymbol} from '../../environment/consts';
import styles, {customStyles} from './SocialXAccountCurrencyItem.style';

export interface AccountCurrencyData {
	coinSymbol: CoinSymbol;
	coinAmount: number;
	usdValue: number;
	trendPercentage: number;
	graphData: any[];
}

export const SocialXAccountCurrencyItem: React.SFC<AccountCurrencyData> = (props) => {
	const usdValueWithFormat = numeral(props.usdValue).format('($0.00a)');
	const coinAmountWithFormat = numeral(props.coinAmount).format('0.00a');
	const trendIconColor = props.trendPercentage < 0 ? customStyles.negPercentage : customStyles.pozPercentage;
	const trendIconValue = props.trendPercentage < 0 ? 'md-arrow-down' : 'md-arrow-up';
	const trendPercentageStyles = [styles.trendPercentage, ...(props.trendPercentage < 0 ? [styles.trendGoingDown] : [])];

	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Image source={CoinIcons[props.coinSymbol]} style={styles.coinIcon} resizeMode={'contain'} />
				<View>
					<Text style={styles.coinFullName}>{CoinFullName[props.coinSymbol]}</Text>
					<Text style={styles.coinAmount}>{coinAmountWithFormat + ' ' + props.coinSymbol}</Text>
				</View>
			</View>
			<View style={styles.centerContainer}>
				<Text style={styles.usdValue}>{usdValueWithFormat}</Text>
				<View style={styles.trendContainer}>
					<Icon name={trendIconValue} size={customStyles.iconSize} color={trendIconColor} />
					<Text style={trendPercentageStyles}>
						{Math.abs(props.trendPercentage)}
						{'%'}
					</Text>
				</View>
			</View>
			<LineChart
				style={styles.lineChart}
				data={props.graphData}
				svg={{stroke: trendIconColor}}
				animate={true}
				showGrid={false}
				curve={shape.curveNatural}
				animationDuration={300}
			/>
		</View>
	);
};
