import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SHOW_CONFIRMATION: {
			return {
				...state,
				confirmation: action.payload,
			};
		}

		case ActionTypes.HIDE_CONFIRMATION: {
			return {
				...state,
				confirmation: null,
			};
		}

		case ActionTypes.SHOW_MODAL: {
			return {
				...state,
				modal: action.payload,
			};
		}

		case ActionTypes.HIDE_MODAL: {
			return {
				...state,
				modal: null,
			};
		}

		case ActionTypes.SHOW_MESSAGE: {
			return {
				...state,
				message: action.payload,
			};
		}

		case ActionTypes.HIDE_MESSAGE: {
			return {
				...state,
				message: null,
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
				optionsMenu: null,
			};
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
