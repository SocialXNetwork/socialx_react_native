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
					...updatedPostsAcc.filter((updatedPost) => updatedPost.postId !== newPost.postId),
					newPost,
				],
				[...state.global],
			);
			return { ...state, global: updatedPosts };
		}

		case ActionTypes.GET_POST_BY_PATH: {
			return state;
		}

		case ActionTypes.SYNC_GET_POST_BY_PATH: {
			return {
				...state,
				global: [
					...state.global.filter((post) => post.postId !== action.payload.postId),
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
					...updatedPostsAcc.filter((updatedPost) => updatedPost.postId !== newPost.postId),
					newPost,
				],
				[...state.global],
			);
			return { ...state, global: updatedPosts };
		}

		case ActionTypes.GET_POST_BY_ID: {
			return state;
		}

		case ActionTypes.SYNC_GET_POST_BY_ID: {
			const newGlobal = [
				...state.global.filter((post) => post.postId !== action.payload.postId),
				action.payload,
			];
			// check if the post exists on the friends feed first
			const newFriends = state.friends.find((post) => post.postId === action.payload.postId)
				? [...state.friends.filter((post) => post.postId !== action.payload.postId), action.payload]
				: state.friends;
			return {
				global: newGlobal,
				friends: newFriends,
			};
		}

		case ActionTypes.LOAD_MORE_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_LOAD_MORE_POSTS: {
			const updatedPosts = action.payload.reduce(
				(updatedPostsAcc, newPost) => [
					...updatedPostsAcc.filter((updatedPost) => updatedPost.postId !== newPost.postId),
					newPost,
				],
				[...state.global],
			);
			return { ...state, global: updatedPosts };
		}

		case ActionTypes.LOAD_MORE_FRIENDS_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_LOAD_MORE_FRIENDS_POSTS: {
			const updatedPosts = action.payload.reduce(
				(updatedPostsAcc, newPost) => [
					...updatedPostsAcc.filter((updatedPost) => updatedPost.postId !== newPost.postId),
					newPost,
				],
				[...state.friends],
			);
			return { ...state, friends: updatedPosts };
		}

		case ActionTypes.REMOVE_POST: {
			return state;
		}

		case ActionTypes.SYNC_REMOVE_POST: {
			return {
				...state,
				global: [...state.global.filter((post) => post.postId !== action.payload)],
			};
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

		case ActionTypes.RESET_POSTS: {
			return initialState;
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
