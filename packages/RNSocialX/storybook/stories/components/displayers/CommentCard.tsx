import { action } from '@storybook/addon-actions';
import { boolean, date, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { CommentCard } from '../../../../src/components/displayers/CommentCard';
import { getTextMock } from '../../../../src/mocks';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('CommentCard', () => {
		const likedByCurrentUser = boolean('likedByCurrentUser', false);
		const likeCommentError = boolean('likeCommentError', false);
		const commentText = text('commentText', 'Sample comment text here.\nGoing on the second line');
		const timestamp = date('timestamp', new Date('February 23, 2018 09:45:00'));
		const useravatar = text('user.avatar', 'https://avatars2.githubusercontent.com/u/212');
		const userFullName = text('user.fullName', 'Sharell Watchman');

		return (
			<CommentCard
				comment={{
					commentId: 'comm_1',
					text: commentText,
					user: {
						fullName: userFullName,
						avatar: useravatar,
						userId: 'user_11',
					},
					timestamp,
					likes: [
						{
							userId: 'randomUserId',
							userName: 'randomUserName',
						},
					],
					likedByCurrentUser,
				}}
				onCommentLike={action('onCommentLike')}
				onViewUserProfile={action('onViewUserProfile')}
				onShowOptionsMenu={action('onShowOptionsMenu')}
				likeCommentError={likeCommentError}
				getText={getTextMock}
			/>
		);
	});
