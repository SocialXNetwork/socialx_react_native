import * as React from 'react';

import { INavigationProps } from '../../types';
import { LikesScreenView } from './LikesScreen.view';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import {
	IWithLikesEnhancedActions,
	IWithLikesEnhancedData,
	WithLikes,
} from '../../enhancers/screens';

type ILikesScreenProps = INavigationProps &
	IWithLikesEnhancedActions &
	IWithLikesEnhancedData &
	IWithNavigationHandlersEnhancedActions;

class Screen extends React.Component<ILikesScreenProps> {
	render() {
		return (
			<LikesScreenView
				likes={this.props.likes}
				onViewUserProfile={this.props.onViewUserProfile}
				onGoBack={this.props.onGoBack}
				getText={this.props.getText}
			/>
		);
	}
}

export const LikesScreen = (props: INavigationProps) => (
	<WithLikes>
		{(likes) => (
			<WithNavigationHandlers navigation={props.navigation}>
				{(nav) => <Screen {...props} {...likes.data} {...likes.actions} {...nav.actions} />}
			</WithNavigationHandlers>
		)}
	</WithLikes>
);
