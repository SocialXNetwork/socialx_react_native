import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

import { getTextMock } from '../../../../src/mocks';
import { CommentsScreenView } from '../../../../src/screens/commentsStack/CommentsScreen.view';
import { CommentsSortingOptions, MediaTypeImage } from '../../../../src/types';

storiesOf('Screens/commentsStack', module)
	.addDecorator(withKnobs)
	.add('CommentsScreen', () => {
		const marginBottom = number('marginBottom', 0);

		const likePostError = boolean('likePostError', false);
		const likeCommentError = boolean('likeCommentError', false);
		const comment = text('commentText', 'Sample comment text here.\nGoing on the second line');

		const startComment = boolean('startComment', false);

		const post = {
			postId: '2',
			postText: 'Lorem ipsum dolor sit amet.',
			timestamp: new Date(Date.now()),
			owner: {
				userId: 'testgggg',
				fullName: 'Test GGGG',
				avatarURL:
					'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
			},
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
			likedByMe: false,
			likes: [],
			comments: [],
		};

		const optionsProps = {
			sortOption: CommentsSortingOptions.Likes,
			onSelectionChange: action('onSelectionChange'),
		};

		const commentLikesPosition = {
			bottom: -18,
			right: 0,
		};

		return (
			<CommentsScreenView
				post={post}
				comment={comment}
				comments={[]}
				likePostError={likePostError}
				likeCommentError={likeCommentError}
				onCommentLike={action('onCommentLike')}
				onCommentSend={action('onCommentSend')}
				onCommentInputChange={action('onCommentInputChange')}
				startComment={startComment}
				onViewUserProfile={action('onViewUserProfile')}
				onShowOptionsMenu={action('onShowOptionsMenu')}
				onCommentsBackPress={action('onCommentsBackPress')}
				onImagePress={action('onImagePress')}
				onLikePress={action('onLikePress')}
				optionsProps={optionsProps}
				marginBottom={marginBottom}
				getText={getTextMock}
			/>
		);
	});
