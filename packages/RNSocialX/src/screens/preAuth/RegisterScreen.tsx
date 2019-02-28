import * as React from 'react';
import { AsyncStorage, EmitterSubscription, Keyboard } from 'react-native';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithRegisterEnhancedActions,
	IWithRegisterEnhancedData,
	WithRegister,
} from '../../enhancers/screens';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { IError, INavigationProps } from '../../types';
import { IRegisterData, RegisterScreenView } from './RegisterScreen.view';

interface IProps extends IWithRegisterEnhancedActions, IWithRegisterEnhancedData, INavigationProps {
	onGoBack: () => void;
}

interface IState {
	errors: IError[];
}

class Screen extends React.Component<IProps, IState> {
	public static getDerivedStateFromProps(nextProps: IProps) {
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

	private keyboardDidShowListener: EmitterSubscription | null = null;

	public componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
	}

	public componentWillUnmount() {
		if (this.keyboardDidShowListener) {
			this.keyboardDidShowListener.remove();
		}
	}

	public render() {
		return (
			<RegisterScreenView
				onRegister={this.onRegisterHandler}
				onNavigateToTermsAndConditions={() => this.safeNavigateToScreen(SCREENS.TermsAndConditions)}
				onGoBack={this.onGoBackHandler}
				showOptionsMenu={this.props.showOptionsMenu}
				dictionary={this.props.dictionary}
			/>
		);
	}

	private keyboardDidShow = async (e: any) => {
		const keyboardHeight = await AsyncStorage.getItem('KEYBOARD_HEIGHT');
		if (!keyboardHeight) {
			await AsyncStorage.setItem('KEYBOARD_HEIGHT', e.endCoordinates.height.toString());
		}
	};

	private onRegisterHandler = async (user: IRegisterData) => {
		const { register, loadPosts, resetNavigationToRoute, navigation } = this.props;

		this.setState({ errors: [] });
		this.switchActivityIndicator(true);
		await register(user);

		if (this.state.errors.length > 0) {
			this.switchActivityIndicator(false);
		} else {
			await loadPosts();
			this.switchActivityIndicator(false);
			resetNavigationToRoute(NAVIGATION.Intro, navigation);
		}
	};

	private safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		this.props.navigation.navigate(screenName);
	};

	private onGoBackHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};

	private switchActivityIndicator = (state: boolean) => {
		const { setGlobal, dictionary } = this.props;

		setGlobal({
			activity: {
				visible: state,
				title: dictionary.screens.register.progress,
			},
		});
	};
}

export const RegisterScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{(nav) => (
			<WithRegister>
				{({ data, actions }) => (
					<Screen {...props} {...data} {...actions} onGoBack={nav.actions.onGoBack} />
				)}
			</WithRegister>
		)}
	</WithNavigationHandlers>
);
