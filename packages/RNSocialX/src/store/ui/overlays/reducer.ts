import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SHOW_MODAL: {
			const { type, payload } = action.payload;

			return {
				...state,
				modal: {
					type,
					payload,
				},
			};
		}

		case ActionTypes.HIDE_MODAL: {
			return {
				...state,
				modal: {
					type: null,
				},
			};
		}

		case ActionTypes.SHOW_OPTIONS_MENU: {
			return {
				...state,
				optionsMenu: action.payload,
			};
		}

		case ActionTypes.HIDE_OPTIONS_MENU: {
			return {
				...state,
				optionsMenu: [],
			};
		}

		case ActionTypes.SHOW_MEDIA: {
			return {
				...state,
				media: action.payload,
			};
		}

		case ActionTypes.HIDE_MEDIA: {
			return {
				...state,
				media: {
					items: [],
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
