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
import { ITranslatedProps, IUploadFileInput, IUploads } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithFiles } from '../../connectors/storage/WithFiles';

const mock: IWithRegisterEnhancedProps = {
	data: {
		uploads: [],
	},
	actions: {
		register: (registerData: IRegisterData) => {
			/**/
		},
		uploadFile: (file: IUploadFileInput) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithRegisterEnhancedData {
	uploads: IUploads[];
}

export interface IWithRegisterEnhancedActions extends ITranslatedProps {
	uploadFile: (file: IUploadFileInput) => void;
	register: (registerData: IRegisterData) => void;
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
						{(accountsProps) => (
							<WithFiles>
								{(filesProps) => {
									return this.props.children({
										// TODO: we also have the avatar upload progress here if we need it
										// filesProps.uploads -> each object contains 'path' string to identify what is being uploaded
										data: {
											uploads: filesProps.uploads,
										},
										actions: {
											...mock.actions,
											// TODO: add the avatar uploader function here
											// filesProps.uploadFile({path: 'file path here'});
											register: (registerData: IRegisterData) => {
												if (registerData.avatarImage.uri.length > 0) {
													filesProps.uploadFile({
														path: registerData.avatarImage.uri,
													});

													if (filesProps.uploads[0].done) {
														accountsProps.createAccount({
															recover: {
																question1: 'question1',
																question2: 'questions2',
																reminder: 'password',
															},
															username: registerData.userName,
															password: registerData.password,
															email: registerData.email,
															avatar: filesProps.uploads[0].hash,
															fullName: registerData.name,
															miningEnabled: true,
															aboutMeText: 'about me text',
														});
													}
												}
											},
											uploadFile: (file: IUploadFileInput) =>
												filesProps.uploadFile(file),
											getText: i18nProps.getText,
										},
									});
								}}
							</WithFiles>
						)}
					</WithAccounts>
				)}
			</WithI18n>
		);
	}
}
