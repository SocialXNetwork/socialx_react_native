import React, { Component } from 'react';

import {
	IWithCommentsEnhancedActions,
	IWithCommentsEnhancedData,
	WithComments,
} from '../../enhancers/screens';

import { INavigationProps } from '../../types';

import { CommentsScreenView } from './CommentsScreen.view';

type ICommentsScreenProps = INavigationProps &
	IWithCommentsEnhancedData &
	IWithCommentsEnhancedActions;

class Screen extends Component<ICommentsScreenProps> {
	public render() {
		const { postId, keyboardRaised, navigation } = this.props;

		return (
			<CommentsScreenView postId={postId} keyboardRaised={keyboardRaised} navigation={navigation} />
		);
	}
}

export const CommentsScreen = (props: INavigationProps) => (
	<WithComments>{({ data, actions }) => <Screen {...props} {...data} {...actions} />}</WithComments>
);
