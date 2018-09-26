import {
	IChangePasswordInput,
	ICreateAccountInput,
	ICredentials,
	IRecoverAccountInput,
} from '@socialx/api-data';
import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	changePassword,
	createAccount,
	getIsAccountLoggedIn,
	IAccount,
	login,
	logout,
	recoverAccount,
	trustAccount,
} from '../../../store/data/accounts';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	accounts: IAccount[];
}

interface IActionProps {
	changePassword: (changePasswordInput: IChangePasswordInput) => void;
	createAccount: (createAccountInput: ICreateAccountInput) => void;
	getIsAccountLoggedIn: () => void;
	login: (credentials: ICredentials) => void;
	logout: () => void;
	recoverAccount: (recoverAccountInput: IRecoverAccountInput) => void;
	trustAccount: () => void;
}

type IProps = IDataProps & IActionProps;

interface IChildren {
	children: (props: IProps) => JSX.Element;
}

class Enhancer extends React.Component<IProps & IChildren> {
	render() {
		const { children, ...props } = this.props;
		return children(props);
	}
}

const selectAccounts = createSelector(
	(state: IApplicationState) => state.data.accounts.accounts,
	(accounts) => accounts,
);

const mapStateToProps = (state: IApplicationState) => ({
	accounts: selectAccounts(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	changePassword: (changePasswordInput: IChangePasswordInput) =>
		dispatch(changePassword(changePasswordInput)),
	createAccount: (createAccountInput: ICreateAccountInput) =>
		dispatch(createAccount(createAccountInput)),
	getIsAccountLoggedIn: () => dispatch(getIsAccountLoggedIn()),
	login: (credentials: ICredentials) => dispatch(login(credentials)),
	logout: () => dispatch(logout()),
	recoverAccount: (recoverAccountInput: IRecoverAccountInput) =>
		dispatch(recoverAccount(recoverAccountInput)),
	trustAccount: () => dispatch(trustAccount()),
});

export const WithAccounts: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer) as any;
