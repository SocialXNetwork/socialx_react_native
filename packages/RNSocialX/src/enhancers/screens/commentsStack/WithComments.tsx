/**
 * TODO list:
 * 1. Props data: postUser, currentUser, postComments, loadingComments,
 * 2. Props actions: reloadComments, sendComment, likeComment, removeCommentLike, deleteComment, likePost, unlikePost
 */

import * as React from 'react';
import {CommentsSortingOptions, ITranslatedProps, IWallPostComment} from '../../../types';

const mock = {
	data: {
		postUser: {}, // TODO: Ionut/Alex Please provide correctly shaped data to this
		currentUser: {}, // TODO: Ionut/Alex Please provide correctly shaped data to this
		postComments: [], // TODO: Ionut/Alex Please provide correctly shaped data to this
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
	postUser: any;
	currentUser: any;
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
