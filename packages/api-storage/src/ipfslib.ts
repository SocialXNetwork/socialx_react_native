import Upload, {
	IListenerCompleted,
	IListenerError,
	IListenerProgess,
} from 'react-native-background-upload';

import { IProviderParams } from './types';

const promisifyReturn = <T>(returnData: T, returnError: any): Promise<T> =>
	new Promise((resolve, reject) => {
		if (returnError) {
			reject(returnError);
		}
		resolve(returnData);
	});

export class Ipfslib {
	private config: IProviderParams = {
		host: '0.0.0.0',
		port: '8080',
		protocol: 'http',
		root: '/api/v0',
	};

	constructor(params: IProviderParams) {
		if (params) {
			if (!params.protocol || !params.root) {
				this.config.host = params.host;
				this.config.port = params.port;
			} else {
				this.config = params;
			}
		}
	}

	public addFileBN = async (
		path: string,
		onStart?: (uploadId: string) => void,
		onProgress?: (progress: IListenerProgess) => void,
	): Promise<IListenerCompleted> => {
		const opts = {
			url: this.apiUrl('/add'),
			path: path.replace('file://', ''),
			method: 'POST',
			type: 'multipart',
			field: 'file',
			notification: { enabled: false },
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		try {
			const uploadId = await Upload.startUpload(opts);
			if (onStart) {
				onStart(uploadId);
			}

			Upload.addListener('progress', uploadId, (data: IListenerProgess) => {
				if (onProgress) {
					onProgress(data);
				}
			});

			return new Promise<any>((_, reject) => {
				Upload.addListener('error', uploadId, (data: IListenerError) => {
					reject(data);
				});
			});

			return new Promise<any>((resolve) => {
				Upload.addListener(
					'completed',
					uploadId,
					(data: IListenerCompleted) => {
						resolve(data);
					},
				);
			});
		} catch (ex) {
			return new Promise<any>((_, reject) => {
				reject(ex);
			});
		}
	};

	public getFileInfo = (path: string) => Upload.getFileInfo(path);
	public cancelUpload = (uploadId: string) => Upload.cancelUpload(uploadId);

	private apiUrl = (path: string): string => {
		return `${this.config.protocol}://${this.config.host}${
			this.config.port ? ':' + this.config.port : ''
		}${this.config.root}${path}`;
	};
}
