import { createSelector } from 'reselect';

import { IApplicationState } from './rootReducer';
export { IApplicationState } from './rootReducer';

export const selectComment = createSelector(
	(state: IApplicationState, props: any) => state.data.comments.comments[props.commentId],
	(comment) => comment,
);
