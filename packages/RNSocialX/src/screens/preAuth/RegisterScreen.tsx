/**
 * old screen -> screens/SignUpScreen/index.tsx
 * TODO list:
 * 1. @Serkan: might be that we need to make some flow logic changes here.
 */

import * as React from 'react';
import { Keyboard } from 'react-native';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { RegisterScreenView } from './RegisterScreen.view';

import {
	IWithRegisterEnhancedActions,
	IWithRegisterEnhancedData,
	WithRegister,
} from '../../enhancers/screens';

type IRegisterScreenProps = IWithRegisterEnhancedActions &
	IWithRegisterEnhancedData &
	INavigationProps;

interface IRegisterScreenState {
	uploadFinished: boolean;
}

class Screen extends React.Component<
	IRegisterScreenProps,
	IRegisterScreenState
> {
	// public state = {
	// 	uploadFinished: false,
	// };

	// public componentDidUpdate() {
	// 	if (this.props.uploads[0].done && !this.state.uploadFinished) {
	// 		this.setState((prevState) => {
	// 			return {
	// 				uploadFinished: !prevState.uploadFinished,
	// 			};
	// 		});
	// 	}
	// }

	public render() {
		const { getText, uploadFile, register, uploads } = this.props;
		return (
			<RegisterScreenView
				onStartRegister={(userData) => {
					register(userData);
					// this.safeNavigateToScreen(NAVIGATION.Intro);
				}}
				onNavigateToTermsAndConditions={() =>
					this.safeNavigateToScreen(SCREENS.TermsAndConditions)
				}
				onGoBack={this.onGoBackHandler}
				getText={getText}
			/>
		);
	}

	private safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		this.props.navigation.navigate(screenName);
	};

	private onGoBackHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};
}

export const RegisterScreen = ({
	navigation,
	navigationOptions,
}: INavigationProps) => (
	<WithRegister>
		{({ data, actions }) => (
			<Screen
				navigation={navigation}
				navigationOptions={navigationOptions}
				{...data}
				{...actions}
			/>
		)}
	</WithRegister>
);
