import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import { IAuthData } from '../../../store/auth/gun';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	auth: IAuthData | null;
}

type IProps = IDataProps;
export type IAuthProps = IProps;

interface IChildren {
	children: (props: IProps) => JSX.Element;
}

class Enhancer extends React.Component<IProps & IChildren> {
	render() {
		const { children, ...props } = this.props;
		return children(props);
	}
}

const selectAuth = createSelector(
	(state: IApplicationState) => state.auth.database.gun,
	(gun) => gun,
);

const mapStateToProps = (state: IApplicationState) => ({
	auth: selectAuth(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({});

export const WithAuth: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
