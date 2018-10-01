/**
 * old screen -> screens/ForgotPasswordScreen/index.tsx
 */

import * as React from 'react';

import {
	IWithForgotPasswordEnhancedActions,
	IWithForgotPasswordEnhancedData,
	WithForgotPassword,
} from '../../enhancers/screens';
import { INavigationProps } from '../../types';
import { ForgotPasswordScreenView } from './ForgotPasswordScreen.view';

type IForgotPasswordScreenProps = INavigationProps &
	IWithForgotPasswordEnhancedData &
	IWithForgotPasswordEnhancedActions;

const onGoBackHandler = (navigation: any) => {
	navigation.goBack(null);
};

const Screen: React.SFC<IForgotPasswordScreenProps> = ({
	getText,
	navigation,
	sendResetCode,
}) => (
	<ForgotPasswordScreenView
		getText={getText}
		onSendResetCode={sendResetCode}
		onGoBack={() => onGoBackHandler(navigation)}
	/>
);

export const ForgotPasswordScreen = (navProps: INavigationProps) => (
	<WithForgotPassword>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithForgotPassword>
);
