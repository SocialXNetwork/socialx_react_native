import {
	IGetFileInfo,
	IListenerCompleted,
	IListenerError,
	IListenerProgess,
	IProviderParams,
	IUploader,
} from './types';

export class Ipfslib {
	Upload: IUploader;

	private config: IProviderParams = {
		host: '0.0.0.0',
		port: '8080',
		protocol: 'http',
		root: '/api/v0',
	};

	constructor(params: IProviderParams, uploader: IUploader) {
		this.Upload = uploader;
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
		onProgress?: (progress: IListenerProgess & { uploadId: string }) => void,
	): Promise<IListenerCompleted & { uploadId: string }> => {
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
			const uploadId = await this.Upload.startUpload(opts);
			if (onStart) {
				onStart(uploadId);
			}

			this.Upload.addListener('progress', uploadId, (data: IListenerProgess) => {
				if (onProgress) {
					onProgress({ ...data, uploadId });
				}
			});

			return new Promise<any>((resolve, reject) => {
				this.Upload.addListener('error', uploadId, (data: IListenerError) => {
					reject(data);
				});
				this.Upload.addListener(
					'completed',
					uploadId,
					(data: IListenerCompleted & { uploadId: string }) => {
						resolve({ ...data, uploadId });
					},
				);
			});
		} catch (ex) {
			return new Promise<any>((_, reject) => {
				reject(ex);
			});
		}
	};

	public getFileInfo = (path: string): Promise<IGetFileInfo> => this.Upload.getFileInfo(path);
	public cancelUpload = (uploadId: string) => this.Upload.cancelUpload(uploadId);

	private apiUrl = (path: string): string => {
		return `${this.config.protocol}://${this.config.host}${
			this.config.port ? ':' + this.config.port : ''
		}${this.config.root}${path}`;
	};
}
