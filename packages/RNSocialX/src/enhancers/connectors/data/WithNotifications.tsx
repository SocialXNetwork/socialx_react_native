import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	getNotifications,
	INotificationReturnData,
	IRemoveNotificationInput,
	removeNotification,
} from '../../../store/data/notifications';
import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	notifications: INotificationReturnData[];
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

const selectNotifications = createSelector(
	(state: IApplicationState) => state.data.notifications.notifications,
	(notifications) => notifications,
);

const mapStateToProps = (state: IApplicationState) => ({
	notifications: selectNotifications(state),
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
