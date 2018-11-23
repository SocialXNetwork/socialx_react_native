import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithWalletAccountEnhancedProps = {
	data: {
		isValid: true,
	},
	actions: {
		checkForValidInput: (accountName: string) => undefined,
		generateAccountName: () => undefined,
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithWalletAccountEnhancedData {
	isValid: boolean | undefined;
}

export interface IWithWalletAccountEnhancedActions extends ITranslatedProps {
	checkForValidInput: (accountName: string) => void;
	generateAccountName: () => void;
}

interface IWithWalletAccountEnhancedProps {
	data: IWithWalletAccountEnhancedData;
	actions: IWithWalletAccountEnhancedActions;
}

interface IWithWalletAccountProps {
	children(props: IWithWalletAccountEnhancedProps): JSX.Element;
}

interface IWithWalletAccountState {}

export class WithWalletAccount extends React.Component<
	IWithWalletAccountProps,
	IWithWalletAccountState
> {
	render() {
		return (
			<WithI18n>
				{({ getText }) =>
					this.props.children({
						data: mock.data,
						actions: { ...mock.actions, getText },
					})
				}
			</WithI18n>
		);
	}
}
