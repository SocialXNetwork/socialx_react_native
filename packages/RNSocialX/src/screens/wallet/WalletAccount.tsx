import { debounce } from 'lodash';
import * as React from 'react';

import {
	IWithWalletAccountEnhancedActions,
	IWithWalletAccountEnhancedData,
	WithWalletAccount,
} from '../../enhancers/screens';
import { SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { WalletAccountScreenView } from './WalletAccount.view';

const SEARCH_DEBOUNCE_TIME = 500;

type IWalletAccountScreenProps = INavigationProps &
	IWithWalletAccountEnhancedActions &
	IWithWalletAccountEnhancedData;

interface IWalletAccountScreenState {
	accountName: string;
}

class Screen extends React.Component<IWalletAccountScreenProps, IWalletAccountScreenState> {
	public state = {
		accountName: '',
	};

	private checkInputForValidity = debounce((accountName: string) => {
		this.props.checkForValidInput(accountName);
	}, SEARCH_DEBOUNCE_TIME);

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
		this.props.navigation.navigate(SCREENS.WalletKeys);
	};

	private onGenerateAccountNameHandler = () => {
		this.props.generateAccountName();
	};
}

export const WalletAccountScreen = (props: INavigationProps) => (
	<WithWalletAccount>
		{({ data, actions }) => <Screen {...props} {...data} {...actions} />}
	</WithWalletAccount>
);
