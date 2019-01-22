import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { TransactionItem } from '../../../../src/components/';
import { CoinSymbol } from '../../../../src/environment/consts';
import { TRANSACTION_TYPES } from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('TransactionItem', () => (
		<TransactionItem
			id="1412"
			type={TRANSACTION_TYPES.BOUGHT}
			firstAmount={23}
			firstCoin={CoinSymbol.SOCX}
			secondAmount={0.2}
			secondCoin={CoinSymbol.ETH}
			date={new Date(Date.now())}
		/>
	));
