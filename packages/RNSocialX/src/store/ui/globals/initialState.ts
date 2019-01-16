import { IState } from './Types';

const initialState: IState = {
	logout: false,
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
	accountLoaded: false,
	profileLoaded: false,
	friendsLoaded: false,
	postsLoaded: false,
};

export default initialState;
