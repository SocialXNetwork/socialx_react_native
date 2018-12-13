import * as React from 'react';

import { INavigationProps } from '../../types';
import { NotificationsScreenView } from './NotificationsScreen.view';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import {
	IWithNotificationsEnhancedActions,
	IWithNotificationsEnhancedData,
	WithNotifications,
} from '../../enhancers/screens';

type INotificationsScreenProps = INavigationProps &
	IWithNotificationsEnhancedData &
	IWithNotificationsEnhancedActions &
	IWithNavigationHandlersEnhancedActions;

class Screen extends React.Component<INotificationsScreenProps> {
	private willFocusScreen: any;

	public componentDidMount() {
		this.willFocusScreen = this.props.navigation.addListener('willFocus', (payload) => {
			console.log('willFocus', payload);
		});
	}

	public componentWillUnmount() {
		this.willFocusScreen.remove();
	}

	public render() {
		const { notifications, refreshing, getNotifications, getText } = this.props;

		return (
			<NotificationsScreenView
				notifications={notifications}
				refreshing={refreshing}
				onRefresh={getNotifications}
				onViewUserProfile={(userId) => this.props.onViewUserProfile(userId)}
				onShowOptions={this.onShowOptionsHandler}
				getText={getText}
			/>
		);
	}

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
					<Screen {...props} {...notifications.data} {...notifications.actions} {...nav.actions} />
				)}
			</WithNotifications>
		)}
	</WithNavigationHandlers>
);
