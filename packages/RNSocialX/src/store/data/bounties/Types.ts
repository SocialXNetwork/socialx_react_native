import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { CoinSymbol } from '../../../environment/consts';

export interface IBounty {
	id: string;
	title: string;
	content: string;
	categories: string[];
	expiryDate: Date;
	submissionMin: number;
	submissionMax: number;
	reward: number;
	claimed: boolean;
	coin?: CoinSymbol;
}

export const enum ActionTypes {
	GET_BOUNTIES = 'data/bounties/GET_BOUNTIES',
	SYNC_GET_BOUNTIES = 'data/bounties/SYNC_GET_BOUNTIES',
	UPDATE_BOUNTY = 'data/bounties/UPDATE_BOUNTY',
}

export interface IUpdateBounty {
	id: string;
	claimed: boolean;
}

export interface IGetBountiesAction extends Action {
	type: ActionTypes.GET_BOUNTIES;
}

export interface ISyncGetBountiesAction extends Action {
	type: ActionTypes.SYNC_GET_BOUNTIES;
	payload: IBounty[];
}

export interface IUpdateBountyAction extends Action {
	type: ActionTypes.UPDATE_BOUNTY;
	payload: IUpdateBounty;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}

export type IAction =
	| IGetBountiesAction
	| ISyncGetBountiesAction
	| IUpdateBountyAction
	| IResetStoreAction;
