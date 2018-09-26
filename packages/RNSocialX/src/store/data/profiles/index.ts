import { IUsernameArgument } from './Types';

export { default as reducer } from './reducer';
export { IState, IAction, IProfile, IUsernameArgument } from './Types';
export {
	createProfile,
	getCurrentProfile,
	getProfileByUsername,
	getPublicKeyByUsername,
} from './actions';
