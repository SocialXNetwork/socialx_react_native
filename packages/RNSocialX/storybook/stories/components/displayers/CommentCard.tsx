import { boolean, date, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { CommentCard } from '../../../../src/components/displayers/CommentCard';
import CenterView from '../../../helpers/CenterView';

storiesOf('Components/displayers', module)
	.addDecorator(withKnobs)
	.addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
	.add('CommentCard', () => {
		const isReply = boolean('isReply', false);
		const likedByMe = boolean('likedByMe', false);
		const commentText = text(
			'commentText',
			'Sample comment text here.\nGoing on the second line',
		);
		const replyText = text('replyText', 'One line text reply.');
		const timestamp = date('timestamp', new Date('February 23, 2018 09:45:00'));
		const userAvatarURL = text(
			'user.avatarURL',
			'https://avatars2.githubusercontent.com/u/212',
		);
		const userFullName = text('user.fullName', 'Sharell Watchman');
		const numberOfLikes = number('numberOfLikes', 10);

		return (
			<CommentCard
				comment={{
					id: 'comm_1',
					text: commentText,
					user: {
						fullName: userFullName,
						avatarURL: userAvatarURL,
						id: 'user_11',
					},
					timestamp,
					numberOfLikes,
					likes: [], // not used by component
					likedByMe,
					replies: [
						{
							id: 'comm_2',
							text: replyText,
							user: {
								fullName: userFullName,
								avatarURL: userAvatarURL,
								id: 'user_22',
							},
							timestamp: new Date('April 25, 2018 19:25:00'),
							numberOfLikes: 2,
							likes: [],
							likedByMe: false,
							replies: [],
						},
					],
				}}
				onCommentLike={() => console.log('onCommentLike')}
				onCommentReply={(startReply) =>
					console.log('onCommentReply', startReply)
				}
				onViewUserProfile={(userId) => console.log('onViewUserProfile', userId)}
				onShowOptionsMenu={() => console.log('onShowOptionsMenu')}
				onCommentContainerWidthChange={(value) =>
					console.log('onCommentContainerWidthChange', value)
				}
				commentLikesPosition={{
					bottom: -18,
					right: 0,
				}}
				isReply={isReply}
				getText={(value) => value}
			/>
		);
	});
