import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_POST: {
			return state;
		}

		case ActionTypes.LIKE_POST: {
			return state;
		}

		case ActionTypes.GET_PUBLIC_POSTS_BY_DATE: {
			return state;
		}

		case ActionTypes.SYNC_GET_PUBLIC_POSTS_BY_DATE: {
			const updatedPosts = action.payload.reduce(
				(updatedPostsAcc, newPost) => [
					...updatedPostsAcc.filter(
						(updatedPost) => updatedPost.postId !== newPost.postId,
					),
					newPost,
				],
				[...state.posts],
			);
			return { posts: updatedPosts };
		}

		case ActionTypes.GET_POST_BY_PATH: {
			return state;
		}

		case ActionTypes.SYNC_GET_POST_BY_PATH: {
			return {
				posts: [
					...state.posts.filter(
						(post) => post.postId !== action.payload.postId,
					),
					action.payload,
				],
			};
		}

		case ActionTypes.GET_POSTS_BY_USER: {
			return state;
		}

		case ActionTypes.SYNC_GET_POSTS_BY_USER: {
			const updatedPosts = action.payload.reduce(
				(updatedPostsAcc, newPost) => [
					...updatedPostsAcc.filter(
						(updatedPost) => updatedPost.postId !== newPost.postId,
					),
					newPost,
				],
				[...state.posts],
			);
			return { posts: updatedPosts };
		}

		case ActionTypes.REMOVE_POST: {
			return state;
		}

		case ActionTypes.UNLIKE_POST: {
			return state;
		}

		// <============= comments =============>
		case ActionTypes.CREATE_COMMENT: {
			return state;
		}

		case ActionTypes.REMOVE_COMMENT: {
			return state;
		}

		case ActionTypes.LIKE_COMMENT: {
			return state;
		}

		case ActionTypes.UNLIKE_COMMENT: {
			return state;
		}

		case 'RESET_STORE': {
			return initialState;
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
