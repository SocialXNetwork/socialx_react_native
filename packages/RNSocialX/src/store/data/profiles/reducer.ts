import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.GET_CURRENT_PROFILE: {
			return state;
		}

		case ActionTypes.SYNC_GET_CURRENT_PROFILE: {
			return {
				...state,
				profiles: {
					...state.profiles,
					[action.payload.alias]: action.payload,
				},
			};
		}

		case ActionTypes.GET_PROFILES_BY_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_GET_PROFILES_BY_POSTS: {
			const profiles = { ...state.profiles };
			for (const profile of action.payload) {
				profiles[profile.alias] = profile;
			}

			return { ...state, profiles };
		}

		case ActionTypes.GET_PROFILE_BY_USERNAME: {
			return state;
		}

		case ActionTypes.SYNC_GET_PROFILE_BY_USERNAME: {
			return {
				...state,
				profiles: {
					...state.profiles,
					[action.payload.alias]: action.payload,
				},
			};
		}

		case ActionTypes.GET_PROFILES_BY_USERNAMES: {
			return state;
		}

		case ActionTypes.SYNC_GET_PROFILES_BY_USERNAMES: {
			const profiles = { ...state.profiles };
			for (const profile of action.payload) {
				profiles[profile.alias] = profile;
			}

			return { ...state, profiles };
		}

		case ActionTypes.GET_CURRENT_FRIENDS: {
			return state;
		}

		case ActionTypes.SYNC_GET_CURRENT_FRIENDS: {
			const friends = action.payload.friends;
			const username = action.payload.username;
			const oldFriends = state.friends[username] || [];
			const finalFriends = friends.reduce(
				(updatedFriends, newFriend) => [
					...updatedFriends.filter((friend) => friend.alias !== newFriend.alias),
					newFriend,
				],
				[...oldFriends],
			);
			return {
				...state,
				friends: {
					...state.friends,
					[username]: finalFriends,
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

		case 'RESET_STORE': {
			return initialState;
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
