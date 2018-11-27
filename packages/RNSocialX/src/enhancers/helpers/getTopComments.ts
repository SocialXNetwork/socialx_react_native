import { ICommentsReturnData } from '@socialx/api-data';

export const getTopComments = (comments: ICommentsReturnData[]) => {
	return comments
		.sort((x, y) => y.timestamp - x.timestamp)
		.sort((x, y) => y.likes.length - x.likes.length)
		.slice(0, 2)
		.map((comment) => {
			return {
				commentId: comment.commentId,
				text: comment.text,
				owner: {
					userId: comment.owner.alias,
					userName: comment.owner.alias,
				},
			};
		});
};
