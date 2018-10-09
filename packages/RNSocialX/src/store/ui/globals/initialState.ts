import { IState } from './Types';

const initialState: IState = {
	offline: false,
	activity: {
		title: '',
		message: '',
	},
};

export default initialState;
