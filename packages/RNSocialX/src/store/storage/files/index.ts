export { default as reducer } from './reducer';
export {
	IState,
	IAction,
	ISetUploadStatusAction,
	ISetUploadStatusInput,
	IUploadFileAction,
	IUploadFileInput,
} from './Types';
export { setUploadStatus, uploadFile, removeUploadedFiles } from './actions';
