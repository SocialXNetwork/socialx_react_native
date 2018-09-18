import {boolean, date, number, text, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';

import {CommentsScreenView} from '../../../../src/screens/commentsStack/CommentsScreen.view';
import {CommentsSortingOptions} from '../../../../src/types';

storiesOf('Screens/commentsStack', module)
	.addDecorator(withKnobs)
	.add('CommentsScreen', () => {
		const isLoading = boolean('isLoading', false);
		const marginBottom = number('marginBottom', 0);

		const likedByMe = boolean('likedByMe', false);
		const commentText = text('commentText', 'Sample comment text here.\nGoing on the second line');
		const replyText = text('replyText', 'One line text reply.');
		const timestamp = date('timestamp', new Date('February 23, 2018 09:45:00'));
		const userAvatarURL = text('user.avatarURL', 'https://avatars2.githubusercontent.com/u/212');
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
			fullName: '',
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
			onSelectionChange: (...args: any[]) => console.log('onSelectionChange', args),
		};

		return (
			<CommentsScreenView
				isLoading={isLoading}
				getText={(value) => value}
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
				onCommentLike={(...args: any[]) => console.log('onCommentLike', args)}
				onCommentReply={(...args: any[]) => console.log('onCommentReply', args)}
				onCommentSend={(...args: any[]) => console.log('onCommentSend', args)}
				onCommentTextChange={(...args: any[]) => console.log('onCommentTextChange', args)}
				startComment={startComment}
				onViewUserProfile={(...args: any[]) => console.log('onViewUserProfile', args)}
				commentText={commentText}
				showSendButton={showSendButton}
				onShowOptionsMenu={(...args: any[]) => console.log('onShowOptionsMenu', args)}
				postData={postData}
				postOwner={postOwner}
				onCommentsBackPress={(...args: any[]) => console.log('onCommentsBackPress', args)}
				onImagePress={(...args: any[]) => console.log('onImagePress', args)}
				onLikePress={(...args: any[]) => console.log('onLikePress', args)}
				currentUser={currentUser}
				onCommentContainerWidthChange={(...args: any[]) => console.log('onCommentContainerWidthChange', args)}
				commentLikesPosition={commentLikesPosition}
				optionsProps={optionsProps}
				isReplyScreen={isReplyScreen}
			/>
		);
	});
