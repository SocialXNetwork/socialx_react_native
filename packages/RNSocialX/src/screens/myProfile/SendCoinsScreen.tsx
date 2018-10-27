import * as React from 'react';
import { TextInput } from 'react-native';

import { CoinSymbol } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { SendCoinsScreenView } from './SendCoinsScreen.view';

import {
	IWithSendCoinsEnhancedActions,
	IWithSendCoinsEnhancedData,
	WithSendCoins,
} from '../../enhancers/screens';

type ISendCoinsScreenProps = INavigationProps &
	IWithSendCoinsEnhancedActions &
	IWithSendCoinsEnhancedData;

interface ISendCoinsScreenState {
	user: string;
	transferAmount: string;
}

class Screen extends React.Component<ISendCoinsScreenProps, ISendCoinsScreenState> {
	public state = {
		user: '',
		transferAmount: '',
	};
	private secondInputRef = React.createRef<TextInput>();

	public render() {
		return (
			<SendCoinsScreenView
				coins={this.props.coins}
				user={this.state.user}
				transferAmount={this.state.transferAmount}
				onSendCoins={this.onSendCoinsHandler}
				secondInputRef={this.secondInputRef}
				onTransferAmountChange={this.onTransferAmountChangeHandler}
				onUserChange={this.onUserChangeHandler}
				onUserSubmit={this.onUserSubmitHandler}
				onGoBack={this.onGoBackHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onSendCoinsHandler = () => {
		const { user, transferAmount } = this.state;
		this.props.sendCoins(user, parseFloat(transferAmount), CoinSymbol.SOCX);
	};

	private onTransferAmountChangeHandler = (value: string) => {
		this.setState({ transferAmount: value });
	};

	private onUserChangeHandler = (value: string) => {
		this.setState({ user: value });
	};

	private onUserSubmitHandler = () => {
		if (this.secondInputRef.current) {
			this.secondInputRef.current.focus();
		}
	};

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const SendCoinsScreen = ({ navigation }: INavigationProps) => (
	<WithSendCoins>
		{({ data, actions }) => <Screen navigation={navigation} {...data} {...actions} />}
	</WithSendCoins>
);
