import * as React from 'react';
import { AsyncStorage, Keyboard } from 'react-native';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { IError, INavigationProps } from '../../types';
import { IRegisterData, RegisterScreenView } from './RegisterScreen.view';

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

class Screen extends React.Component<IRegisterScreenProps, IRegisterScreenState> {
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

	private keyboardDidShowListener: any;

	public componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
	}

	public componentWillUnmount() {
		this.keyboardDidShowListener.remove();
	}

	public render() {
		return (
			<RegisterScreenView
				onRegister={this.onRegisterHandler}
				onNavigateToTermsAndConditions={() => this.safeNavigateToScreen(SCREENS.TermsAndConditions)}
				onGoBack={this.onGoBackHandler}
				showOptionsMenu={this.props.showOptionsMenu}
				getText={this.props.getText}
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
		this.props.setGlobal({
			activity: {
				visible: state,
				title: this.props.getText('register.progress.message'),
			},
		});
	};
}

export const RegisterScreen = ({ navigation, navigationOptions }: INavigationProps) => (
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
