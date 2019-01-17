import * as React from 'react';
import { Platform, StatusBar } from 'react-native';

import { OS_TYPES } from '../../environment/consts';
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
	public componentDidMount() {
		if (Platform.OS === OS_TYPES.IOS) {
			StatusBar.setBarStyle('light-content', true);
		}
	}

	public render() {
		return (
			<LikesScreenView
				likeIds={this.props.likeIds}
				dictionary={this.props.dictionary}
				onViewUserProfile={this.props.onViewUserProfile}
				onGoBack={this.props.onGoBack}
			/>
		);
	}
}

export const LikesScreen = (props: INavigationProps) => (
	<WithLikes navigation={props.navigation}>
		{(likes) => (
			<WithNavigationHandlers navigation={props.navigation}>
				{(nav) => <Screen {...props} {...likes.data} {...likes.actions} {...nav.actions} />}
			</WithNavigationHandlers>
		)}
	</WithLikes>
);
