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
					[profile.alias]: {
						...state.profiles[profile.alias],
						...profile,
					},
				},
			};
		}

		case ActionTypes.GET_PROFILES_BY_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_GET_PROFILES_BY_POSTS: {
			const profiles = { ...state.profiles };

			for (const profile of action.payload) {
				if (profile !== profiles[profile.alias]) {
					profiles[profile.alias] = {
						...state.profiles[profile.alias],
						...profile,
						posts:
							profiles[profile.alias] && profiles[profile.alias].posts
								? profiles[profile.alias].posts
								: [],
					};
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
					[profile.alias]: {
						...state.profiles[profile.alias],
						...profile,
					},
				},
			};
		}

		case ActionTypes.GET_PROFILES_BY_USERNAMES: {
			return state;
		}

		case ActionTypes.SYNC_GET_PROFILES_BY_USERNAMES: {
			const profiles = { ...state.profiles };

			for (const profile of action.payload) {
				if (profile !== profiles[profile.alias]) {
					profiles[profile.alias] = {
						...state.profiles[profile.alias],
						...profile,
						posts:
							profiles[profile.alias] && profiles[profile.alias].posts
								? profiles[profile.alias].posts
								: [],
					};
				}
			}

			return {
				...state,
				profiles,
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
				if (friend !== profiles[friend.alias]) {
					profiles[friend.alias] = {
						...state.profiles[friend.alias],
						...friend,
						posts:
							profiles[friend.alias] && profiles[friend.alias].posts
								? profiles[friend.alias].posts
								: [],
					};
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

		case ActionTypes.REMOVE_FRIEND: {
			return state;
		}

		case ActionTypes.ACCEPT_FRIEND: {
			return state;
		}

		case ActionTypes.REJECT_FRIEND: {
			return state;
		}

		case ActionTypes.CLEAR_FRIEND_RESPONSE: {
			return state;
		}

		case ActionTypes.ADD_POSTS_TO_PROFILE: {
			const { postIds, alias } = action.payload;

			return {
				...state,
				profiles: {
					...state.profiles,
					[alias]: {
						...state.profiles[alias],
						posts: postIds,
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
