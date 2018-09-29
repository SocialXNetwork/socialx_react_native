import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';

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

export type IAction = ISetUploadProgressAction;
