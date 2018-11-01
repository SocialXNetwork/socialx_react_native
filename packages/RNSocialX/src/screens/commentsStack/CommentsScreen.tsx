import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

import {
	IWithCommentsEnhancedActions,
	IWithCommentsEnhancedData,
	WithComments,
} from '../../enhancers/screens';

import { OS_TYPES } from '../../environment/consts';
import { INavigationProps } from '../../types';

import { CommentsScreenView } from './CommentsScreen.view';

type ICommentsScreenProps = INavigationProps &
	IWithCommentsEnhancedData &
	IWithCommentsEnhancedActions;

class Screen extends Component<ICommentsScreenProps> {
	public componentDidMount() {
		StatusBar.setBarStyle('dark-content', true);
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustResize();
		}
	}

	public componentWillUnmount() {
		StatusBar.setBarStyle('light-content', true);
		if (Platform.OS === OS_TYPES.Android) {
			AndroidKeyboardAdjust.setAdjustPan();
		}
	}

	public render() {
		const { post, comments, keyboardRaised, navigation } = this.props;

		return (
			<CommentsScreenView
				post={post}
				comments={comments}
				keyboardRaised={keyboardRaised}
				navigation={navigation}
			/>
		);
	}
}

export const CommentsScreen = (navProps: INavigationProps) => (
	<WithComments>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithComments>
);
