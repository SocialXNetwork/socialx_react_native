import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {CoinSymbol} from '../../../../src/environment/consts';
import {SocialXAccountScreenView} from '../../../../src/screens/myProfile/SocialXAccountScreen.view';

storiesOf('Screens/myProfile', module).add('SocialXAccountScreen', () => {
	const myCoins = 53680;
	const myContribution = 42205;
	const returnPercentage = 27.21;
	const myDigitalCoins = [
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

	return (
		<SocialXAccountScreenView
			contribution={myContribution}
			coins={myCoins}
			returnPercentage={returnPercentage}
			digitalCoins={myDigitalCoins}
			onSend={action('Send')}
			onReceive={action('Receive')}
			onGoBack={action('onGoBack')}
			getText={(value) => value}
		/>
	);
});
