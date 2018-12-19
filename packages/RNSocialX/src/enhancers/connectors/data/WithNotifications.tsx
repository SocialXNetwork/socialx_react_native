import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';

import { IApplicationState } from '../../../store';
import { getNotifications, markNotificationsAsRead } from '../../../store/data/notifications';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	ids: string[];
	unread: string[];
}

interface IActionProps {
	getNotifications: () => void;
	markNotificationsAsRead: () => void;
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

const selectIds = createSelector(
	(state: IApplicationState) => state.data.notifications.ids,
	(ids) => ids,
);

const selectUnread = createSelector(
	(state: IApplicationState) => state.data.notifications.unread,
	(unread) => unread,
);

const mapStateToProps = (state: IApplicationState) => ({
	ids: selectIds(state),
	unread: selectUnread(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	getNotifications: () => dispatch(getNotifications()),
	markNotificationsAsRead: () => dispatch(markNotificationsAsRead()),
});

export const WithNotifications: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
