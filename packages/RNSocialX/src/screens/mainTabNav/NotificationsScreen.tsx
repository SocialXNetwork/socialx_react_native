import * as React from 'react';
import { Alert } from 'react-native';

import {
	IWithNotificationsEnhancedActions,
	IWithNotificationsEnhancedData,
	WithNotifications,
} from '../../enhancers/screens';
import { SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import { NotificationsScreenView } from './NotificationsScreen.view';

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
		const {
			notifications,
			refreshing,
			loadNotifications,
			acceptFriendRequest,
			declineFriendRequest,
			removeNotification,
			getText,
		} = this.props;

		return (
			<NotificationsScreenView
				notifications={notifications}
				refreshing={refreshing}
				onRefresh={loadNotifications}
				onSuperLikedPhotoPressed={this.superLikedPhotoPressedHandler}
				onFriendRequestApprove={(username) => acceptFriendRequest({ username })}
				onFriendRequestDecline={(username: string) => {
					declineFriendRequest({ username });
				}}
				onGroupRequestApprove={this.onGroupRequestApprovedHandler}
				onGroupRequestDecline={this.onGroupRequestDeclinedHandler}
				onViewUserProfile={this.onViewUserProfile}
				getText={getText}
			/>
		);
	}

	private superLikedPhotoPressedHandler = (postId: string) => {
		Alert.alert('superLikedPhotoPressedHandler: ' + postId);
	};

	private onGroupRequestApprovedHandler = (notificationId: string) => {
		Alert.alert('groupRequestApprovedHandler: ' + notificationId);
	};

	private onGroupRequestDeclinedHandler = (notificationId: string) => {
		Alert.alert('onGroupRequestDeclinedHandler: ' + notificationId);
	};

	private onViewUserProfile = (userId: string) => {
		const { navigation, setNavigationParams } = this.props;
		setNavigationParams({
			screenName: SCREENS.UserProfile,
			params: { userId },
		});
		navigation.navigate(SCREENS.UserProfile);
	};
}

export const NotificationsScreen = (navProps: INavigationProps) => (
	<WithNotifications>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithNotifications>
);
