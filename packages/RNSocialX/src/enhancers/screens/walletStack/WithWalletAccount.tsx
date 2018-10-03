import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithWalletAccountEnhancedProps = {
	data: {
		isValid: true,
	},
	actions: {
		checkForValidInput: (accountName: string) => {
			/**/
		},
		generateAccountName: () => {
			/**/
		},
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
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) =>
					children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
