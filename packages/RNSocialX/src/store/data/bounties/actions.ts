import { ActionCreator } from 'redux';
import uuid from 'uuid/v4';

import { IThunk } from '../../types';
import { beginActivity, endActivity, setError } from '../../ui/activities';
import {
	ActionTypes,
	IBounties,
	IGetBountiesAction,
	ISyncGetBountiesAction,
	IUpdateBounty,
	IUpdateBountyAction,
} from './Types';

const getBountiesAction: ActionCreator<IGetBountiesAction> = () => ({
	type: ActionTypes.GET_BOUNTIES,
});

const syncGetBountiesActions: ActionCreator<ISyncGetBountiesAction> = (bounties: IBounties) => ({
	type: ActionTypes.SYNC_GET_BOUNTIES,
	payload: bounties,
});

export const getBounties = (): IThunk => async (dispatch) => {
	const activityId = uuid();

	try {
		// dispatch(getBountiesAction());
		await dispatch(
			beginActivity({
				type: ActionTypes.GET_BOUNTIES,
				uuid: activityId,
			}),
		);
		// GET BOUNTIES
		// dispatch(syncGetBountiesActions({}));
	} catch (e) {
		await dispatch(
			setError({
				type: ActionTypes.GET_BOUNTIES,
				error: e.message,
				uuid: uuid(),
			}),
		);
	} finally {
		await dispatch(endActivity({ uuid: activityId }));
	}
};

export const updateBounty: ActionCreator<IUpdateBountyAction> = (input: IUpdateBounty) => ({
	type: ActionTypes.UPDATE_BOUNTY,
	payload: input,
});
