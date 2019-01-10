import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.GET_POST_BY_PATH: {
			return state;
		}

		case ActionTypes.SYNC_GET_POST_BY_PATH: {
			return state;
		}

		case ActionTypes.GET_POST_BY_ID: {
			return state;
		}

		case ActionTypes.SYNC_GET_POST_BY_ID: {
			const byId: any = {};
			const sortedLikes = action.payload.likes.sort((x, y) => x.timestamp - y.timestamp);

			for (const like of sortedLikes) {
				byId[like.owner.alias] = like.timestamp;
			}

			return {
				...state,
				all: {
					...state.all,
					[action.payload.postId]: {
						...action.payload,
						likes: {
							ids: action.payload.likes.map((like) => like.owner.alias),
							byId,
						},
						comments: action.payload.comments
							.sort((x, y) => x.timestamp - y.timestamp)
							.map((comm) => comm.commentId),
					},
				},
				global: {
					...state.global,
					posts: [action.payload.postId, ...state.global.posts],
				},
				friends: {
					...state.friends,
					posts: [action.payload.postId, ...state.friends.posts],
				},
			};
		}

		case ActionTypes.LOAD_MORE_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_LOAD_MORE_POSTS: {
			const all = { ...state.all };
			const posts = [...state.global.posts];

			for (const post of action.payload.posts) {
				const byId: any = {};
				const sortedLikes = post.likes.sort((x, y) => x.timestamp - y.timestamp);

				for (const like of sortedLikes) {
					byId[like.owner.alias] = like.timestamp;
				}

				const shapedPost = {
					...post,
					likes: {
						ids: post.likes.map((like) => like.owner.alias),
						byId,
					},
					comments: post.comments
						.sort((x, y) => x.timestamp - y.timestamp)
						.map((comm) => comm.commentId),
				};
				all[post.postId] = shapedPost;
				if (posts.indexOf(post.postId) === -1) {
					posts.push(post.postId);
				}
			}

			return {
				...state,
				all,
				global: {
					canLoadMore: action.payload.canLoadMore,
					nextToken: action.payload.nextToken,
					posts,
				},
			};
		}

		case ActionTypes.LOAD_MORE_FRIENDS_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_LOAD_MORE_FRIENDS_POSTS: {
			const all = { ...state.all };
			const posts = [...state.friends.posts];

			for (const post of action.payload.posts) {
				const byId: any = {};
				const sortedLikes = post.likes.sort((x, y) => x.timestamp - y.timestamp);

				for (const like of sortedLikes) {
					byId[like.owner.alias] = like.timestamp;
				}

				const shapedPost = {
					...post,
					likes: {
						ids: post.likes.map((like) => like.owner.alias),
						byId,
					},
					comments: post.comments
						.sort((x, y) => x.timestamp - y.timestamp)
						.map((comm) => comm.commentId),
				};
				all[post.postId] = shapedPost;
				if (posts.indexOf(post.postId) === -1) {
					posts.push(post.postId);
				}
			}

			return {
				...state,
				all,
				friends: {
					canLoadMore: action.payload.canLoadMore,
					nextToken: action.payload.nextToken,
					posts,
				},
			};
		}

		case ActionTypes.GET_USER_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_GET_USER_POSTS: {
			const all = { ...state.all };

			for (const post of action.payload) {
				const byId: any = {};
				const sortedLikes = post.likes.sort((x, y) => x.timestamp - y.timestamp);

				for (const like of sortedLikes) {
					byId[like.owner.alias] = like.timestamp;
				}

				const shapedPost = {
					...post,
					likes: {
						ids: post.likes.map((like) => like.owner.alias),
						byId,
					},
					comments: post.comments
						.sort((x, y) => x.timestamp - y.timestamp)
						.map((comm) => comm.commentId),
				};
				all[post.postId] = shapedPost;
			}

			return {
				...state,
				all,
			};
		}

		case ActionTypes.CREATE_POST: {
			return {
				...state,
				all: {
					...state.all,
					[action.payload.postId]: action.payload,
				},
				global: {
					...state.global,
					posts: [action.payload.postId, ...state.global.posts],
				},
				friends: {
					...state.friends,
					posts: [action.payload.postId, ...state.friends.posts],
				},
			};
		}

		case ActionTypes.SYNC_CREATE_POST: {
			const {
				[action.payload]: {},
				...updatedPosts
			} = state.all;

			return {
				...state,
				all: updatedPosts,
				global: {
					...state.global,
					posts: state.global.posts.filter((id) => id !== action.payload),
				},
				friends: {
					...state.friends,
					posts: state.friends.posts.filter((id) => id !== action.payload),
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
				global: {
					...state.global,
					posts: state.global.posts.filter((id) => id !== action.payload),
				},
				friends: {
					...state.friends,
					posts: state.friends.posts.filter((id) => id !== action.payload),
				},
			};
		}

		case ActionTypes.LIKE_POST: {
			const timestamp = Number(new Date(Date.now()));
			const { postId, alias } = action.payload;

			return {
				...state,
				all: {
					...state.all,
					[postId]: {
						...state.all[postId],
						likes: {
							...state.all[postId].likes,
							ids: [...state.all[postId].likes.ids, alias],
							byId: {
								...state.all[postId].likes.byId,
								[alias]: timestamp,
							},
						},
					},
				},
			};
		}

		case ActionTypes.LIKE_POST_ERROR: {
			const { postId, alias } = action.payload;
			const {
				[alias]: {},
				...updatedLikes
			} = state.all[postId].likes.byId;

			return {
				...state,
				all: {
					...state.all,
					[postId]: {
						...state.all[postId],
						likes: {
							...state.all[postId].likes,
							ids: state.all[postId].likes.ids.filter((id) => id !== alias),
							byId: updatedLikes,
						},
					},
				},
			};
		}

		case ActionTypes.UNLIKE_POST: {
			const { postId, alias } = action.payload;
			const {
				[alias]: {},
				...updatedLikes
			} = state.all[postId].likes.byId;

			return {
				...state,
				all: {
					...state.all,
					[postId]: {
						...state.all[postId],
						likes: {
							...state.all[postId].likes,
							ids: state.all[postId].likes.ids.filter((id) => id !== alias),
							byId: updatedLikes,
						},
					},
				},
			};
		}

		case ActionTypes.UNLIKE_POST_ERROR: {
			const timestamp = Number(new Date(Date.now()));
			const { postId, alias } = action.payload;

			return {
				...state,
				all: {
					...state.all,
					[postId]: {
						...state.all[postId],
						likes: {
							...state.all[postId].likes,
							ids: [...state.all[postId].likes.ids, alias],
							byId: {
								...state.all[postId].likes.byId,
								[alias]: timestamp,
							},
						},
					},
				},
			};
		}

		case ActionTypes.REFRESH_GLOBAL_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_REFRESH_GLOBAL_POSTS: {
			const all = { ...state.all };
			const posts = [];

			for (const post of action.payload.posts) {
				const byId: any = {};
				const sortedLikes = post.likes.sort((x, y) => x.timestamp - y.timestamp);

				for (const like of sortedLikes) {
					byId[like.owner.alias] = like.timestamp;
				}

				const shapedPost = {
					...post,
					likes: {
						ids: post.likes.map((like) => like.owner.alias),
						byId,
					},
					comments: post.comments
						.sort((x, y) => x.timestamp - y.timestamp)
						.map((comm) => comm.commentId),
				};
				all[post.postId] = shapedPost;
				posts.push(post.postId);
			}

			return {
				...state,
				all,
				global: {
					canLoadMore: action.payload.canLoadMore,
					nextToken: action.payload.nextToken,
					posts,
				},
			};
		}

		case ActionTypes.REFRESH_FRIENDS_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_REFRESH_FRIENDS_POSTS: {
			const all = { ...state.all };
			const posts = [];

			for (const post of action.payload.posts) {
				const byId: any = {};
				const sortedLikes = post.likes.sort((x, y) => x.timestamp - y.timestamp);

				for (const like of sortedLikes) {
					byId[like.owner.alias] = like.timestamp;
				}

				const shapedPost = {
					...post,
					likes: {
						ids: post.likes.map((like) => like.owner.alias),
						byId,
					},
					comments: post.comments
						.sort((x, y) => x.timestamp - y.timestamp)
						.map((comm) => comm.commentId),
				};
				all[post.postId] = shapedPost;
				posts.push(post.postId);
			}

			return {
				...state,
				all,
				friends: {
					canLoadMore: action.payload.canLoadMore,
					nextToken: action.payload.nextToken,
					posts,
				},
			};
		}

		case ActionTypes.ADD_COMMENT: {
			const { postId, commentId, error } = action.payload;

			if (error) {
				return {
					...state,
					all: {
						...state.all,
						[postId]: {
							...state.all[postId],
							comments: state.all[postId].comments.filter((comm) => comm !== commentId),
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
							comments: [...state.all[postId].comments, commentId],
						},
					},
				};
			}
		}

		case ActionTypes.REPLACE_COMMENT: {
			const { postId, previousCommentId, commentId } = action.payload;

			const comments = state.all[postId].comments.slice();
			const index = comments.indexOf(previousCommentId);
			comments[index] = commentId;

			return {
				...state,
				all: {
					...state.all,
					[postId]: {
						...state.all[postId],
						comments,
					},
				},
			};
		}

		case ActionTypes.REMOVE_COMMENT: {
			const { postId, commentId } = action.payload;

			return {
				...state,
				all: {
					...state.all,
					[postId]: {
						...state.all[postId],
						comments: state.all[postId].comments.filter((comm) => comm !== commentId),
					},
				},
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
