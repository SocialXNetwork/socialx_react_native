import {promisify} from 'es6-promisify';

import * as Gun from 'gun/gun';

// temp and should be removed (just for offline testing on node)
// import 'gun/lib/store';

import 'gun/nts';
import 'gun/sea';

import './extensions/asyncStorageAdapter';
import './extensions/docload';
import './extensions/encrypt';

import {api as accountsApi} from './repository/accounts';

import {getters as commentGetters, setters as commentSetters} from './repository/comments';

import {getters as postGetters, IPostData, setters as postSetters} from './repository/posts';

import {
	getters as profileGetters,
	ICreateProfileInput,
	IGetPublicKeyInput,
	IProfile,
	setters as profileSetters,
} from './repository/profiles';

import {GunInstance, IContext, IGunCallback, ILikesMetasCallback, IMetasCallback} from './types';

export interface IApiOptions {
	peers: string[];
}

export const dataApiFactory = ({peers}: IApiOptions) => {
	const time = () => new Date(Gun.state());

	const gun: GunInstance = new Gun({
		peers,
	});

	const account = gun.user();

	const {encrypt, decrypt, work} = Gun.SEA;

	const context: IContext = {
		time,
		gun,
		account,
		encrypt,
		decrypt,
		work,
	};

	const accounts = accountsApi(context);

	return {
		accounts,
		comments: {
			getPostComments: promisify<IMetasCallback[], {postId: string}>(
				({postId}: {postId: string}, callback: IGunCallback<IMetasCallback[]>) =>
					commentGetters.getPostComments(context, {postId}, callback),
			),
			getPostLikes: promisify<ILikesMetasCallback[], {commentId: string}>(
				({commentId}: {commentId: string}, callback: IGunCallback<ILikesMetasCallback[]>) =>
					commentGetters.getPostLikes(context, {commentId}, callback),
			),
			createComment: promisify<null, {text: string; postId: string}>(
				({text, postId}: {text: string; postId: string}, callback: IGunCallback<null>) =>
					commentSetters.createComment(context, {text, postId}, callback),
			),
			likeComment: promisify<null, {commentId: string}>(
				({commentId}: {commentId: string}, callback: IGunCallback<null>) =>
					commentSetters.likeComment(context, {commentId}, callback),
			),
		},
		posts: {
			getPostPathsByUser: promisify<string[], {username: string}>(
				({username}: {username: string}, callback: IGunCallback<string[]>) =>
					postGetters.getPostPathsByUser(context, {username}, callback),
			),
			getPostByPath: promisify<IPostData, {postPath: string}>(
				({postPath}: {postPath: string}, callback: IGunCallback<IPostData>) =>
					postGetters.getPostByPath(context, {postPath}, callback),
			),
			getPublicPostsByDate: promisify<IPostData, {date: Date}>(
				({date}: {date: Date}, callback: IGunCallback<IPostData>) =>
					postGetters.getPublicPostsByDate(context, {date}, callback),
			),
			getPostLikes: promisify<ILikesMetasCallback, {postId: string}>(
				({postId}: {postId: string}, callback: IGunCallback<ILikesMetasCallback>) =>
					postGetters.getPostLikes(context, {postId}, callback),
			),
			createPost: promisify<null, IPostData>((createPostInput: IPostData, callback: IGunCallback<null>) =>
				postSetters.createPost(context, createPostInput, callback),
			),
			likePost: promisify<null, {postId: string}>(({postId}: {postId: string}, callback: IGunCallback<null>) =>
				postSetters.likePost(context, {postId}, callback),
			),
		},
		profiles: {
			getPublicKeyByUsername: promisify<string, IGetPublicKeyInput>(
				({username}: IGetPublicKeyInput, callback: IGunCallback<string>) =>
					profileGetters.getPublicKeyByUsername(context, {username}, callback),
			),
			getCurrentProfile: promisify<IProfile>((callback: IGunCallback<IProfile>) =>
				profileGetters.getCurrentProfile(context, callback),
			),
			getProfileByUsername: promisify<IProfile, {username: string}>(
				({username}: {username: string}, callback: IGunCallback<IProfile>) =>
					profileGetters.getProfileByUsername(context, {username}, callback),
			),
			createProfile: promisify<null, ICreateProfileInput>(
				(createProfileInput: ICreateProfileInput, callback: IGunCallback<null>) =>
					profileSetters.createProfile(context, createProfileInput, callback),
			),
		},
	};
};

export type IDataApiFactory = ReturnType<typeof dataApiFactory>;
