import { IContext, TABLE_ENUMS, TABLES } from '../../types';
import { datePathFromDate } from '../../utils/helpers';

export const currentFriendRequests = (context: IContext) => {
	const { gun, account } = context;
	return gun.path(`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS}.${account.is.alias}`);
};

export const currentFriendReqResponse = (context: IContext) => {
	const { gun, account } = context;
	return gun.path(
		`${TABLES.NOTIFICATIONS}.${TABLE_ENUMS.FRIEND_REQUESTS_RESPONSE}.${account.is.alias}`,
	);
};

export const todaysPublicPosts = (context: IContext) => {
	const { gun } = context;
	const todaysPostsPath = datePathFromDate(new Date(Date.now()));
	return gun.path(`${TABLES.POSTS}.${todaysPostsPath}.${TABLE_ENUMS.PUBLIC}`);
};

export const commentsByPostPath = (context: IContext, postPath: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.POSTS}.${postPath}.${TABLE_ENUMS.COMMENTS}`);
};

export const likesByPostPath = (context: IContext, postPath: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.POSTS}.${postPath}.${TABLE_ENUMS.LIKES}`);
};

export const commentLikesByCommentPath = (context: IContext, commentPath: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.POSTS}.${commentPath}.${TABLE_ENUMS.LIKES}`);
};
