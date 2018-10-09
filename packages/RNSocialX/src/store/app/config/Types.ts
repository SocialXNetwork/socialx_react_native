import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { ISetAuthAction } from '../auth/Types';

export interface IApplicationConfig {
	gun: {
		superPeers: string[];
	};
	ipfsConfig: {
		ipfs_URL: string;
		ipfs_server: string;
		ipfs_port: string;
		opts: {
			root: string;
			protocol: 'http' | 'https';
		};
	};
}

export type IState = DeepReadonly<{
	appConfig: IApplicationConfig;
	customGunSuperPeers: string[];
}>;

export const enum ActionTypes {
	SET_APP_CONFIG = 'app/config/SET_APP_CONFIG',
	SET_CUSTOM_GUN_SUPER_PEERS = 'app/config/SET_CUSTOM_GUN_SUPER_PEERS',
}

export interface ISetAppConfigInput {
	appConfig: IApplicationConfig;
}

export interface ISetCustomGunSuperPeersInput {
	customGunSuperPeers: string[];
}

export interface ISetAppConfigAction extends Action {
	type: ActionTypes.SET_APP_CONFIG;
	payload: ISetAppConfigInput;
}

export interface ISetCustomGunSuperPeersAction extends Action {
	type: ActionTypes.SET_CUSTOM_GUN_SUPER_PEERS;
	payload: ISetCustomGunSuperPeersInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetStoreAction
	| ISetAppConfigAction
	| ISetCustomGunSuperPeersAction;
