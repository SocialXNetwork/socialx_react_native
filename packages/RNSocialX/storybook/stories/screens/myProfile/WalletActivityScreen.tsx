import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock, transactions } from '../../../../src/mocks';
import { WalletActivityScreenView } from '../../../../src/screens/myProfile/WalletActivityScreen.view';
import { TrendOptions } from '../../../../src/types';

storiesOf('Screens/myProfile', module).add('WalletActivityScreenView', () => {
	const wallet = {
		coins: '53,680',
		trendPercentage: '27.21',
		trendArrow: TrendOptions.Up,
		transactions,
		refreshing: false,
	};

	return (
		<WalletActivityScreenView
			coins={wallet.coins}
			trendPercentage={wallet.trendPercentage}
			trendArrow={wallet.trendArrow}
			onViewAccount={action('onViewAccount')}
			transactions={wallet.transactions}
			refreshing={wallet.refreshing}
			onRefresh={action('onRefresh')}
			onEndReached={action('onEndReached')}
			onGoBack={action('onGoBack')}
			getText={getTextMock}
		/>
	);
});
