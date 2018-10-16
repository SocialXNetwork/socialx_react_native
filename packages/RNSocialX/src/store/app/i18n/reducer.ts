import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.REHYDRATE: {
			const { dictionary, ...others } = action.payload.app.i18n;
			return {
				...state,
				...others,
			};
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
