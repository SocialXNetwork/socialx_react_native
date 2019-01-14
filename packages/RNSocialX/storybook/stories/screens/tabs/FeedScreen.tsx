import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { Animated } from 'react-native';

import { getTextMock, posts } from '../../../../src/mocks';
import { FeedListView } from '../../../../src/screens/tabs/FeedScreen/FeedList.view';

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.add('FeedScreen', () => {
		const avatar = 'https://www.w3schools.com/w3css/img_lights.jpg';
		const refreshing = boolean('refreshing', false);
		const loadingMorePosts = boolean('loadingMorePosts', false);
		const canLoadMorePosts = boolean('canLoadMorePosts', false);
		const shareSectionPlaceholder = text('shareSectionPlaceholder', 'Lorem ipsum dolor sit amet.');

		return (
			<FeedListView
				avatarImage={avatar}
				posts={posts}
				refreshing={refreshing}
				shareSectionPlaceholder={shareSectionPlaceholder}
				loadingMorePosts={loadingMorePosts}
				canLoadMorePosts={canLoadMorePosts}
				scrollRef={React.createRef()}
				scrollY={new Animated.Value(0)}
				likeFailed={false}
				creating={false}
				skeletonPost={posts[0]}
				onRefresh={action('onRefresh')}
				onLoadMorePosts={action('onLoadMorePosts')}
				onCreateWallPost={action('onCreateWallPost')}
				onAddComment={action('onAddComment')}
				// @ts-ignore
				navigation={null}
				getText={getTextMock}
			/>
		);
	});
