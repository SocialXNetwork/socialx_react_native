import {action} from '@storybook/addon-actions';
import {boolean, number, select, text, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Animated} from 'react-native';
import {DataProvider} from 'recyclerlistview';

import {IWallPostCardProps} from '../../../../src/components';
import {PROFILE_TAB_ICON_TYPES} from '../../../../src/environment/consts';
import {UserProfileScreenView} from '../../../../src/screens/mainStack/UserProfileScreen.view';
import {ILike, ISimpleComment, MediaTypeImage, SearchResultKind} from '../../../../src/types';

storiesOf('Screens/mainStack', module)
	.addDecorator(withKnobs)
	.add('UserProfileScreen', () => {
		const avatar = 'https://www.w3schools.com/w3css/img_lights.jpg';
		const userAvatar =
			'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350';

		const likes: ILike[] = [
			{
				userId: '1',
				userName: 'lorem',
			},
			{
				userId: '2',
				userName: 'ipsum',
			},
		];

		const bestComments: ISimpleComment[] = [
			{
				id: '1',
				text: 'Lorem ipsum dolor sit amet.',
				likes,
				owner: {
					userId: '2',
					userName: 'ipsum',
				},
			},
		];

		const recentPosts: IWallPostCardProps[] = [
			{
				id: '1',
				postText: 'Lorem ipsum dolor sit amet.',
				location: 'Dolor',
				taggedFriends: [{fullName: 'Lorem'}, {fullName: 'Ipsum'}],
				timestamp: new Date(Date.now()),
				owner: {
					userId: '999',
					userName: 'ipsum',
				},
				currentUser: {
					avatarURL: userAvatar,
				},
				governanceVersion: false,
				numberOfSuperLikes: 0,
				numberOfComments: 1,
				numberOfWalletCoins: 0,
				onImagePress: () => {
					/**/
				},
				onLikeButtonPress: () => {
					/**/
				},
				onDeletePress: () => {
					/**/
				},
				onUserPress: () => {
					/**/
				},
				onCommentPress: () => {
					/**/
				},
				onAddComment: () => {
					/**/
				},
				likedByMe: false,
				canDelete: false,
				media: [
					{
						url:
							'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
						hash: '131289fsdf03yr9hehdiwb32',
						type: MediaTypeImage,
						extension: 'jpg',
						size: 51231,
						numberOfLikes: 0,
						numberOfComments: 0,
					},
				],
				likes,
				bestComments,
				listLoading: false,
				suggested: undefined,
				noInput: false,
				getText: (value) => value,
				marginBottom: 20,
			},
		];

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
				recentPosts={recentPosts}
				loadMorePhotosHandler={action('loadMorePhotos')}
				onCommentPress={action('onCommentPress')}
				onImagePress={action('onImagePress')}
				onLikePress={onLikePress}
				onRefresh={action('onRefresh')}
				refreshing={refreshing}
				gridMediaProvider={gridMediaProvider}
				onViewMediaFullscreen={action('onViewMediaFullScreen')}
				currentUserId={'999'}
				onIconPress={action('onIconPress')}
				listTranslate={new Animated.Value(0)}
				gridTranslate={new Animated.Value(0)}
				activeTab={PROFILE_TAB_ICON_TYPES.LIST}
				containerHeight={containerHeight}
				onLayoutChange={action('onLayoutChange')}
				isLoading={isLoading}
			/>
		);
	});
