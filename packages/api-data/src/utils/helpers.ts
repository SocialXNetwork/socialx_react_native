import { IPostReturnData } from '../repository/posts';
import { IContext, ILikesMetasCallback, IMetasCallback, IMetasTypeCallback } from '../types';

const onlyUnique = (value: any, index: any, self: any) => {
	return self.indexOf(value) === index;
};

export const unique = (arr: any[]) => arr.filter(onlyUnique);

export const datePathFromDate = (date: Date) =>
	`${date.getUTCFullYear()}.${date.getUTCMonth() + 1}.${date.getUTCDate()}`;

export const convertGunSetToArray = <T = {}>(args: IMetasCallback | IMetasTypeCallback<T> = {}) => {
	return Object.values(args || {}).map((ob) => ob);
};

export const convertGunSetToArrayWithKey = (args: any = {}) => {
	return Object.entries(args || {})
		.map(
			([k, v]): any => {
				if (!k || typeof v !== 'object' || v === null) {
					return;
				}
				return { ...v, k };
			},
		)
		.filter((v) => v !== undefined) as any;
};

export const getContextMeta = (context: IContext) => ({
	owner: context.account.is.alias,
	timestamp: context.time().getTime(),
	ownerPub: context.account.is.pub,
});

export const cleanGunMetaFromObject = (args: any = {}) => {
	const { _, ...rest } = args;
	if (rest['#']) {
		delete rest['#'];
	}
	return rest || {};
};

export const resolveCallback = (resolve: any, reject: any) => (e: any, r: any) => {
	if (e) {
		reject(e);
	}
	// We are doing this ugly thing here because objects in javascript are passed as
	// deep references it turns out gun internally mutates references everywhere
	// to leverage performance benefits, but this breaks redux and react in general
	// which expects state data to be immutable. Finally, we are doing it here
	// because this looks like the only place where all getters return their data
	// through. Not architecturally the best place, though.
	resolve(typeof r !== 'undefined' ? JSON.parse(JSON.stringify(r)) : undefined);
};

const flatten: any = (arr: any[] = []) =>
	arr.reduce(
		(flatted: any[], toFlat: any[] | string) =>
			flatted.concat(Array.isArray(toFlat) ? flatten(toFlat) : toFlat),
		[],
	);

// const getAliasFromLike = (like: any) => (like.owner ? like.owner.alias : '');
// const getAliasFromComment = (cmnt: any) => (cmnt.owner ? cmnt.owner.alias : '');
// const getLikesFromComment = (cmnt: any) => (cmnt.likes ? cmnt.likes.map(getAliasFromLike) : []);
// const getUsersFromCommentLikes = (cmnts: any) => (cmnts ? cmnts.map(getLikesFromComment) : []);
// const getUsersThatLiked = (likes: any) => (likes.length ? likes.map(getAliasFromLike) : []);
// const getUsersThatCommented = (comments: any) =>
// 	comments.length ? comments.map(getAliasFromComment) : [];
// const getUserOwner = (owner: any) => owner.alias;

// const getRelatedUsernamesFromPost = (post: any) => {
// 	return [
// 		...getUsersThatLiked(post.likes || []),
// 		...getUsersThatCommented(post.comments || []),
// 		...getUsersFromCommentLikes(post.comments || []),
// 		getUserOwner(post.owner),
// 	].filter((v) => v);
// };

// export const getRelatedUsernamesFromPosts = (posts: object[] = []) => {
// 	return flatten(posts.map(getRelatedUsernamesFromPost));
// };

const getAliasFromLike = (like: any) => (like.owner ? like.owner : null);
const getAliasFromComment = (cmnt: any) => (cmnt.owner ? cmnt.owner : null);
const getLikesFromComment = (cmnt: any) => (cmnt.likes ? cmnt.likes.map(getAliasFromLike) : []);
const getUsersFromCommentLikes = (cmnts: any) => (cmnts ? cmnts.map(getLikesFromComment) : []);
const getUsersThatLiked = (likes: any) => (likes.length ? likes.map(getAliasFromLike) : []);
const getUsersThatCommented = (comments: any) =>
	comments.length ? comments.map(getAliasFromComment) : [];
const getUserOwner = (owner: any) => owner.alias;

const getRelatedUsernamesFromPost = (post: any) => {
	return [
		...getUsersThatLiked(post.likes || []),
		...getUsersThatCommented(post.comments || []),
		...getUsersFromCommentLikes(post.comments || []),
		post.owner,
	].filter((v) => v);
};

export const getRelatedUserObjectsFromPosts = (posts: object[] = []) => {
	return flatten(posts.map(getRelatedUsernamesFromPost));
};
