import { IState } from './Types';

const initialState: IState = {
	offline: false,
	canLoadMorePosts: true,
	activity: {
		visible: false,
		title: '',
		message: '',
	},
};

export default initialState;
