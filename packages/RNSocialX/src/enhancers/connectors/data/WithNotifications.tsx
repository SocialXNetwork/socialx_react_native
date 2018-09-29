import {
	INotificationData,
	INotificationsCallbackData,
	IRemoveNotificationInput,
} from '@socialx/api-data';
import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	createComment,
	getCommentLikes,
	getPostComments,
	ICommentIdInput,
	ICommentsApiData,
	ICreateCommentInput,
	IPostIdInput,
	likeComment,
} from '../../../store/data/comments';
import {
	removeComment,
	unlikeComment,
} from '../../../store/data/comments/actions';
import { createNotification } from '../../../store/data/notifications';
import {
	getNotifications,
	removeNotification,
} from '../../../store/data/notifications/actions';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	notifications: INotificationsCallbackData | null;
	notification: INotificationData | null;
}

interface IActionProps {
	createNotification: (createNotificationInput: INotificationData) => void;
	removeNotification: (
		removeNotificationInput: IRemoveNotificationInput,
	) => void;
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

const selectNotifications = createSelector(
	(state: IApplicationState) => state.data.notifications.notifications,
	(notifications) => notifications,
);

const mapStateToProps = (state: IApplicationState) => ({
	notifications: selectNotifications(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	createNotification: (createNotificationInput: INotificationData) =>
		dispatch(createNotification(createNotificationInput)),
	removeNotification: (removeNotificationInput: IRemoveNotificationInput) =>
		dispatch(removeNotification(removeNotificationInput)),
	getNotifications: () => dispatch(getNotifications()),
});

export const WithNotifications: ConnectedComponentClass<
	JSX.Element,
	IChildren
> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
