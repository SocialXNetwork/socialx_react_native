import { IContext, TABLE_ENUMS, TABLES } from '../../types';
import * as postHandles from '../posts/handles';

export const commentsByPostPath = (context: IContext, postPath: string) =>
	postHandles.postByPath(context, postPath).path(TABLE_ENUMS.COMMENTS);

export const commentMetaById = (context: IContext, commentId: string) => {
	const { gun } = context;
	return gun.path(`${TABLES.COMMENT_META_BY_ID}.${commentId}`);
};

export const likesByCommentPath = (context: IContext, commentPath: string) => {
	const { gun } = context;
	return gun.path(`${commentPath}.${TABLE_ENUMS.LIKES}`);
};
