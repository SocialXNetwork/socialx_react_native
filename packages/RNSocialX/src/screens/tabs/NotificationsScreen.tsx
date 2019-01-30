import React from 'react';

import {
	IWithNavigationHandlersEnhancedActions,
	WithNavigationHandlers,
} from '../../enhancers/intermediary';
import {
	IWithNotificationsEnhancedActions,
	IWithNotificationsEnhancedData,
	WithNotifications,
} from '../../enhancers/screens';

import { Icons } from '../../environment/theme';
import { INavigationProps } from '../../types';
import { NotificationsScreenView } from './NotificationsScreen.view';

interface IProps
	extends INavigationProps,
		IWithNotificationsEnhancedData,
		IWithNotificationsEnhancedActions,
		IWithNavigationHandlersEnhancedActions {}

class Screen extends React.Component<IProps> {
	public render() {
		const {
			notificationIds,
			refreshing,
			dictionary,
			getNotifications,
			onViewUserProfile = () => undefined,
		} = this.props;

		return (
			<NotificationsScreenView
				ids={notificationIds}
				refreshing={refreshing}
				dictionary={dictionary}
				onRefresh={getNotifications}
				onWillFocus={this.onWillFocusHandler}
				onViewUserProfile={onViewUserProfile}
				onShowOptions={this.onShowOptionsHandler}
			/>
		);
	}

	private onWillFocusHandler = () => {
		if (this.props.unread) {
			this.props.markNotificationsAsRead();
		}
	};

	private onShowOptionsHandler = (id: string) => {
		const { showOptionsMenu, dictionary } = this.props;

		const items = [
			{
				label: dictionary.components.modals.options.delete,
				icon: Icons.delete,
				actionHandler: () => undefined,
			},
		];

		showOptionsMenu(items);
	};
}

export const NotificationsScreen = (props: INavigationProps) => (
	<WithNavigationHandlers>
		{(nav) => (
			<WithNotifications>
				{({ data, actions }) => (
					<Screen
						{...props}
						{...data}
						{...actions}
						onViewUserProfile={nav.actions.onViewUserProfile}
						onGoBack={() => undefined}
					/>
				)}
			</WithNotifications>
		)}
	</WithNavigationHandlers>
);
