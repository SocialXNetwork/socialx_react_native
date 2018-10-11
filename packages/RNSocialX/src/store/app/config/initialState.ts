import { IState } from './Types';

const initialState: IState = {
	appConfig: {
		gun: {
			superPeers: [],
		},
		ipfsConfig: {
			ipfs_URL: '',
			ipfs_server: '',
			ipfs_port: '0',
			opts: {
				root: '',
				protocol: 'https',
			},
		},
	},
	customGunSuperPeers: [],
};

export default initialState;
