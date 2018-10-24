import { IPostReturnData } from '@socialx/api-data';
import { ActionCreator } from 'redux';
import uuidv4 from 'uuid/v4';
import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import {
	ActionTypes,
	IGetUserPostsAction,
	IGetUserPostsInput,
	ISyncGetUserPostsAction,
} from './Types';

export const getUserPostsAction: ActionCreator<IGetUserPostsAction> = (
	getUserPostsInput: IGetUserPostsInput,
) => ({
	type: ActionTypes.GET_USER_POSTS,
	payload: getUserPostsInput,
});

export const syncGetUserPostsAction: ActionCreator<
	ISyncGetUserPostsAction
> = (userPosts: { posts: IPostReturnData[]; owner: string }) => ({
	type: ActionTypes.SYNC_GET_USER_POSTS,
	payload: userPosts,
});

export const getUserPosts = (
	getUserPostsInput: IGetUserPostsInput,
): IThunk => async (dispatch, getState, context) => {
	const activityId = uuidv4();

	try {
		dispatch(getUserPostsAction(getUserPostsInput));
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_USER_POSTS,
				uuid: activityId,
			}),
		);
		const { dataApi } = context;
		const userPosts = await dataApi.posts.getPostsByUser(getUserPostsInput);
		console.log('userPosts', userPosts);
		dispatch(
			syncGetUserPostsAction({
				posts: userPosts,
				owner: getUserPostsInput.username,
			}),
		);
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.SYNC_GET_USER_POSTS,
				error: e.message,
				uuid: uuidv4(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

export const updateUserPostsAction: ActionCreator<IGetUserPostsAction> = (
	getUserPostsInput: IGetUserPostsInput,
) => ({
	type: ActionTypes.GET_USER_POSTS,
	payload: getUserPostsInput,
});
