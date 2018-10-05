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
				profiles: [
					...state.profiles.filter(
						(profile) => profile.pub !== action.payload.pub,
					),
					action.payload,
				],
			};
		}

		case ActionTypes.GET_PROFILES_BY_POSTS: {
			return state;
		}

		case ActionTypes.SYNC_GET_PROFILES_BY_POSTS: {
			const finalProfiles = action.payload.reduce(
				(updatedProfiles, newProfile) => [
					...updatedProfiles.filter(
						(updatedProfile: any) =>
							updatedProfile.username !== newProfile.username,
					),
					newProfile,
				],
				[...state.profiles],
			);
			return {
				profiles: finalProfiles,
			};
		}

		case ActionTypes.GET_PROFILE_BY_USERNAME: {
			return state;
		}

		case ActionTypes.SYNC_GET_PROFILE_BY_USERNAME: {
			return {
				profiles: [
					...state.profiles.filter(
						(profile) => profile.pub !== action.payload.pub,
					),
					action.payload,
				],
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

		case 'RESET_STORE': {
			return initialState;
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
