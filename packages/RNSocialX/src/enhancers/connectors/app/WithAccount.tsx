import {IChangePasswordInput, ICreateAccountInput, ICredentials, IRecoverAccountInput} from '@socialx/api-data';
import * as React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {IApplicationState} from '../../../store';
import {
	changePassword,
	createAccount,
	IAccount,
	isAccountLoggedIn,
	login,
	logout,
	recoverAccount,
	trustAccount,
} from '../../../store/app/accounts';
import {IThunkDispatch} from '../../../store/types';

interface IDataProps {
	currentAccount: IAccount | null;
}

interface IActionProps {
	changePassword: (changePasswordInput: IChangePasswordInput) => void;
	createAccount: (createAccountInput: ICreateAccountInput) => void;
	isAccountLoggedIn: () => void;
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
		const {children, ...props} = this.props;
		return children(props);
	}
}

const selectCurrentAccount = createSelector(
	(state: IApplicationState) => state.app.accounts.currentAccount,
	(currentAccount) => currentAccount,
);

const mapStateToProps = (state: IApplicationState) => ({
	currentAccount: selectCurrentAccount(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	changePassword: (changePasswordInput: IChangePasswordInput) => dispatch(changePassword(changePasswordInput)),
	createAccount: (createAccountInput: ICreateAccountInput) => dispatch(createAccount(createAccountInput)),
	isAccountLoggedIn: () => dispatch(isAccountLoggedIn()),
	login: (credentials: ICredentials) => dispatch(login(credentials)),
	logout: () => dispatch(logout()),
	recoverAccount: (recoverAccountInput: IRecoverAccountInput) => dispatch(recoverAccount(recoverAccountInput)),
	trustAccount: () => dispatch(trustAccount()),
});

export const WithAccount = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer);
