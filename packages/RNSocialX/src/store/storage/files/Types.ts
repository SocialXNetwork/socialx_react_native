import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { ISetAuthAction } from '../../app/auth/Types';

export type IState = DeepReadonly<{
	uploadProgress: {
		[hash: string]: number;
	};
}>;

export const enum ActionTypes {
	SET_UPLOAD_PROGRESS = 'storage/files/SET_UPLOAD_PROGRESS',
}

export interface ISetUploadProgressInput {
	hash: string;
	percentage: number;
}

export interface ISetUploadProgressAction extends Action {
	type: ActionTypes.SET_UPLOAD_PROGRESS;
	payload: ISetUploadProgressInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction = IResetStoreAction | ISetUploadProgressAction;
