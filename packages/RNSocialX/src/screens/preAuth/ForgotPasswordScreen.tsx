/**
 * old screen -> screens/ForgotPasswordScreen/index.tsx
 * TODO list:
 * 1. get rid of workaround for navigationOptions.getText
 * 2. check TS issue with .navigationOptions
 */

import * as React from 'react';

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

const onGoBackHandler = (navigation: any) => {
	navigation.goBack(null);
};

const Screen: React.SFC<IForgotPasswordScreenProps> = ({getText, navigation, sendResetCode}) => (
	<ForgotPasswordScreenView
		getText={getText}
		onSendResetCode={sendResetCode}
		onGoBack={() => onGoBackHandler(navigation)}
	/>
);

export const ForgotPasswordScreen = (navProps: INavigationProps<any, any>) => (
	<WithForgotPassword>{({data, actions}) => <Screen {...navProps} {...data} {...actions} />}</WithForgotPassword>
);
