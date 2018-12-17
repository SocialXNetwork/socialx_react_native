import { createSelector } from 'reselect';

import { IApplicationState } from './rootReducer';
export { IApplicationState } from './rootReducer';

export const selectComment = createSelector(
	(state: IApplicationState, props: { commentId: string }) =>
		state.data.comments.comments[props.commentId],
	(comment) => comment,
);

export const selectProfile = createSelector(
	(state: IApplicationState, props: { alias: string }) => state.data.profiles.profiles[props.alias],
	(profile) => profile,
);

export const selectPost = createSelector(
	(state: IApplicationState, props: { postId: string }) => state.data.posts.all[props.postId],
	(post) => post,
);

export const selectNotification = createSelector(
	(state: IApplicationState, props: { id: string }) => state.data.notifications.all[props.id],
	(notification) => notification,
);
