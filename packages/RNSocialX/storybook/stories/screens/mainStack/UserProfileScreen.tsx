import { action } from '@storybook/addon-actions';
import {
	boolean,
	number,
	select,
	text,
	withKnobs,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { Animated } from 'react-native';
import { DataProvider } from 'recyclerlistview';

import { PROFILE_TAB_ICON_TYPES } from '../../../../src/environment/consts';
import { currentUser, posts } from '../../../../src/mocks';
import { UserProfileScreenView } from '../../../../src/screens/mainStack/UserProfileScreen.view';
import { SearchResultKind } from '../../../../src/types';

storiesOf('Screens/mainStack', module)
	.addDecorator(withKnobs)
	.add('UserProfileScreen', () => {
		const avatar = 'https://www.w3schools.com/w3css/img_lights.jpg';

		const refreshing = boolean('refreshing', false);
		const isLoading = boolean('isLoading', false);
		const fullName = text('fullName', 'Alex Sirbu');
		const userName = text('userName', 'alexsirbu');
		const numberOfPhotos = number('numberOfPhotos', 2);
		const numberOfLikes = number('numberOfLikes', 65);
		const numberOfFriends = number('numberOfFriends', 78);
		const numberOfViews = number('numberOfViews', 100);
		const relationship = select(
			'relationship',
			{
				friend: SearchResultKind.Friend,
				notFriend: SearchResultKind.NotFriend,
				requestSent: SearchResultKind.FriendRequestSent,
				group: SearchResultKind.Group,
			},
			SearchResultKind.Friend,
		);
		const aboutMeText = text('aboutMeText', 'This is me.');
		const containerHeight = number('containerHeight', 0);

		const gridMediaProvider = new DataProvider((row1: any, row2: any) => {
			return row1.index !== row2.index;
		});

		const onLikePress = (likedByMe: boolean) => {
			return !likedByMe;
		};

		return (
			<UserProfileScreenView
				avatarURL={avatar}
				fullName={fullName}
				userName={userName}
				numberOfPhotos={numberOfPhotos}
				numberOfLikes={numberOfLikes}
				numberOfFriends={numberOfFriends}
				numberOfViews={numberOfViews}
				getText={(value) => value}
				onAddFriend={action('onAddFriend')}
				onShowFriendshipOptions={action('onShowFriendshipOptions')}
				relationship={relationship}
				onViewProfilePhoto={action('onViewProfilePhoto')}
				aboutMeText={aboutMeText}
				recentPosts={posts}
				loadMorePhotosHandler={action('loadMorePhotos')}
				onCommentPress={action('onCommentPress')}
				onImagePress={action('onImagePress')}
				onLikeButtonPress={onLikePress}
				onRefresh={action('onRefresh')}
				refreshing={refreshing}
				gridMediaProvider={gridMediaProvider}
				onViewMediaFullscreen={action('onViewMediaFullScreen')}
				currentUser={currentUser}
				onIconPress={action('onIconPress')}
				listTranslate={new Animated.Value(0)}
				gridTranslate={new Animated.Value(0)}
				activeTab={PROFILE_TAB_ICON_TYPES.LIST}
				containerHeight={containerHeight}
				onLayoutChange={action('onLayoutChange')}
				isLoading={isLoading}
				onClose={action('onClose')}
				onDeletePress={action('onDeletePress')}
				onUserPress={action('onUserPress')}
				onSubmitComment={action('onSubmitComment')}
				onAddComment={action('onAddComment')}
				onBlockUser={action('onBlockUser')}
				onReportProblem={action('onReportProblem')}
			/>
		);
	});
