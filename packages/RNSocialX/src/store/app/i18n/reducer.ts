import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.REHYDRATE: {
			if (action.payload && action.payload.app) {
				const { dictionary, ...others } = action.payload.app.i18n;
				return {
					...state,
					...others,
				};
			} else {
				return {
					...state,
				};
			}
		}
		case ActionTypes.SET_LOCALE: {
			return {
				...state,
				currentLocale: action.payload.locale,
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
