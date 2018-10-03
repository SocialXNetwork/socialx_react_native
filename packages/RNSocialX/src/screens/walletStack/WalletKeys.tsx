import * as React from 'react';

import { INavigationProps } from '../../types';
import { WalletKeysScreenView } from './WalletKeys.view';

import {
	IWithWalletKeysEnhancedActions,
	IWithWalletKeysEnhancedData,
	WithWalletKeys,
} from '../../enhancers/screens';

type IWalletKeysScreenProps = INavigationProps &
	IWithWalletKeysEnhancedActions &
	IWithWalletKeysEnhancedData;

class Screen extends React.Component<IWalletKeysScreenProps> {
	public render() {
		return (
			<WalletKeysScreenView
				onGoBack={this.onGoBackHandler}
				ownerPub={this.props.ownerPub}
				creatorPub={this.props.creatorPub}
				ownerPriv={this.props.ownerPriv}
				creatorPriv={this.props.creatorPriv}
				onExportKeys={this.onExportKeysHandler}
				onFinalize={this.onFinalizeHandler}
				getText={this.props.getText}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};

	private onExportKeysHandler = () => {
		this.props.exportKeys(
			this.props.ownerPub,
			this.props.creatorPub,
			this.props.ownerPriv,
			this.props.creatorPriv,
		);
	};

	private onFinalizeHandler = () => {
		if (this.props.finalized) {
			this.props.navigation.navigate('Placeholder');
		} else {
			this.props.finalize();
		}
	};
}

export const WalletKeysScreen = (navProps: INavigationProps) => (
	<WithWalletKeys>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithWalletKeys>
);
