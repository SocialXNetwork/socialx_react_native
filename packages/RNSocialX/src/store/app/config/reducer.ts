import { assertNever } from '../../helpers';
import initialState from './initialState';
import { ActionTypes, IAction, IState } from './Types';

export default (state: IState = initialState, action: IAction): IState => {
	switch (action.type) {
		case ActionTypes.SET_APP_CONFIG: {
			return {
				...state,
				appConfig: action.payload.appConfig,
			};
		}

		case ActionTypes.SET_CUSTOM_GUN_SUPER_PEERS: {
			return {
				...state,
				customGunSuperPeers: action.payload.customGunSuperPeers,
			};
		}

		default: {
			assertNever(action);
			return state;
		}
	}
};
