import * as React from 'react';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithForgotPasswordEnhancedActions,
	IWithForgotPasswordEnhancedData,
	WithForgotPassword,
} from '../../enhancers/screens';

import { INavigationProps } from '../../types';
import { ForgotPasswordScreenView } from './ForgotPasswordScreen.view';

interface IProps
	extends INavigationProps,
		IWithForgotPasswordEnhancedData,
		IWithForgotPasswordEnhancedActions {
	onGoBack: () => void;
}

const onGoBackHandler = (navigation: any) => {
	navigation.goBack(null);
};

const Screen: React.SFC<IProps> = ({ navigation, dictionary, sendResetCode }) => (
	<ForgotPasswordScreenView
		dictionary={dictionary}
		onSendResetCode={sendResetCode}
		onGoBack={() => onGoBackHandler(navigation)}
	/>
);

export const ForgotPasswordScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{(nav) => (
			<WithForgotPassword>
				{({ data, actions }) => (
					<Screen {...props} {...data} {...actions} onGoBack={nav.actions.onGoBack} />
				)}
			</WithForgotPassword>
		)}
	</WithNavigationHandlers>
);
