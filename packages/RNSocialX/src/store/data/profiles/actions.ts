import {ICreateProfileInput} from '@socialx/api-data';
import {ActionCreator} from 'redux';
import {IThunk} from '../../types';
import {
	ActionTypes,
	ICreateProfileAction,
	ICurrentProfileAction,
	IProfile,
	IProfileByUsernameAction,
	IPublicKeyByUsernameAction,
	IUsernameArgument,
} from './Types';

const createProfileAction: ActionCreator<ICreateProfileAction> = (createProfileInput: ICreateProfileInput) => ({
	type: ActionTypes.CREATE_PROFILE,
	payload: createProfileInput,
});

export const createProfile = (createProfileInput: ICreateProfileInput): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		// get something from anywhere redux store
		// const currentUserAccount = getState().app.accounts.currentUser;
		// const currentOverlayStatus = getState().ui.overlays.currentOverlayStatus;

		// get something from api
		// const data = await context.dataApi.accounts.createAccount(createAccountInput);

		// for instance import this action from ui and begin showing loding indicator
		// dispatch(setGlobalLoadingIndicator(true));

		dispatch(createProfileAction(createProfileInput));
	} catch (e) {
		// dispatch(setGlobalLoadingIndicator(false);
		// dispatch(addNotificationtoQueue('there was an error');
	}
};

const profileByUsernameAction: ActionCreator<IProfileByUsernameAction> = (
	profileByUsernameInput: IUsernameArgument,
) => ({
	type: ActionTypes.PROFILE_BY_USERNAME,
	payload: profileByUsernameInput,
});

export const profileByUsername = (profileByUsernameInput: IUsernameArgument): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(profileByUsernameAction(profileByUsernameInput));
	} catch (e) {
		/**/
	}
};

const currentProfileAction: ActionCreator<ICurrentProfileAction> = () => ({
	type: ActionTypes.CURRENT_PROFILE,
});

export const currentProfile = (): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(currentProfileAction());
	} catch (e) {
		/**/
	}
};

const publicKeyByUsernameAction: ActionCreator<IPublicKeyByUsernameAction> = (
	profileUsernameInput: IUsernameArgument,
) => ({
	type: ActionTypes.PUBLIC_KEY_BY_USERNAME,
	payload: profileUsernameInput,
});

export const publicKeyByUsername = (profileUsernameInput: IUsernameArgument): IThunk => async (
	dispatch,
	getState,
	context,
) => {
	try {
		dispatch(publicKeyByUsernameAction(profileUsernameInput));
	} catch (e) {
		/**/
	}
};

const currentUserProfileAction: ActionCreator<ICurrentProfileAction> = () => ({
	type: ActionTypes.CURRENT_PROFILE,
});

export const logout = (): IThunk => async (dispatch, getState, context) => {
	try {
		dispatch(currentProfile());
	} catch (e) {
		/**/
	}
};
