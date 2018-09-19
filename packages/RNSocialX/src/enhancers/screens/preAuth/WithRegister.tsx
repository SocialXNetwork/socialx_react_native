/**
 * TODO list:
 * 1. Props data: showModalForSMSCode, resendingCode, smsCodeErrorMessage,
 * 2. Props actions: doRegister, resendSMSCode, validateSMSCode
 */

import * as React from 'react';
import {RegisterData} from '../../../screens/preAuth/RegisterScreen.view';
import {ITranslatedProps} from '../../../types';

const mock: IWithRegisterEnhancedProps = {
	data: {
		showModalForSMSCode: false,
		resendingCode: false,
		smsCodeErrorMessage: null,
	},
	actions: {
		validateSMSCode: (code: string) => {
			/**/
		},
		resendSMSCode: () => {
			/**/
		},
		doRegister: (registerData: RegisterData) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithRegisterEnhancedData {
	showModalForSMSCode: boolean;
	resendingCode: boolean;
	smsCodeErrorMessage: string | null;
}

export interface IWithRegisterEnhancedActions extends ITranslatedProps {
	validateSMSCode: (code: string) => void;
	resendSMSCode: () => void;
	doRegister: (registerData: RegisterData) => void;
}

interface IWithRegisterEnhancedProps {
	data: IWithRegisterEnhancedData;
	actions: IWithRegisterEnhancedActions;
}

interface IWithRegisterProps {
	children(props: IWithRegisterEnhancedProps): JSX.Element;
}

interface IWithRegisterState {}

export class WithRegister extends React.Component<IWithRegisterProps, IWithRegisterState> {
	render() {
		return this.props.children({data: mock.data, actions: mock.actions});
	}
}
