import { action } from '@storybook/addon-actions';
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { Animated } from 'react-native';
import { DataProvider } from 'recyclerlistview';

import { PROFILE_TAB_ICON_TYPES } from '../../../../src/environment/consts';
import { currentUser, getTextMock, posts } from '../../../../src/mocks';
import { UserProfileScreenView } from '../../../../src/screens/mainStack/UserProfileScreen.view';
import { FRIEND_TYPES } from '../../../../src/types';

storiesOf('Screens/mainStack', module)
	.addDecorator(withKnobs)
	.add('UserProfileScreen', () => {
		const visitedUser = {
			userId: 'username',
			avatar: 'https://www.w3schools.com/w3css/img_lights.jpg',
			fullName: 'Alex',
			userName: 'username',
			description: 'Bio',
			numberOfLikes: 65,
			numberOfPhotos: 2,
			numberOfFriends: 78,
			numberOfComments: 100,
			media: [],
			recentPosts: [],
			relationship: select(
				'relationship',
				{
					friend: FRIEND_TYPES.MUTUAL,
					notFriend: FRIEND_TYPES.NOT_FRIEND,
					requestSent: FRIEND_TYPES.PENDING,
				},
				FRIEND_TYPES.MUTUAL,
			),
		};

		const loadingPosts = boolean('loadingPosts', false);
		const refreshing = boolean('refreshing', false);
		const isLoading = boolean('isLoading', false);
		const containerHeight = number('containerHeight', 0);

		const dataProvider = new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		});

		const onLikePress = (likedByMe: boolean) => {
			return !likedByMe;
		};

		return (
			<UserProfileScreenView
				visitedUser={visitedUser}
				loadingPosts={loadingPosts}
				recentPosts={posts}
				refreshing={refreshing}
				dataProvider={dataProvider}
				currentUser={currentUser}
				listTranslate={new Animated.Value(0)}
				gridTranslate={new Animated.Value(0)}
				activeTab={PROFILE_TAB_ICON_TYPES.LIST}
				containerHeight={containerHeight}
				isLoading={isLoading}
				onIconPress={action('onIconPress')}
				onLoadMorePhotos={action('onLoadMorePhotos')}
				onAddFriend={action('onAddFriend')}
				onShowFriendshipOptions={action('onShowFriendshipOptions')}
				onProfilePhotoPress={action('onViewProfilePhoto')}
				onCommentPress={action('onCommentPress')}
				onImagePress={action('onImagePress')}
				onLikeButtonPress={onLikePress}
				onRefresh={action('onRefresh')}
				onViewMediaFullscreen={action('onViewMediaFullScreen')}
				onLayoutChange={action('onLayoutChange')}
				onClose={action('onClose')}
				onGoBack={action('onGoBack')}
				// @ts-ignore
				navigation={null}
				getText={getTextMock}
			/>
		);
	});
