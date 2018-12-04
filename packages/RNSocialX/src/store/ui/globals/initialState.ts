import { IState } from './Types';

const initialState: IState = {
	offline: false,
	canLoadMorePosts: true,
	canLoadMoreFriendsPosts: true,
	activity: {
		visible: false,
		title: '',
		message: '',
	},
	transparentOverlay: {
		visible: false,
		alpha: 0,
		loader: false,
	},
	placeholderPost: null,
};

export default initialState;
