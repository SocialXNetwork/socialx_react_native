import * as React from 'react';

import { SCREENS } from '../../../environment/consts';

import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';

export interface IWithCommentsEnhancedData {
	postId: string;
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
				{({ navigationParams }) => {
					const { postId, keyboardRaised } = navigationParams[SCREENS.Comments];

					return this.props.children({
						data: {
							postId,
							keyboardRaised,
						},
						actions: {},
					});
				}}
			</WithNavigationParams>
		);
	}
}
