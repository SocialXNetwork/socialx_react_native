import { sampleSize } from 'lodash';
import { createSelector } from 'reselect';

export { IApplicationState } from './rootReducer';

import { IState as IComments } from './data/comments';
import { IState as IMessages } from './data/messages';
import { IState as INotifications } from './data/notifications';
import { IState as IPosts } from './data/posts';
import { IState as IProfiles } from './data/profiles';

export const selectProfile = createSelector(
	(state: IProfiles, alias: string) => state.profiles[alias],
	(profile) => profile,
);

export const selectPost = createSelector(
	(state: IPosts, id: string) => state.all[id],
	(post) => post,
);

export const selectComment = createSelector(
	(state: IComments, id: string) => state.comments[id],
	(comment) => comment,
);

export const selectNotification = createSelector(
	(state: INotifications, id: string) => state.all[id],
	(notification) => notification,
);

export const selectNumberOfPostLikes = createSelector(
	(state: IPosts, postId: string) => state.all[postId].likes.ids.length,
	(likes) => likes,
);

export const selectNumberOfPostComments = createSelector(
	(state: IPosts, postId: string) => state.all[postId].comments.length,
	(comments) => comments,
);

export const selectFriends = createSelector(
	(state: IProfiles, alias: string) => state.friends[alias],
	(friends) => sampleSize(friends, 3),
);

export const selectAvatar = createSelector(
	(state: IProfiles, alias: string) => state.profiles[alias].avatar,
	(avatar) => avatar,
);

export const selectLastMessage = createSelector(
	(state: IMessages, alias: string) =>
		state.messages[alias] && state.messages[alias][state.messages[alias].length - 1],
	(message) => message,
);

export const selectMessages = createSelector(
	(state: IMessages, alias: string) => state.messages[alias] || [],
	(messages) => messages,
);
