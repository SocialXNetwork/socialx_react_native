import { IState } from './Types';

const initialState: IState = {
	offline: false,
	canLoadMorePosts: true,
	activity: {
		visible: false,
		title: '',
		message: '',
	},
	transparentOverlay: {
		visible: false,
		alpha: 0,
	},
};

export default initialState;
