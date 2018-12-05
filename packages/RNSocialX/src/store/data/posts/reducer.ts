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
			return state;
		}

		case ActionTypes.GET_POST_BY_PATH: {
			return state;
		}

		case ActionTypes.SYNC_GET_POST_BY_PATH: {
			return state;
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
				[...state.global.posts],
			);
			return {
				...state,
				global: {
					...state.global,
					posts: updatedPosts,
				},
			};
		}

		case ActionTypes.GET_POST_BY_ID: {
			return state;
		}

		case ActionTypes.SYNC_GET_POST_BY_ID: {
			// const newPosts = [
			// 	...state.posts.filter((post) => post.postId !== action.payload.postId),
			// 	action.payload,
			// ];

			// return {
			// 	posts: newPosts,
			// };
			return state;
		}

		case ActionTypes.LOAD_MORE_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_LOAD_MORE_POSTS: {
			const updatedPosts = action.payload.posts.reduce(
				(updatedPostsAcc, newPost) => [
					...updatedPostsAcc.filter((updatedPost) => updatedPost.postId !== newPost.postId),
					newPost,
				],
				[...state.global.posts],
			);
			return {
				...state,
				global: {
					canLoadMore: action.payload.canLoadMore,
					nextToken: action.payload.nextToken,
					posts: updatedPosts,
				},
			};
		}

		case ActionTypes.LOAD_MORE_FRIENDS_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_LOAD_MORE_FRIENDS_POSTS: {
			const updatedPosts = action.payload.posts.reduce(
				(updatedPostsAcc, newPost) => [
					...updatedPostsAcc.filter((updatedPost) => updatedPost.postId !== newPost.postId),
					newPost,
				],
				[...state.friends.posts],
			);
			return {
				...state,
				friends: {
					...state.friends,
					posts: updatedPosts,
					canLoadMore: action.payload.canLoadMore,
					nextToken: action.payload.nextToken,
				},
			};
		}

		case ActionTypes.REMOVE_POST: {
			return state;
		}

		case ActionTypes.SYNC_REMOVE_POST: {
			return {
				friends: {
					...state.friends,
					posts: [...state.friends.posts.filter((post) => post.postId !== action.payload)],
				},
				global: {
					...state.global,
					posts: [...state.global.posts.filter((post) => post.postId !== action.payload)],
				},
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

		case ActionTypes.RESET_GLOBAL_FEED: {
			return {
				...state,
				global: initialState.global,
			};
		}

		case ActionTypes.RESET_FRIENDS_FEED: {
			return {
				...state,
				friends: initialState.friends,
			};
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
