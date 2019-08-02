import React, { SFC, useEffect, useState } from 'react';
import { AsyncStorage, EmitterSubscription, Keyboard } from 'react-native';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithLoginEnhancedActions,
	IWithLoginEnhancedData,
	WithLogin,
} from '../../enhancers/screens';

import { NAVIGATION, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { LoadingScreen } from './LoadingScreen';
import { LoginScreenView } from './LoginScreen.view';

interface IProps extends INavigationProps, IWithLoginEnhancedData, IWithLoginEnhancedActions {
	onGoBack: () => void;
}

interface IState {
	error: boolean;
	loggingIn: boolean;
}

const Screen: SFC<IProps> = (props) => {
	const [error, setError] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);

	let keyboardDidShowListener: EmitterSubscription | null = null;

	const keyboardDidShow = async (e: any) => {
		const keyboardHeight = await AsyncStorage.getItem('KEYBOARD_HEIGHT');
		if (!keyboardHeight) {
			await AsyncStorage.setItem('KEYBOARD_HEIGHT', e.endCoordinates.height.toString());
		}
	};

	useEffect(() => {
		keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);

		return () => {
			if (keyboardDidShowListener) {
				keyboardDidShowListener.remove();
			}
		};
	}, [keyboardDidShowListener]);

	const onLoginHandler = async (alias: string, password: string) => {
		setError(false);
		setLoggingIn(true);
		// switchActivityIndicator(true);
		await props.login(alias, password);
	};

	const safeNavigateToScreen = (screenName: string) => {
		Keyboard.dismiss();
		props.navigation.navigate(screenName);
	};

	const switchActivityIndicator = (state: boolean) => {
		// const { dictionary, setGlobal } = props;
		// setGlobal({
		// 	activity: {
		// 		visible: state,
		// 		title: dictionary.screens.login.progress,
		// 	},
		// });
	};

	const { globals, dictionary, auth } = props;
	const { profileLoaded, friendsLoaded, postsLoaded, accountLoaded } = globals;
	const loading = {
		accountLoaded,
		profileLoaded,
		friendsLoaded,
		postsLoaded,
	};
	if (auth) {
		return <LoadingScreen loading={loading} dictionary={dictionary} />;
	}
	return (
		<LoginScreenView
			dictionary={props.dictionary}
			onLogin={onLoginHandler}
			onNavigateToPasswordForgot={() => safeNavigateToScreen(SCREENS.ForgotPassword)}
			onNavigateToRegister={() => safeNavigateToScreen(SCREENS.Register)}
			onGoBack={props.onGoBack}
			loginDisabled={loggingIn}
		/>
	);
};

export const LoginScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{(nav) => (
			<WithLogin>
				{({ data, actions }) => (
					<Screen {...props} {...data} {...actions} onGoBack={nav.actions.onGoBack} />
				)}
			</WithLogin>
		)}
	</WithNavigationHandlers>
);
