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
			return {
				...state,
				all: {
					...state.all,
					[action.payload.postId]: action.payload,
				},
			};
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

			const all = { ...state.all };
			for (const post of action.payload.posts) {
				all[post.postId] = post;
			}

			return {
				...state,
				all,
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

			const all = { ...state.all };
			for (const post of action.payload.posts) {
				all[post.postId] = post;
			}

			return {
				...state,
				all,
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
			const {
				[action.payload]: {},
				...updatedPosts
			} = state.all;

			return {
				...state,
				all: updatedPosts,
			};
		}

		case ActionTypes.UNLIKE_POST: {
			return state;
		}

		case ActionTypes.SYNC_ADD_COMMENT: {
			const { postId, comment, error } = action.payload;

			if (error) {
				return {
					...state,
					all: {
						...state.all,
						[postId]: {
							...state.all[postId],
							comments: state.all[postId].comments.filter(
								(comm) => comm.commentId !== comment.commentId,
							),
						},
					},
				};
			} else {
				return {
					...state,
					all: {
						...state.all,
						[postId]: {
							...state.all[postId],
							comments: [...state.all[postId].comments, comment],
						},
					},
				};
			}
		}

		case ActionTypes.SYNC_REMOVE_COMMENT: {
			const { postId, comment, commentId, error } = action.payload;

			if (error) {
				return {
					...state,
					all: {
						...state.all,
						[postId]: {
							...state.all[postId],
							comments: [...state.all[postId].comments, comment],
						},
					},
				};
			} else {
				return {
					...state,
					all: {
						...state.all,
						[postId]: {
							...state.all[postId],
							comments: state.all[postId].comments.filter((comm) => comm.commentId !== commentId),
						},
					},
				};
			}
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
