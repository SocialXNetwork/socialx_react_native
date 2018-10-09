export interface IProviderParams {
	host: string;
	port: string;
	protocol?: string;
	root?: string;
}

interface IUploadOpts {
	url: string;
	path: string;
	method: string;
	type: string;
	headers?: {
		[key: string]: string;
	};
	field?: string;
	// Below are options only supported on Android
	notification?: {
		enabled: boolean;
	};
}
interface IUploadResult {
	responseCode: number;
	responseBody: any;
}
export interface IGetFileInfo {
	name: string;
	exists: string;
	size: number;
	extension: string;
	mimeType: string;
}
interface IListenerBase {
	id: string;
}
export interface IListenerProgess extends IListenerBase {
	progress: number;
}
export interface IListenerError extends IListenerBase {
	error: string;
}
export interface IListenerCompleted extends IListenerBase, IUploadResult {}
export interface IUploader {
	startUpload: (options: IUploadOpts) => Promise<string>;
	getFileInfo: (path: string) => Promise<IGetFileInfo>;
	cancelUpload: (uploadId: string) => Promise<boolean>;
	addListener: (
		eventType: string,
		uploadId: string,
		listener: (data: any) => void,
	) => void;
}
