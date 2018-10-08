import { action } from '@storybook/addon-actions';
import { boolean, date, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { CommentsScreenView } from '../../../../src/screens/commentsStack/CommentsScreen.view';
import { CommentsSortingOptions } from '../../../../src/types';

storiesOf('Screens/commentsStack', module)
	.addDecorator(withKnobs)
	.add('CommentsScreen', () => {
		const marginBottom = number('marginBottom', 0);

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
		const startComment = boolean('startComment', false);
		const showSendButton = boolean('showSendButton', true);
		const isReplyScreen = boolean('isReplyScreen', false);

		const postData = {
			id: 'post_id_1',
			likes: [
				{
					userId: 'userId_1',
					userName: 'Herbert Bickett',
				},
				{
					userId: 'userId_2',
					userName: 'Kizzy Schreier',
				},
			],
			media: [
				{
					url: 'https://avatars2.githubusercontent.com/u/212',
					extension: 'jpg',
				},
			],
			text: 'Here is a single line post text',
			timestamp: new Date(2018, 7, 18, 22, 5, 11),
		};
		const postOwner = {
			userId: 'userId_0',
			avatarURL: 'https://placeimg.com/200/200/people',
			fullName: 'Lorem Ipsum',
		};
		const currentUser = {
			userId: 'userId_1',
		};
		const commentLikesPosition = {
			bottom: -18,
			right: 0,
		};
		const optionsProps = {
			sortOption: CommentsSortingOptions.Likes,
			onSelectionChange: action('onSelectionChange'),
		};

		return (
			<CommentsScreenView
				getText={getTextMock}
				marginBottom={marginBottom}
				comments={[
					{
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
					},
				]}
				onCommentLike={action('onCommentLike')}
				onCommentReply={action('onCommentReply')}
				onCommentSend={action('onCommentSend')}
				onCommentTextChange={action('onCommentTextChange')}
				startComment={startComment}
				onViewUserProfile={action('onViewUserProfile')}
				commentText={commentText}
				showSendButton={showSendButton}
				onShowOptionsMenu={action('onShowOptionsMenu')}
				postData={postData}
				postOwner={postOwner}
				onCommentsBackPress={action('onCommentsBackPress')}
				onImagePress={action('onImagePress')}
				onLikePress={action('onLikePress')}
				currentUser={currentUser}
				onCommentContainerWidthChange={action('onCommentContainerWidthChange')}
				commentLikesPosition={commentLikesPosition}
				optionsProps={optionsProps}
				isReplyScreen={isReplyScreen}
			/>
		);
	});
