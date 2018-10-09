import * as React from 'react';
import { Keyboard } from 'react-native';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { IError, INavigationProps } from '../../types';
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
	loadingAccount: boolean | null;
	loadingProfile: boolean | null;
	errors: IError[];
}

class Screen extends React.Component<
	IRegisterScreenProps,
	IRegisterScreenState
> {
	public static getDerivedStateFromProps(
		nextProps: IRegisterScreenProps,
		currentState: IRegisterScreenState,
	) {
		if (nextProps.errors.length > 0) {
			return {
				errors: nextProps.errors,
			};
		}

		if (nextProps.loadingAccount) {
			return {
				loadingAccount: true,
			};
		}

		if (nextProps.loadingProfile) {
			return {
				loadingProfile: true,
			};
		}

		if (
			currentState.errors.length === 0 &&
			!nextProps.loadingAccount &&
			!nextProps.loadingProfile &&
			currentState.loadingAccount &&
			currentState.loadingProfile
		) {
			nextProps.resetNavigationToRoute(NAVIGATION.Main, nextProps.navigation);
			return {
				loadingAccount: false,
				loadingProfile: false,
			};
		}

		return null;
	}

	public state = {
		loadingAccount: null,
		loadingProfile: null,
		errors: [],
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
