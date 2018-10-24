import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SEARCH_PROFILES_BY_FULLNAME: {
			return state;
		}

		case ActionTypes.SYNC_SEARCH_PROFILES_BY_FULLNAME: {
			const finalProfiles = action.payload.reduce(
				(updatedProfiles, newProfile) => [
					...updatedProfiles.filter(
						(updatedProfile) => updatedProfile.alias !== newProfile.alias,
					),
					newProfile,
				],
				[...state.searchResults],
			);
			return {
				...state,
				searchResults: finalProfiles,
			};
		}

		case ActionTypes.FIND_FRIENDS_SUGGESTIONS: {
			return state;
		}

		case ActionTypes.SYNC_FIND_FRIENDS_SUGGESTIONS: {
			return {
				...state,
				friendsSuggestions: action.payload,
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
