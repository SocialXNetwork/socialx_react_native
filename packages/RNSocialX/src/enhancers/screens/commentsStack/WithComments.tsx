/**
 * TODO list:
 * 1. Props data: postUser, currentUser, postComments, loadingComments,
 * 2. Props actions: reloadComments, sendComment, likeComment, removeCommentLike, deleteComment, likePost, unlikePost
 */

import * as React from 'react';
import {CommentsSortingOptions, ITranslatedProps, IWallPostComment} from '../../../types';

const mock: IWithCommentsEnhancedProps = {
	data: {
		postUser: {
			userId: 'userId_0',
			avatarURL: 'https://placeimg.com/200/200/people',
			fullName: 'Willetta Winsor',
		},
		currentUser: {
			userId: 'userId_1',
		},
		postComments: [
			{
				id: 'comm_1',
				text: 'Sample comment text here.\nGoing on the second line',
				user: {
					fullName: 'Sharell Watchman',
					avatarURL: 'https://avatars2.githubusercontent.com/u/212',
					id: 'user_11',
				},
				timestamp: new Date('February 23, 2018 09:45:00'),
				numberOfLikes: 10,
				likes: [], // not used by component
				likedByMe: false,
				replies: [
					{
						id: 'comm_2',
						text: 'One line text reply.',
						user: {
							fullName: 'Rosaline Finger',
							avatarURL: undefined,
							id: 'user_22',
						},
						timestamp: new Date('April 25, 2018 19:25:00'),
						numberOfLikes: 2,
						likes: [], // not used by component
						likedByMe: false,
						replies: [],
					},
				],
			},
		],
		loadingComments: false,
	},
	actions: {
		reloadComments: (sortOption: CommentsSortingOptions) => {
			/**/
		},
		sendComment: (text: string, targetPostId: string | undefined, targetCommentId: string | undefined) => {
			/**/
		},
		likeComment: (commentId: string) => {
			/**/
		},
		removeCommentLike: (commentId: string) => {
			/**/
		},
		deleteComment: (commentId: string) => {
			/**/
		},
		likePost: (postId: string) => {
			/**/
		},
		unlikePost: (postId: string) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithCommentsEnhancedData {
	postUser: {
		userId: string;
		avatarURL?: string;
		fullName: string;
	};
	currentUser: {
		userId: string;
	};
	postComments: IWallPostComment[];
	loadingComments: boolean;
}

export interface IWithCommentsEnhancedActions extends ITranslatedProps {
	reloadComments: (sortOption: CommentsSortingOptions) => void;
	sendComment: (text: string, targetPostId: string | undefined, targetCommentId: string | undefined) => void;
	likeComment: (commentId: string) => void;
	removeCommentLike: (commentId: string) => void;
	deleteComment: (commentId: string) => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
}

interface IWithCommentsEnhancedProps {
	data: IWithCommentsEnhancedData;
	actions: IWithCommentsEnhancedActions;
}

interface IWithCommentsProps {
	children(props: IWithCommentsEnhancedProps): JSX.Element;
}

interface IWithCommentsState {}

// This is a class because we might want to do transformations and optimizations here
// Also, this will import individual connectors/enhancers and compose them to
// pass the real data and actions instead of the mocks
export class WithComments extends React.Component<IWithCommentsProps, IWithCommentsState> {
	render() {
		const {children} = this.props;
		return children({data: mock.data, actions: mock.actions});
	}
}