import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {createSelector} from 'reselect';
import {IApplicationState} from '../../../store';
import {login, logout, register, resetPassword} from '../../../store/app/auth';

interface IProps {
	currentUser: object | null;
	register: (username: string, password: string) => void;
	login: (username: string, password: string) => void;
	logout: (username: string, password: string) => void;
	resetPassword: (username: string, password: string) => void;
}

interface IChildren {
	children: (props: IProps) => JSX.Element;
}

class Enhancer extends React.Component<IProps & IChildren> {
	render() {
		const {children, ...props} = this.props;
		return children(props);
	}
}

const selectCurrentUser = createSelector(
	(state: IApplicationState) => state.app.auth.currentUser,
	(currentUser) => currentUser,
);

const mapStateToProps = (state: IApplicationState) => ({
	currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	register: (username: string, password: string) => dispatch(register(username, password)),
	login: (username: string, password: string) => dispatch(login(username, password)),
	logout: (username: string, password: string) => dispatch(logout(username, password)),
	resetPassword: (username: string, password: string) => dispatch(resetPassword(username, password)),
});

export const WithAuth = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer);
