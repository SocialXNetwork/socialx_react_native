import { FRIEND_TYPES } from '../../../types';
import { IState } from './Types';

const profiles = {
	jaakee: {
		aboutMeText: 'Test about me text xdxdxd',
		alias: 'jaakee',
		avatar: 'QmSDXuvX84Z3314rXkGTzFFGW2v8PrTSdb31iYkSf6BTjz',
		test: true,
		friends: null,
		email: 't@t.c',
		fullName: 'Jakeeeee',
		pub: 'D1CCXdtoiYjDTqgBucu-lhgxJfeZMue0xDeGHFBw7ck.beTBdjro1MOx_zlvgLGwNoch1_vnZ0w3iAkRVPLWjT8',
		miningEnabled: true,
		status: FRIEND_TYPES.MUTUAL,
		numberOfFriends: 7,
		posts: [],
	},
	hackerman: {
		aboutMeText: 'Awesome hacker',
		alias: 'hackerman',
		avatar: 'QmdsQ89fHsY2GHPDqjnY4D6TSD4z4fmzEU4kFk6b1whY1k',
		friends: null,
		email: 'hackerman@hackerman.com',
		fullName: 'Hack Hackerman',
		pub: 'NYLzZAuf_CRzwGhiVp9CDHKNxwoJ7twR6vt45vuQhbY.mKs3bceOxz5fncR_Qw6kA_QAkKAm2uAJsLepP_2sud4',
		miningEnabled: true,
		status: FRIEND_TYPES.NOT_FRIEND,
		numberOfFriends: 1,
		posts: ['6bdf11ab-0c62-4868-a76b-da972258cd3a', 'b0b59d50-d90d-4a10-84e5-7be91d54b620'],
	},
	letsgheek: {
		aboutMeText: 'I do what I love for my own sake.!!',
		alias: 'letsgheek',
		avatar: 'QmZWb9PtsZQc8ZzrHt73RxwffGftymoBhNwZjTwpKPhk8d',
		friends: null,
		email: 'mkamru7@gmail.com',
		fullName: 'Letsgheek',
		pub: '9LNI-eZbeW6sHOG_KqvvSfm-AiXq7FtBPMibuPNiJIU.UCyvilGMPeqPSrLwZYQ_d-vNkWgOrQjF-_7DvQzE07Q',
		miningEnabled: true,
		status: FRIEND_TYPES.NOT_FRIEND,
		numberOfFriends: 9,
		posts: [],
	},
	Philip: {
		aboutMeText: 'Loves small medium and oversized dogs.',
		alias: 'Philip',
		avatar: 'QmXvvre7jKB6Fe5LhvjVNb5dBq5bivcntS1VPyyNcD1Zn1',
		friends: null,
		email: 'notizenblock@gmail.com',
		fullName: 'Philip',
		pub: 'CZkxClhssMVQzXXC2L7ITVLHld4E9GdUaKwoHzURUuY.-6xMl2kymadNpgb-_jNXjQu1UUDAOnAUanriDpOaamI',
		miningEnabled: true,
		status: FRIEND_TYPES.PENDING,
		numberOfFriends: 1,
		posts: [],
	},
	will2k: {
		aboutMeText: 'about me text',
		alias: 'will2k',
		avatar: 'QmWoYbuXwR7hjzzAp2GJb7oDiHwUbRPjhJMvfPDfiKzQ2v',
		email: 'williamhallman16@gmail.com',
		friends: null,
		fullName: 'Will',
		miningEnabled: true,
		pub: '946RzVH8-gp-Tj-pFJRMh9-l7rlnNK6y8ODzzE9fNIM.fDpG65Xtp2b5WxLWCEO7pZyGvM41GeCnMIKvv0TDI7A',
		status: FRIEND_TYPES.NOT_FRIEND,
		numberOfFriends: 1,
		posts: [],
	},
};

const initialState: IState = {
	profiles,
	friends: {},
	search: {
		results: [],
		previousTerms: {},
	},
};

export default initialState;
