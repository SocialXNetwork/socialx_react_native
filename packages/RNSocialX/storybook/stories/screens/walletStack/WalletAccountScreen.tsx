import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { debounce } from 'lodash';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { WalletAccountScreenView } from '../../../../src/screens/walletStack/WalletAccount.view';

class WalletAccountStory extends React.Component {
	public state = {
		accountName: '',
		isValid: undefined,
	};

	private checkInputForValidity = debounce((accountName: string) => {
		// Action to check for validity
		if (accountName === 'validaccount') {
			this.setState({ isValid: true });
		} else {
			this.setState({ isValid: false });
		}
	}, 500);

	public render() {
		return (
			<WalletAccountScreenView
				onGoBack={action('onGoBack')}
				onGoNext={action('onGoNext')}
				onGenerateAccountName={action('onGenerateAccountName')}
				onChangeAccountName={this.onChangeAccountNameHandler}
				accountName={this.state.accountName}
				isValid={this.state.isValid}
				getText={getTextMock}
			/>
		);
	}

	private onChangeAccountNameHandler = (accountName: string) => {
		this.checkInputForValidity(accountName);
		this.setState({ accountName });
	};
}

storiesOf('Screens/walletStack', module).add('WalletAccountScreen', () => {
	return <WalletAccountStory />;
});
