import * as React from 'react';
import { debounce } from 'throttle-debounce';

import {
	IWithWalletAccountEnhancedActions,
	IWithWalletAccountEnhancedData,
	WithWalletAccount,
} from '../../enhancers/screens';
import { INavigationProps } from '../../types';
import { WalletAccountScreenView } from './WalletAccount.view';

const SEARCH_DEBOUNCE_TIME_MS = 300;

type IWalletAccountScreenProps = INavigationProps &
	IWithWalletAccountEnhancedActions &
	IWithWalletAccountEnhancedData;

interface IWalletAccountScreenState {
	accountName: string;
}

class Screen extends React.Component<
	IWalletAccountScreenProps,
	IWalletAccountScreenState
> {
	public state = {
		accountName: '',
	};

	private checkInputForValidity = debounce(
		SEARCH_DEBOUNCE_TIME_MS,
		(accountName: string) => {
			this.props.checkForValidInput(accountName);
		},
	);

	public render() {
		return (
			<WalletAccountScreenView
				onGoBack={this.onGoBackHandler}
				onGoNext={this.onGoNextHandler}
				onChangeAccountName={this.onChangeAccountNameHandler}
				accountName={this.state.accountName}
				isValid={this.props.isValid}
				onGenerateAccountName={this.onGenerateAccountNameHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onChangeAccountNameHandler = (accountName: string) => {
		this.checkInputForValidity(accountName);
		this.setState({ accountName });
	};

	private onGoNextHandler = () => {
		this.props.navigation.navigate('Placeholder');
	};

	private onGenerateAccountNameHandler = () => {
		this.props.generateAccountName();
	};
}

export const WalletAccountScreen = (navProps: INavigationProps) => (
	<WithWalletAccount>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithWalletAccount>
);
