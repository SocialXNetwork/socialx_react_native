import { IState } from './Types';

const initialState: IState = {
	offline: false,
	canLoadMorePosts: true,
	activity: {
		title: '',
		message: '',
	},
};

export default initialState;
