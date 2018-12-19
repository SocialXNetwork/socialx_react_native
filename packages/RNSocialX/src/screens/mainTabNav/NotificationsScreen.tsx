import * as React from 'react';

import { INavigationProps } from '../../types';
import { NotificationsScreenView } from './NotificationsScreen.view';

import { WithNavigationHandlers } from '../../enhancers/intermediary';
import {
	IWithNotificationsEnhancedActions,
	IWithNotificationsEnhancedData,
	WithNotifications,
} from '../../enhancers/screens';

interface INotificationsScreenProps
	extends INavigationProps,
		IWithNotificationsEnhancedData,
		IWithNotificationsEnhancedActions {
	onViewUserProfile: (alias: string) => void;
}

class Screen extends React.Component<INotificationsScreenProps> {
	private willFocusScreen: any;

	public componentDidMount() {
		this.willFocusScreen = this.props.navigation.addListener('willFocus', this.onWillFocusScreen);
	}

	public componentWillUnmount() {
		this.willFocusScreen.remove();
	}

	public render() {
		const {
			notificationIds,
			refreshing,
			getNotifications,
			onViewUserProfile,
			getText,
		} = this.props;

		return (
			<NotificationsScreenView
				ids={notificationIds}
				refreshing={refreshing}
				onRefresh={getNotifications}
				onViewUserProfile={onViewUserProfile}
				onShowOptions={this.onShowOptionsHandler}
				getText={getText}
			/>
		);
	}

	private onWillFocusScreen = () => {
		if (this.props.unread) {
			this.props.markNotificationsAsRead();
		}
	};

	private onShowOptionsHandler = (id: string) => {
		const { showOptionsMenu, getText } = this.props;

		const items = [
			{
				label: getText('comments.screen.advanced.menu.delete'),
				icon: 'ios-trash',
				actionHandler: () => undefined,
			},
		];

		showOptionsMenu(items);
	};
}

export const NotificationsScreen = (props: INavigationProps) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{(nav) => (
			<WithNotifications>
				{(notifications) => (
					<Screen
						{...props}
						{...notifications.data}
						{...notifications.actions}
						onViewUserProfile={nav.actions.onViewUserProfile}
					/>
				)}
			</WithNotifications>
		)}
	</WithNavigationHandlers>
);
