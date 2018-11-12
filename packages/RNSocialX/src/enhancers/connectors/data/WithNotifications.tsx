import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	getNotifications,
	IFriendRequest,
	IFriendResponse,
	IRemoveNotificationInput,
	removeNotification,
} from '../../../store/data/notifications';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	friendRequests: IFriendRequest[];
	friendResponses: IFriendResponse[];
}

interface IActionProps {
	removeNotification: (removeNotificationInput: IRemoveNotificationInput) => void;
	getNotifications: () => void;
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

const selectFriendRequests = createSelector(
	(state: IApplicationState) => state.data.notifications.friendRequests,
	(friendRequests) => friendRequests,
);

const selectFriendResponses = createSelector(
	(state: IApplicationState) => state.data.notifications.friendResponses,
	(friendResponses) => friendResponses,
);

const mapStateToProps = (state: IApplicationState) => ({
	friendRequests: selectFriendRequests(state),
	friendResponses: selectFriendResponses(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	removeNotification: (removeNotificationInput: IRemoveNotificationInput) =>
		dispatch(removeNotification(removeNotificationInput)),
	getNotifications: () => dispatch(getNotifications()),
});

export const WithNotifications: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
