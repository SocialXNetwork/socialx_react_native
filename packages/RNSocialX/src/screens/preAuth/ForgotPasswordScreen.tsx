/**
 * old screen -> screens/ForgotPasswordScreen/index.tsx
 * TODO list:
 * 1. Action props: sendResetCode
 * 2. get rid of workaround for navigationOptions.getText
 * 3. check TS issue with .navigationOptions
 */

import * as React from 'react';
import {View} from 'react-native';
import {NavigationScreenConfig, NavigationScreenProp} from 'react-navigation';

import {ITranslatedProps} from '../../types';
import {ForgotPasswordScreenView} from './ForgotPasswordScreen.view';

interface IForgotPasswordScreenProps extends ITranslatedProps {
	navigation: NavigationScreenProp<any>;
	navigationOptions: NavigationScreenConfig<any>;
	sendResetCode: (username: string) => void;
}

export const ForgotPasswordScreen: React.SFC<IForgotPasswordScreenProps> = ({getText, sendResetCode}) => (
	<ForgotPasswordScreenView getText={getText} onSendResetCode={sendResetCode} />
);

// @ts-ignore
ForgotPasswordScreen.navigationOptions = ({navigationOptions}: IForgotPasswordScreenProps) => ({
	title: navigationOptions.getText('forgot.password.screen.title'),
	headerRight: <View />,
});
