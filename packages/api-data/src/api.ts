import {promisify} from 'es6-promisify';

import * as Gun from 'gun/gun';

// temp and should be removed (just for offline testing on node)
// import 'gun/lib/store';

import 'gun/nts';
import 'gun/sea';

import './extensions/asyncStorageAdapter';
import './extensions/docload';
import './extensions/encrypt';

import {
	getters as accountGetters,
	IChangePassword,
	ICreateAccountInput,
	ICredentials,
	IRecoverAccountInput,
	setters as accountSetters,
} from './repository/accounts';

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

interface IApiOptions {
	peers: string[];
}

export const dataApi = ({peers}: IApiOptions) => {
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

	return {
		accounts: {
			isAccountLoggedIn: promisify<{loggedIn: boolean}>((callback: IGunCallback<{loggedIn: boolean}>) =>
				accountGetters.isAccountLoggedIn(context, callback),
			),
			createAccount: promisify<null>((createAccountInput: ICreateAccountInput, callback: IGunCallback<null>) =>
				accountSetters.createAccount(context, createAccountInput, callback),
			),
			login: promisify<null>((credentials: ICredentials, callback: IGunCallback<null>) =>
				accountSetters.login(context, credentials, callback),
			),
			logout: promisify<null>((callback: IGunCallback<null>) => accountSetters.logout(context, callback)),
			changePassword: promisify<null>((changePassword: IChangePassword, callback: IGunCallback<null>) =>
				accountSetters.changePassword(context, changePassword, callback),
			),
			recoverAccount: promisify<{hint: string}>(
				(recoverAccount: IRecoverAccountInput, callback: IGunCallback<{hint: string}>) =>
					accountSetters.recoverAccount(context, recoverAccount, callback),
			),
			trustAccount: promisify<null>((callback: IGunCallback<null>) => accountSetters.trustAccount(context, callback)),
		},
		comments: {
			getPostComments: promisify<IMetasCallback[]>(
				({postId}: {postId: string}, callback: IGunCallback<IMetasCallback[]>) =>
					commentGetters.getPostComments(context, {postId}, callback),
			),
			getPostLikes: promisify<ILikesMetasCallback[]>(
				({commentId}: {commentId: string}, callback: IGunCallback<ILikesMetasCallback[]>) =>
					commentGetters.getPostLikes(context, {commentId}, callback),
			),
			createComment: promisify<null>(({text, postId}: {text: string; postId: string}, callback: IGunCallback<null>) =>
				commentSetters.createComment(context, {text, postId}, callback),
			),
			likeComment: promisify<null>(({commentId}: {commentId: string}, callback: IGunCallback<null>) =>
				commentSetters.likeComment(context, {commentId}, callback),
			),
		},
		posts: {
			getPostPathsByUser: promisify<string[]>(({username}: {username: string}, callback: IGunCallback<string[]>) =>
				postGetters.getPostPathsByUser(context, {username}, callback),
			),
			getPostByPath: promisify<IPostData>(({postPath}: {postPath: string}, callback: IGunCallback<IPostData>) =>
				postGetters.getPostByPath(context, {postPath}, callback),
			),
			getPublicPostsByDate: promisify<IPostData>(({date}: {date: Date}, callback: IGunCallback<IPostData>) =>
				postGetters.getPublicPostsByDate(context, {date}, callback),
			),
			getPostLikes: promisify<ILikesMetasCallback>(
				({postId}: {postId: string}, callback: IGunCallback<ILikesMetasCallback>) =>
					postGetters.getPostLikes(context, {postId}, callback),
			),
			createPost: promisify<null>((createPostInput: IPostData, callback: IGunCallback<null>) =>
				postSetters.createPost(context, createPostInput, callback),
			),
			likePost: promisify<null>(({postId}: {postId: string}, callback: IGunCallback<null>) =>
				postSetters.likePost(context, {postId}, callback),
			),
		},
		profiles: {
			getPublicKeyByUsername: promisify<string>(({username}: IGetPublicKeyInput, callback: IGunCallback<string>) =>
				profileGetters.getPublicKeyByUsername(context, {username}, callback),
			),
			getCurrentProfile: promisify<IProfile>((callback: IGunCallback<IProfile>) =>
				profileGetters.getCurrentProfile(context, callback),
			),
			getProfileByUsername: promisify<IProfile>(({username}: {username: string}, callback: IGunCallback<IProfile>) =>
				profileGetters.getProfileByUsername(context, {username}, callback),
			),
			createProfile: promisify<null>((createProfileInput: ICreateProfileInput, callback: IGunCallback<null>) =>
				profileSetters.createProfile(context, createProfileInput, callback),
			),
		},
	};
};
