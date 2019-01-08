/**
 * TODO list:
 * 1. Data props: coins
 * 2. Action props: sendCoins
 */

import * as React from 'react';
import { CoinSymbol } from '../../../environment/consts';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithSendCoinsEnhancedProps = {
	data: {
		coins: 53680,
	},
	actions: {
		sendCoins: () => undefined,
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithSendCoinsEnhancedData {
	coins: number;
}

export interface IWithSendCoinsEnhancedActions extends ITranslatedProps {
	sendCoins: (alias: string, transferAmount: number, coin: CoinSymbol) => void;
}

interface IWithSendCoinsEnhancedProps {
	data: IWithSendCoinsEnhancedData;
	actions: IWithSendCoinsEnhancedActions;
}

interface IWithSendCoinsProps {
	children(props: IWithSendCoinsEnhancedProps): JSX.Element;
}

interface IWithSendCoinsState {}

export class WithSendCoins extends React.Component<IWithSendCoinsProps, IWithSendCoinsState> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) =>
					this.props.children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
