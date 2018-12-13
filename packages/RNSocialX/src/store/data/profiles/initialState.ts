import { IState } from './Types';

const initialState: IState = {
	profiles: {},
	friends: {},
	search: {
		results: [],
		previousTerms: {},
	},
};

export default initialState;
