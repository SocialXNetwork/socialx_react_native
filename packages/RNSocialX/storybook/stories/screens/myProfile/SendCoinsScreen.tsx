import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { SendCoinsScreenView } from '../../../../src/screens/myProfile/SendCoinsScreen.view';

storiesOf('Screens/myProfile', module)
	.addDecorator(withKnobs)
	.add('SendCoinsScreen', () => {
		const user = text('user', 'alexsirbu');
		const transferAmount = text('transferAmount', '8215');

		return (
			<SendCoinsScreenView
				coins={53773}
				user={user}
				transferAmount={transferAmount}
				secondInputRef={React.createRef()}
				onSendCoins={action('onSendCoins')}
				onTransferAmountChange={action('onTransferAmountChange')}
				onUserChange={action('onUserChange')}
				onUserSubmit={action('onUserSubmit')}
				onGoBack={action('onGoBack')}
				getText={(value) => value}
			/>
		);
	});
