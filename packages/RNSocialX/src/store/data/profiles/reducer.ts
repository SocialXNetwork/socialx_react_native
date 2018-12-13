import { FRIEND_TYPES } from '@socialx/api-data';
import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.GET_CURRENT_PROFILE: {
			return state;
		}

		case ActionTypes.SYNC_GET_CURRENT_PROFILE: {
			const profile = action.payload;

			return {
				...state,
				profiles: {
					...state.profiles,
					[profile.alias]: profile,
				},
			};
		}

		case ActionTypes.GET_PROFILES_BY_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_GET_PROFILES_BY_POSTS: {
			const profiles = { ...state.profiles };

			for (const profile of action.payload) {
				if (!profiles[profile.alias]) {
					profiles[profile.alias] = profile;
				}
			}

			return {
				...state,
				profiles,
			};
		}

		case ActionTypes.GET_PROFILE_BY_ALIAS: {
			return state;
		}

		case ActionTypes.SYNC_GET_PROFILE_BY_ALIAS: {
			const profile = action.payload;

			return {
				...state,
				profiles: {
					...state.profiles,
					[profile.alias]: profile,
				},
			};
		}

		case ActionTypes.GET_CURRENT_FRIENDS: {
			return state;
		}

		case ActionTypes.SYNC_GET_CURRENT_FRIENDS: {
			const { friends, alias } = action.payload;

			const profiles = { ...state.profiles };
			const friendIds = [];

			for (const friend of friends) {
				if (!profiles[friend.alias]) {
					profiles[friend.alias] = friend;
				}

				if (friendIds.indexOf(friend.alias) === -1) {
					friendIds.push(friend.alias);
				}
			}

			return {
				...state,
				profiles,
				friends: {
					...state.friends,
					[alias]: friendIds,
				},
			};
		}

		case ActionTypes.UPDATE_PROFILE: {
			return state;
		}

		case ActionTypes.ADD_FRIEND: {
			return state;
		}

		case ActionTypes.SYNC_ADD_FRIEND: {
			const { currentUserAlias, alias } = action.payload;

			return {
				...state,
				profiles: {
					...state.profiles,
					[alias]: {
						...state.profiles[alias],
						status: FRIEND_TYPES.PENDING,
					},
				},
				friends: {
					...state.friends,
					[currentUserAlias]: [...state.friends[currentUserAlias], alias],
				},
			};
		}

		case ActionTypes.UNDO_REQUEST: {
			return state;
		}

		case ActionTypes.REMOVE_FRIEND: {
			return state;
		}

		case ActionTypes.ACCEPT_FRIEND: {
			return state;
		}

		case ActionTypes.REJECT_FRIEND: {
			return state;
		}

		case ActionTypes.SYNC_UNDO_REQUEST: {
			const { currentUserAlias, alias } = action.payload;

			return {
				...state,
				profiles: {
					...state.profiles,
					[alias]: {
						...state.profiles[alias],
						status: FRIEND_TYPES.NOT_FRIEND,
					},
				},
				friends: {
					...state.friends,
					[currentUserAlias]: state.friends[currentUserAlias].filter((friend) => friend !== alias),
				},
			};
		}

		case ActionTypes.CLEAR_FRIEND_RESPONSE: {
			return state;
		}

		case ActionTypes.ADD_POSTS_TO_PROFILE: {
			const { postIds, alias } = action.payload;
			const updatedPostIds = [...state.profiles[alias].posts];

			for (const postId of postIds) {
				if (updatedPostIds.indexOf(postId) === -1) {
					updatedPostIds.unshift(postId);
				}
			}

			return {
				...state,
				profiles: {
					...state.profiles,
					[alias]: {
						...state.profiles[alias],
						posts: updatedPostIds,
					},
				},
			};
		}

		case ActionTypes.REMOVE_POST_FROM_PROFILE: {
			const { postId, alias } = action.payload;

			return {
				...state,
				profiles: {
					...state.profiles,
					[alias]: {
						...state.profiles[alias],
						posts: state.profiles[alias].posts.filter((id) => id !== postId),
					},
				},
			};
		}

		case ActionTypes.SEARCH_FOR_PROFILES: {
			return state;
		}

		case ActionTypes.SYNC_SEARCH_FOR_PROFILES: {
			const profiles = { ...state.profiles };
			const results = [...state.search.results];
			const previousTerms = { ...state.search.previousTerms };

			for (const profile of action.payload.profiles) {
				if (!profiles[profile.alias]) {
					profiles[profile.alias] = {
						...profile,
						searched: true,
					};
				}

				if (results.indexOf(profile.alias) === -1) {
					results.push(profile.alias);
				}
			}

			if (!previousTerms[action.payload.term]) {
				previousTerms[action.payload.term] = true;
			}

			return {
				...state,
				profiles,
				search: {
					previousTerms,
					results,
				},
			};
		}

		case ActionTypes.SEARCH_FOR_PROFILES_LOCALLY: {
			const { alias: currentUserAlias, term } = action.payload;

			const results = Object.keys(state.profiles).filter(
				(alias) =>
					alias !== currentUserAlias &&
					(alias.toLowerCase().includes(term.toLowerCase()) ||
						state.profiles[alias].fullName.toLowerCase().includes(term.toLowerCase())),
			);

			return {
				...state,
				search: {
					...state.search,
					results,
				},
			};
		}

		case ActionTypes.CLEAR_SEARCH_RESULTS: {
			let profiles = { ...state.profiles };

			for (const alias of Object.keys(profiles)) {
				if (profiles[alias].searched) {
					const {
						[alias]: {},
						...updatedProfiles
					} = profiles;
					profiles = updatedProfiles;
				}
			}

			return {
				...state,
				profiles,
				search: {
					previousTerms: {},
					results: [],
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
