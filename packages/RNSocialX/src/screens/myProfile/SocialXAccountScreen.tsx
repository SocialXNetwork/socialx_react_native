import * as React from 'react';
import {Alert} from 'react-native';

import {AccountCurrencyData} from '../../components';
import {CoinSymbol} from '../../environment/consts';
import {ITranslatedProps} from '../../types';
import {SocialXAccountScreenView} from './SocialXAccountScreen.view';

const MY_DIGITAL_COINS: AccountCurrencyData[] = [
	{
		coinSymbol: CoinSymbol.SOCX,
		coinAmount: 799151.311,
		usdValue: 34621,
		trendPercentage: 4.5,
		graphData: [0.2, 0.22, 0.19, 0.15, 0.18, 0.25, 0.23, 0.26, 0.2, 0.22, 0.19, 0.15, 0.18, 0.25, 0.23, 0.26],
	},
	{
		coinSymbol: CoinSymbol.ETH,
		coinAmount: 10.578,
		usdValue: 1341415,
		trendPercentage: -2.6,
		graphData: [800, 850, 820, 840, 780, 810, 750, 720, 800, 850, 820, 840, 780, 810, 750, 720],
	},
];

export interface ISocialXAccountScreenState {
	myCoins: number;
	myContribution: number;
	returnPercentage: number;
	myDigitalCoins: AccountCurrencyData[];
}

export class SocialXAccountScreen extends React.Component<ITranslatedProps, ISocialXAccountScreenState> {
	public static navigationOptions = {
		title: 'SOCIALX ACCOUNT',
	};

	public state = {
		myCoins: 53680,
		myContribution: 42205,
		returnPercentage: 27.21,
		myDigitalCoins: MY_DIGITAL_COINS,
	};

	public render() {
		return (
			<SocialXAccountScreenView
				{...this.state}
				sendHandler={this.onSendHandler}
				receiveHandler={this.onReceiveHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onSendHandler = () => {
		Alert.alert('onSendHandler');
	};

	private onReceiveHandler = () => {
		Alert.alert('onReceiveHandler');
	};
}
