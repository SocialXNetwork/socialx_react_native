import {action} from '@storybook/addon-actions';
import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Animated} from 'react-native';

import {currentUser, posts} from '../../../../src/mocks';
import {UserFeedScreenView} from '../../../../src/screens/mainTabNav/UserFeedScreen/UserFeedScreen.view';
import CenterView from '../../../helpers/CenterView';

storiesOf('Screens/mainTabNav', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('UserFeedScreen', () => {
		const avatar = {uri: 'https://www.w3schools.com/w3css/img_lights.jpg'};

		const refreshing = boolean('refreshing', false);
		const noPosts = boolean('noPosts', false);
		const loadingMorePosts = boolean('loadingMorePosts', false);
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
				loadingMorePosts={loadingMorePosts}
				hasMorePosts={hasMorePosts}
				onAddCommentPress={action('onAddCommentPress')}
				onSubmitComment={action('onSubmitComment')}
				shareSectionOpacityInterpolation={1}
				scrollRef={React.createRef()}
				scrollY={new Animated.Value(0)}
				isLoading={isLoading}
				getText={(value) => value}
			/>
		);
	});
