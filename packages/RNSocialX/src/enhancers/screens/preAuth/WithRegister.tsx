/**
 * TODO list:
 * 2. Props actions: register
 * 2.1  We need to upload profile photo before createAccount
 * 3. LATER - data props: showModalForSMSCode, resendingCode, smsCodeErrorMessage (KEEP MOCK DATA FOR NOW!)
 * 3. LATER - actions props: resendSMSCode, validateSMSCode (KEEP MOCK ACTIONS FOR NOW!)
 * 4. LATER - take care of account recover data
 */

import * as React from 'react';
import { IRegisterData } from '../../../screens/preAuth/RegisterScreen.view';
import { IGlobal, ITranslatedProps } from '../../../types';

import { ActionTypes } from '../../../store/data/accounts/Types';
import { IError } from '../../../store/ui/activities';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { getActivity } from '../../helpers/';

const mock: IWithRegisterEnhancedProps = {
	data: {
		errors: [],
		loading: false,
	},
	actions: {
		register: (registerData: IRegisterData) => {
			/**/
		},
		setGlobal: (global: IGlobal) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithRegisterEnhancedData {
	loading: boolean;
	errors: IError[];
}

export interface IWithRegisterEnhancedActions extends ITranslatedProps {
	register: (registerData: IRegisterData) => void;
	setGlobal: (global: IGlobal) => void;
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
					<WithGlobals>
						{({ setGlobal }) => (
							<WithActivities>
								{({ activities, errors }) => (
									<WithAccounts>
										{(accountsProps) =>
											this.props.children({
												data: {
													...mock.data,
													loading: getActivity(
														activities,
														ActionTypes.CREATE_ACCOUNT,
													),
													errors,
												},
												actions: {
													...mock.actions,
													register: (registerData: IRegisterData) =>
														accountsProps.createAccount({
															recover: {
																question1: 'question1',
																question2: 'questions2',
																reminder: 'password',
															},
															username: registerData.userName,
															password: registerData.password,
															email: registerData.email,
															avatar: registerData.avatar,
															fullName: registerData.name,
															miningEnabled: true,
															aboutMeText: 'about me text',
														}),
													setGlobal,
													getText: i18nProps.getText,
												},
											})
										}
									</WithAccounts>
								)}
							</WithActivities>
						)}
					</WithGlobals>
				)}
			</WithI18n>
		);
	}
}
