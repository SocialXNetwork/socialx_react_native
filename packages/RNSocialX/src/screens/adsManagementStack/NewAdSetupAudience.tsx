import * as React from 'react';

import {
	IWithNewAdSetupAudienceEnhancedActions,
	IWithNewAdSetupAudienceEnhancedData,
	WithNewAdSetupAudience,
} from '../../enhancers/screens';
import { INavigationProps } from '../../types';
import { NewAdSetupAudienceView } from './NewAdSetupAudience.view';

type INewAdSetupAudienceProps = IWithNewAdSetupAudienceEnhancedData &
	IWithNewAdSetupAudienceEnhancedActions &
	INavigationProps;

interface INewAdSetupAudienceState {}

class Screen extends React.Component<
	INewAdSetupAudienceProps,
	INewAdSetupAudienceState
> {
	public render() {
		const { getText } = this.props;
		return (
			<NewAdSetupAudienceView
				getText={getText}
				onGoBack={this.onGoBackHandler}
			/>
		);
	}

	private onGoBackHandler = () => {
		this.props.navigation.goBack(null);
	};
}

export const NewAdSetupAudience = (navProps: INavigationProps) => (
	<WithNewAdSetupAudience>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithNewAdSetupAudience>
);
