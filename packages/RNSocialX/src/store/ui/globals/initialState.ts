import { IState } from './Types';

const initialState: IState = {
	offline: false,
	canLoadMorePosts: true,
	register: false,
	login: false,
	activity: {
		title: '',
		message: '',
	},
};

export default initialState;
