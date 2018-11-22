import * as React from 'react';

import { SCREENS, TABS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { NotificationsScreenView } from './NotificationsScreen.view';

import {
	IWithNotificationsEnhancedActions,
	IWithNotificationsEnhancedData,
	WithNotifications,
} from '../../enhancers/screens';

type INotificationsScreenProps = INavigationProps &
	IWithNotificationsEnhancedData &
	IWithNotificationsEnhancedActions;

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
				onViewUserProfile={this.onViewUserProfileHandler}
				onShowOptions={this.onShowOptionsHandler}
				getText={getText}
			/>
		);
	}

	private onViewUserProfileHandler = (userId: string) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.UserProfile,
			params: { userId, origin: TABS.Feed },
		});
		navigation.navigate(SCREENS.UserProfile);
	};

	private onShowOptionsHandler = (notificationId: string) => {
		const { removeNotification, showOptionsMenu, getText } = this.props;

		const items = [
			{
				label: getText('comments.screen.advanced.menu.delete'),
				icon: 'ios-trash',
				actionHandler: async () => {
					await removeNotification({ notificationId });
				},
			},
		];

		showOptionsMenu(items);
	};
}

export const NotificationsScreen = (navProps: INavigationProps) => (
	<WithNotifications>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithNotifications>
);
