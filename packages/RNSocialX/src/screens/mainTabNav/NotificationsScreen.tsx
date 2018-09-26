import * as React from 'react';
import { Alert } from 'react-native';

import {
	IWithNotificationsEnhancedActions,
	IWithNotificationsEnhancedData,
	WithNotifications,
} from '../../enhancers/screens';
import { INavigationProps } from '../../types';
import { NotificationsScreenView } from './NotificationsScreen.view';

type INotificationsScreenProps = INavigationProps &
	IWithNotificationsEnhancedData &
	IWithNotificationsEnhancedActions;

class Screen extends React.Component<INotificationsScreenProps> {
	public render() {
		const {
			notifications,
			loading,
			getText,
			showConfirm,
			hideConfirm,
			refreshing,
			loadNotifications,
			acceptFriendRequest,
			declineFriendRequest,
			checkNotification,
		} = this.props;

		return (
			<NotificationsScreenView
				isLoading={loading}
				notifications={notifications}
				refreshing={refreshing}
				onRefresh={loadNotifications}
				onPostThumbPressed={this.postThumbPressedHandler}
				onSuperLikedPhotoPressed={this.superLikedPhotoPressedHandler}
				onCheckNotification={checkNotification}
				onFriendRequestApproved={acceptFriendRequest}
				onFriendRequestDeclined={declineFriendRequest}
				// onGroupRequestApproved={this.groupRequestApprovedHandler}
				// onGroupRequestDeclined={this.onGroupRequestDeclinedHandler}
				onViewUserProfile={this.onViewUserProfile}
				getText={getText}
				showConfirm={showConfirm}
				hideConfirm={hideConfirm}
			/>
		);
	}

	private postThumbPressedHandler = (postId: string) => {
		Alert.alert('postThumbPressedHandler: ' + postId);
	};

	private superLikedPhotoPressedHandler = (postId: string) => {
		Alert.alert('superLikedPhotoPressedHandler: ' + postId);
	};

	// private groupRequestApprovedHandler = (requestId: string) => {
	// 	Alert.alert('groupRequestApprovedHandler: ' + requestId);
	// };

	// private onGroupRequestDeclinedHandler = (requestId: string) => {
	// 	Alert.alert('onGroupRequestDeclinedHandler: ' + requestId);
	// };

	private onViewUserProfile = (userId: string) => {
		this.props.navigation.navigate('UserProfileScreen', { userId });
	};
}

export const NotificationsScreen = (navProps: INavigationProps) => (
	<WithNotifications>
		{({ data, actions }) => <Screen {...navProps} {...data} {...actions} />}
	</WithNotifications>
);
