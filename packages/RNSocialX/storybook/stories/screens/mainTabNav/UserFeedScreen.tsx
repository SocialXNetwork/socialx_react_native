import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { Animated } from 'react-native';

import { currentUser, getTextMock, posts } from '../../../../src/mocks';
import { UserFeedScreenView } from '../../../../src/screens/mainTabNav/UserFeedScreen/UserFeedScreen.view';

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.add('UserFeedScreen', () => {
		const avatar = 'https://www.w3schools.com/w3css/img_lights.jpg';
		const refreshing = boolean('refreshing', false);
		const loadingMorePosts = boolean('loadingMorePosts', false);
		const canLoadMorePosts = boolean('canLoadMorePosts', false);
		const shareSectionPlaceholder = text('shareSectionPlaceholder', 'Lorem ipsum dolor sit amet.');

		return (
			<UserFeedScreenView
				currentUser={currentUser}
				avatarImage={avatar}
				posts={posts}
				refreshing={refreshing}
				onRefresh={action('onRefresh')}
				onLoadMorePosts={action('onLoadMorePosts')}
				onCreateWallPost={action('onCreateWallPost')}
				onImagePress={action('onImagePress')}
				onCommentPress={action('onCommentPress')}
				shareSectionPlaceholder={shareSectionPlaceholder}
				onLikePress={(likedByMe: boolean) => !likedByMe}
				onDeletePostPress={action('onDeletePress')}
				onUserPress={action('onUserPress')}
				loadingMorePosts={loadingMorePosts}
				canLoadMorePosts={canLoadMorePosts}
				onAddComment={action('onAddComment')}
				onSubmitComment={action('onSubmitComment')}
				scrollRef={React.createRef()}
				scrollY={new Animated.Value(0)}
				getText={getTextMock}
				onBlockUser={action('onBlockUser')}
				onReportProblem={action('onReportProblem')}
				showDotsMenuModal={action('showDotsMenuModal')}
				likeError={false}
				creatingPost={false}
				skeletonPost={posts[0]}
			/>
		);
	});
