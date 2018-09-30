// todo @jake implement the reducers based on gun data shape from getters

import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_POST: {
			return { ...state };
		}

		case ActionTypes.LIKE_POST: {
			return { ...state };
		}

		case ActionTypes.GET_PUBLIC_POSTS_BY_DATE: {
			return { ...state };
		}

		case ActionTypes.SYNC_GET_PUBLIC_POSTS_BY_DATE: {
			const posts = action.payload;
			return { ...state, posts };
		}

		case ActionTypes.GET_POST_BY_PATH: {
			return { ...state };
		}

		// TODO: how do we return the post here? its a single type
		case ActionTypes.SYNC_GET_POST_BY_PATH: {
			const post = action.payload;
			return { ...state, posts: [post] };
		}

		case ActionTypes.GET_POST_PATHS_BY_USER: {
			return { ...state };
		}

		// TODO: where do we store the post paths? (payload here is string[] of paths)
		case ActionTypes.SYNC_GET_POST_PATHS_BY_USER: {
			return { ...state };
		}

		case ActionTypes.REMOVE_POST: {
			return { ...state };
		}

		case ActionTypes.UNLIKE_POST: {
			return { ...state };
		}

		// <============= comments =============>
		case ActionTypes.CREATE_COMMENT: {
			return { ...state };
		}

		case ActionTypes.REMOVE_COMMENT: {
			return { ...state };
		}

		case ActionTypes.LIKE_COMMENT: {
			return { ...state };
		}

		case ActionTypes.UNLIKE_COMMENT: {
			return { ...state };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
