/**
 * TODO list:
 * 1. Props data: showModalForSMSCode, resendingCode, smsCodeErrorMessage,
 * 2. Props actions: doRegister, resendSMSCode, validateSMSCode
 * 3. Take care of account recover data + we need to upload profile photo before createAccount
 */

import * as React from 'react';
import { IRegisterData } from '../../../screens/preAuth/RegisterScreen.view';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';

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
		doRegister: (registerData: IRegisterData) => {
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
	doRegister: (registerData: IRegisterData) => void;
}

interface IWithRegisterEnhancedProps {
	data: IWithRegisterEnhancedData;
	actions: IWithRegisterEnhancedActions;
}

interface IWithRegisterProps {
	children(props: IWithRegisterEnhancedProps): JSX.Element;
}

interface IWithRegisterState {}

export class WithRegister extends React.Component<
	IWithRegisterProps,
	IWithRegisterState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithAccounts>
						{(accountsProps) =>
							this.props.children({
								data: mock.data,
								actions: {
									...mock.actions,
									getText: i18nProps.getText,
									doRegister: (registerData: IRegisterData) =>
										accountsProps.createAccount({
											recover: {
												question1: '',
												question2: '',
												reminder: '',
											},
											username: registerData.userName,
											password: registerData.password,
											email: registerData.email,
											avatar: registerData.avatarImage as string,
											fullName: registerData.name,
											miningEnabled: false,
											aboutMeText: '',
										}),
								},
							})
						}
					</WithAccounts>
				)}
			</WithI18n>
		);
	}
}
