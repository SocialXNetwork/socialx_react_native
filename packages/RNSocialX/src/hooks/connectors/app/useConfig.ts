import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	IApplicationConfig,
	ISetAppConfigInput,
	ISetCustomGunSuperPeersInput,
	setAppConfig,
	setCustomGunSuperPeers,
} from '../../../store/app/config';

const selectAppConfig = createSelector(
	(state: IApplicationState) => state.app.config.appConfig,
	(appConfig) => appConfig,
);

const selectCustomGunSuperPeers = createSelector(
	(state: IApplicationState) => state.app.config.customGunSuperPeers,
	(customGunSuperPeers) => customGunSuperPeers,
);

export const useConfigData = () => ({
	appConfig: useSelector(selectAppConfig),
	customGunSuperPeers: useSelector(selectCustomGunSuperPeers),
});

export const useConfigActions = () => {
	const dispatch = useDispatch();

	return {
		setAppConfig: (setAppConfigInput: ISetAppConfigInput) =>
			dispatch(setAppConfig(setAppConfigInput)),
		setCustomGunSuperPeers: (setCustomGunSuperPeersInput: ISetCustomGunSuperPeersInput) =>
			dispatch(setCustomGunSuperPeers(setCustomGunSuperPeersInput)),
	};
};
