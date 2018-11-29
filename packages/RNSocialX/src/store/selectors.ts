import { createSelector } from 'reselect';

import { IApplicationState } from './rootReducer';
export { IApplicationState } from './rootReducer';

import { IUserEntryProps } from '../components';

export const selectComment = createSelector(
	(state: IApplicationState, props: { commentId: string }) =>
		state.data.comments.comments[props.commentId],
	(comment) => comment,
);

export const selectProfile = createSelector(
	(state: IApplicationState, props: IUserEntryProps) => state.data.profiles.profiles[props.id],
	(profile) => profile,
);
