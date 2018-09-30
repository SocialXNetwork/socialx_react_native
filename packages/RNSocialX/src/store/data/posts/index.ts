export { default as reducer } from './reducer';

export {
	IState,
	IAction,
	IProfile,
	IPostIdInput,
	IPostPathInput,
	IUsernameInput,
	IDateInput,
} from './Types';

export {
	getPostByPath,
	getPostPathsByUsername,
	getPublicPostsByDate,
	createPost,
	likePost,
	removePost,
	unlikePost,
} from './actions';
