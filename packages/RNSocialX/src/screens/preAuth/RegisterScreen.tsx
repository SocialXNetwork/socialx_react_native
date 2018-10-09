/**
 * old screen -> screens/SignUpScreen/index.tsx
 * TODO list:
 * 1. @Serkan: might be that we need to make some flow logic changes here.
 */

import * as React from 'react';
import { Keyboard } from 'react-native';

import { resetNavigationToRoute } from '../../enhancers/helpers';
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
	loading: boolean | null;
}

class Screen extends React.Component<
	IRegisterScreenProps,
	IRegisterScreenState
> {
	public static getDerivedStateFromProps(
		nextProps: IRegisterScreenProps,
		currentState: IRegisterScreenState,
	) {
		if (nextProps.loading) {
			return {
				loading: true,
			};
		}

		if (!nextProps.loading && currentState.loading) {
			resetNavigationToRoute(NAVIGATION.Main, nextProps.navigation);
			return {
				loading: false,
			};
		}

		return null;
	}

	public state = {
		loading: null,
	};

	public componentDidMount() {
		const { setGlobal, getText } = this.props;

		setGlobal({
			activity: {
				title: getText('register.signingUp'),
			},
		});
	}

	public render() {
		const { getText, register } = this.props;
		return (
			<RegisterScreenView
				onStartRegister={(userData) => {
					register(userData);
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
