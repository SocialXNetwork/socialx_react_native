import { IState } from './Types';

const initialState: IState = {
	global: {
		posts: [],
		canLoadMore: true,
		nextToken: undefined,
	},
	friends: {
		posts: [],
		canLoadMore: true,
		nextToken: undefined,
	},
};

export default initialState;
