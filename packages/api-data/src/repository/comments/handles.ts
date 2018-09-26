import { IContext, TABLES } from '../../types';
import * as postHandles from '../posts/handles';

export const commentsByPostPath = (context: IContext, postPath: string) =>
	postHandles.postByPath(context, postPath).get(TABLES.COMMENTS);

export const commentMetaById = (context: IContext, commentId: string) => {
	const { gun } = context;
	return gun.get(TABLES.COMMENT_META_BY_ID).get(commentId);
};

export const likesByCommentPath = (context: IContext, commentPath: string) => {
	const { gun } = context;
	return gun.get(commentPath).get(TABLES.LIKES);
};
