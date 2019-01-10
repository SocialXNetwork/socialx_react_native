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
	loading: {
		progress: 0,
		message: 'login',
	},
};

export default initialState;
