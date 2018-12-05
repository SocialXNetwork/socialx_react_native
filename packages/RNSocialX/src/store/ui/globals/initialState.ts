import { IState } from './Types';

const initialState: IState = {
	offline: false,
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
	postingCommentId: '',
};

export default initialState;
