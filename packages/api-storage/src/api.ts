import { Ipfslib } from './ipfslib';
import {
	IListenerCompleted,
	IListenerProgess,
	IProviderParams,
	IUploader,
} from './types';

export const storageApiFactory = (
	config: IProviderParams = {
		host: '0.0.0.0',
		port: '8080',
		protocol: 'http',
		root: '/api/v0',
	},
	uploader: IUploader,
) => {
	const ipfs = new Ipfslib(config, uploader);

	return {
		uploadFile: (
			path: string,
			onStart?: (uploadId: string) => void,
			onProgress?: (data: IListenerProgess & { uploadId: string }) => void,
		): Promise<IListenerCompleted & { uploadId: string }> =>
			ipfs.addFileBN(path, onStart, onProgress),
		getFileInfo: (path: string) => ipfs.getFileInfo(path),
		abortUpload: (uploadId: string) => ipfs.cancelUpload(uploadId),
	};
};

export type IStorageApiFactory = ReturnType<typeof storageApiFactory>;
