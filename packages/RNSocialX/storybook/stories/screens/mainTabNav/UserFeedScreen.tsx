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
		const noPosts = boolean('noPosts', false);
		const loadingMorePosts = boolean('loadingMorePosts', false);
		const hasMorePosts = boolean('hasMorePosts', false);
		const isLoading = boolean('isLoading', false);
		const shareSectionPlaceholder = text(
			'shareSectionPlaceholder',
			'Lorem ipsum dolor sit amet.',
		);

		return (
			<UserFeedScreenView
				currentUser={currentUser}
				avatarImage={avatar}
				wallPosts={posts}
				refreshing={refreshing}
				onRefresh={action('onRefresh')}
				onLoadMorePosts={action('onLoadMorePosts')}
				onCreateWallPost={action('onCreateWallPost')}
				onImagePress={action('onImagePress')}
				onCommentPress={action('onCommentPress')}
				noPosts={noPosts}
				shareSectionPlaceholder={shareSectionPlaceholder}
				onLikeButtonPress={(likedByMe: boolean) => !likedByMe}
				onDeletePress={action('onDeletePress')}
				onUserPress={action('onUserPress')}
				loadingMorePosts={loadingMorePosts}
				hasMorePosts={hasMorePosts}
				onAddComment={action('onAddComment')}
				onSubmitComment={action('onSubmitComment')}
				shareSectionOpacityInterpolation={1}
				scrollRef={React.createRef()}
				scrollY={new Animated.Value(0)}
				isLoading={isLoading}
				getText={getTextMock}
				onBlockUser={action('onBlockUser')}
				onReportProblem={action('onReportProblem')}
			/>
		);
	});
