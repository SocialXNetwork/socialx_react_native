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
	errors: IError[];
}

class Screen extends React.Component<
	IRegisterScreenProps,
	IRegisterScreenState
> {
	public static getDerivedStateFromProps(nextProps: IRegisterScreenProps) {
		if (nextProps.errors.length > 0) {
			return {
				errors: nextProps.errors,
			};
		}

		return null;
	}

	public state = {
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
		const {
			getText,
			register,
			showDotsMenuModal,
			loadPosts,
			resetNavigationToRoute,
			navigation,
		} = this.props;

		return (
			<RegisterScreenView
				onStartRegister={async (userData) => {
					await register(userData);
					await loadPosts();
					await this.setState({ errors: [] });
					resetNavigationToRoute(NAVIGATION.Intro, navigation);
				}}
				onNavigateToTermsAndConditions={() =>
					this.safeNavigateToScreen(SCREENS.TermsAndConditions)
				}
				onGoBack={this.onGoBackHandler}
				getText={getText}
				showDotsMenuModal={showDotsMenuModal}
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
