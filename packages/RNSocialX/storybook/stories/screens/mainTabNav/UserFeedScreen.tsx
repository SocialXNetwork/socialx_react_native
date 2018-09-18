import {action} from '@storybook/addon-actions';
import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Animated} from 'react-native';

import {IWallPostCardProps} from '../../../../src/components';
import {UserFeedScreenView} from '../../../../src/screens/mainTabNav/UserFeedScreen/UserFeedScreen.view';
import {ILike, ISimpleComment, MediaTypeImage} from '../../../../src/types';
import CenterView from '../../../helpers/CenterView';

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('UserFeedScreen', () => {
		const avatar = {uri: 'https://www.w3schools.com/w3css/img_lights.jpg'};
		const userAvatar =
			'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350';

		const currentUser = {
			userId: '999',
			userName: 'alexsirbu',
			avatarURL: userAvatar,
		};

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

		const posts: IWallPostCardProps[] = [
			{
				id: '1',
				postText: 'Lorem ipsum dolor sit amet.',
				location: 'Dolor',
				taggedFriends: [{fullName: 'Lorem'}, {fullName: 'Ipsum'}],
				timestamp: new Date('August 25, 2018 19:25:00'),
				owner: {
					userId: '999',
					userName: 'alexsirbu',
					avatarURL: userAvatar,
				},
				currentUser,
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
		const noPosts = boolean('noPosts', false);
		const loadingMore = boolean('loadingMore', false);
		const hasMorePosts = boolean('hasMorePosts', false);
		const isLoading = boolean('isLoading', false);
		const shareSectionPlaceholder = text('shareSectionPlaceholder', 'Lorem ipsum dolor sit amet.');

		return (
			<UserFeedScreenView
				currentUser={currentUser}
				avatarImage={avatar}
				wallPosts={posts}
				refreshing={refreshing}
				onRefresh={action('onRefresh')}
				onLoadMorePosts={action('onLoadMorePosts')}
				onShowNewWallPostPress={action('onShowNewWallPostPress')}
				onMediaPress={action('onMediaPress')}
				onCommentPress={action('onCommentPress')}
				noPosts={noPosts}
				shareSectionPlaceholder={shareSectionPlaceholder}
				onLikePress={(likedByMe: boolean) => !likedByMe}
				onPostDeletePress={action('onPostDeletePress')}
				onUserPress={action('onUserPress')}
				loadingMore={loadingMore}
				hasMorePosts={hasMorePosts}
				onAddCommentPress={action('onAddCommentPress')}
				shareSectionOpacityInterpolation={1}
				scrollRef={React.createRef()}
				scrollY={new Animated.Value(0)}
				isLoading={isLoading}
				getText={(value) => value}
			/>
		);
	});
