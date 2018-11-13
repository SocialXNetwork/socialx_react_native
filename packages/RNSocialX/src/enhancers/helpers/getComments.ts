import { ICommentsReturnData, IProfileData } from '@socialx/api-data';
import { IApplicationConfig } from '../../store/app/config';

export const getComments = (
	comments: ICommentsReturnData[],
	profiles: IProfileData[],
	currentUserId: string,
	appConfig: IApplicationConfig,
) => {
	return comments
		.sort((x, y) => x.timestamp - y.timestamp)
		.map((comment) => {
			const commentOwner = profiles.find((profile) => profile.alias === comment.owner.alias);

			return {
				commentId: comment.commentId,
				text: comment.text,
				user: {
					userId: comment.owner.alias,
					fullName: commentOwner!.fullName,
					avatar:
						commentOwner!.avatar.length > 0
				? appConfig.ipfsConfig.ipfs_URL +
				  commentOwner!.avatar  // tslint:disable-line
							: '',
				},
				timestamp: new Date(comment.timestamp),
				likes: comment.likes.map((like) => {
					return {
						userId: like.owner.alias,
						userName: like.owner.alias,
					};
				}),
				likedByCurrentUser: !!comment.likes.find((like) => like.owner.alias === currentUserId),
			};
		});
};
