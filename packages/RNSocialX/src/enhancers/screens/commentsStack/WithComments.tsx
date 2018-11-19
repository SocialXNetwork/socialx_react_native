import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IError, IWallPostData } from '../../../types';

import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithActivities } from '../../connectors/ui/WithActivities';

export interface IWithCommentsEnhancedData {
	post: IWallPostData;
	errors: IError[];
	keyboardRaised: boolean;
}

export interface IWithCommentsEnhancedActions {}

interface IWithCommentsEnhancedProps {
	data: IWithCommentsEnhancedData;
	actions: IWithCommentsEnhancedActions;
}

interface IWithCommentsProps {
	children(props: IWithCommentsEnhancedProps): JSX.Element;
}

interface IWithCommentsState {}

export class WithComments extends React.Component<IWithCommentsProps, IWithCommentsState> {
	render() {
		return (
			<WithNavigationParams>
				{({ navigationParams }) => (
					<WithActivities>
						{({ errors }) =>
							this.props.children({
								data: {
									post: navigationParams[SCREENS.Comments].post,
									keyboardRaised: navigationParams[SCREENS.Comments].keyboardRaised,
									errors,
								},
								actions: {},
							})
						}
					</WithActivities>
				)}
			</WithNavigationParams>
		);
	}
}
