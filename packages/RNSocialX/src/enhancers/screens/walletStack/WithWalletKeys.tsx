import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithWalletKeysEnhancedProps = {
	data: {
		ownerPub: 'key',
		creatorPub: 'key',
		ownerPriv: 'key',
		creatorPriv: 'key',
		finalized: false,
	},
	actions: {
		finalize: () => {
			/**/
		},
		exportKeys: (
			ownerPub: string,
			creatorPub: string,
			ownerPriv: string,
			creatorPriv: string,
		) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithWalletKeysEnhancedData {
	ownerPub: string;
	creatorPub: string;
	ownerPriv: string;
	creatorPriv: string;
	finalized: boolean;
}

export interface IWithWalletKeysEnhancedActions extends ITranslatedProps {
	finalize: () => void;
	exportKeys: (
		ownerPub: string,
		creatorPub: string,
		ownerPriv: string,
		creatorPriv: string,
	) => void;
}

interface IWithWalletKeysEnhancedProps {
	data: IWithWalletKeysEnhancedData;
	actions: IWithWalletKeysEnhancedActions;
}

interface IWithWalletKeysProps {
	children(props: IWithWalletKeysEnhancedProps): JSX.Element;
}

interface IWithWalletKeysState {}

export class WithWalletKeys extends React.Component<
	IWithWalletKeysProps,
	IWithWalletKeysState
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
