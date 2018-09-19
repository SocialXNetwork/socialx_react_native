/**
 * old screen -> screens/ForgotPasswordScreen/index.tsx
 * TODO list:
 * 1. get rid of workaround for navigationOptions.getText
 * 2. check TS issue with .navigationOptions
 */

import * as React from 'react';
import {View} from 'react-native';

import {
	IWithForgotPasswordEnhancedActions,
	IWithForgotPasswordEnhancedData,
	WithForgotPassword,
} from '../../enhancers/screens';
import {INavigationProps} from '../../types';
import {ForgotPasswordScreenView} from './ForgotPasswordScreen.view';

type IForgotPasswordScreenProps = INavigationProps<any, any> &
	IWithForgotPasswordEnhancedData &
	IWithForgotPasswordEnhancedActions;

const Screen: React.SFC<IForgotPasswordScreenProps> = ({getText, sendResetCode}) => (
	<ForgotPasswordScreenView getText={getText} onSendResetCode={sendResetCode} />
);

export const ForgotPasswordScreen = (navProps: INavigationProps<any, any>) => (
	<WithForgotPassword>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithForgotPassword>
);

// @ts-ignore
ForgotPasswordScreen.navigationOptions = ({navigationOptions}: IForgotPasswordScreenProps) => ({
	title: navigationOptions.getText('forgot.password.screen.title'),
	headerRight: <View />,
});
