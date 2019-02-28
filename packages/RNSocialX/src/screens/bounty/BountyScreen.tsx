import React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithBountyEnhancedActions,
	IWithBountyEnhancedData,
	WithBounty,
} from '../../enhancers/screens';

import { IBounty } from '../../store/data/bounties';
import { INavigationProps } from '../../types';
import { BountyScreenView } from './BountyScreen.view';

interface IProps extends INavigationProps, IWithBountyEnhancedData, IWithBountyEnhancedActions {
	bounty: IBounty;
	onGoBack: () => void;
}

interface IState {}

class Screen extends React.Component<IProps, IState> {
	public state = {};

	public render() {
		const { dictionary, onGoBack, bounty } = this.props;

		return <BountyScreenView bounty={bounty} dictionary={dictionary} onGoBack={onGoBack} />;
	}
}

export const BountyScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{({ actions }) => (
			<WithBounty>
				{(bounty) => (
					<Screen {...props} {...bounty.data} {...bounty.actions} onGoBack={actions.onGoBack} />
				)}
			</WithBounty>
		)}
	</WithNavigationHandlers>
);
