import { IListenerProgess } from 'react-native-background-upload';
import { Ipfslib } from './ipfslib';
import { IProviderParams } from './types';

export const storageApiFactory = (
	config: IProviderParams = {
		host: '0.0.0.0',
		port: '8080',
		protocol: 'http',
		root: '/api/v0',
	},
) => {
	const ipfs = new Ipfslib(config);

	return {
		uploadFile: (
			path: string,
			onStart?: (uploadId: string) => void,
			onProgress?: (data: IListenerProgess) => void,
		) => ipfs.addFileBN(path, onStart, onProgress),
		getFileInfo: (path: string) => ipfs.getFileInfo(path),
		abortUpload: (uploadId: string) => ipfs.cancelUpload(uploadId),
	};
};
