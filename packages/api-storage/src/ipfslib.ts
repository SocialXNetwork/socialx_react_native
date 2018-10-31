import axios from 'axios';
import {
	IGetFileInfo,
	IListenerCompleted,
	IListenerError,
	IListenerProgess,
	IProviderParams,
	IUploader,
} from './types';

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
		onProgress?: (progress: IListenerProgess & { uploadId: string }) => void,
	): Promise<{ Hash: string; Name: string; Size: string }> => {
		const data = new FormData();
		data.append('file', {
			uri: path,
			type: 'file',
			name: `${new Date().getTime()}.jpg`,
		} as any);

		const config = {
			onUploadProgress: (progressEvent: any) => {
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				if (onProgress) {
					onProgress({ uploadId: path, progress: percentCompleted, id: '' });
				}
			},
		};

		if (onStart) {
			onStart(path);
		}

		try {
			const res = await axios.put(this.apiUrl('/add'), data, config);
			console.log('*** uploading finished', { res });

			return res.data;
		} catch (ex) {
			console.log('*** uploading failed', { ex });
			return ex;
		}
	};

	private apiUrl = (path: string): string => {
		return `${this.config.protocol}://${this.config.host}${
			this.config.port ? ':' + this.config.port : ''
		}${this.config.root}${path}`;
	};
}
