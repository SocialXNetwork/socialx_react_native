import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.CREATE_COMMENT: {
			return { ...state };
		}

		case ActionTypes.LIKE_COMMENT: {
			return { ...state };
		}

		case ActionTypes.COMMENT_LIKES: {
			return { ...state };
		}

		case ActionTypes.POST_COMMENTS: {
			return { ...state };
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
