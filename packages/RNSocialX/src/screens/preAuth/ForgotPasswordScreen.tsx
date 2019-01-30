import React from 'react';

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

const Screen: React.SFC<IProps> = ({ navigation, dictionary, sendResetCode, onGoBack }) => (
	<ForgotPasswordScreenView
		dictionary={dictionary}
		onSendResetCode={sendResetCode}
		onGoBack={onGoBack}
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
