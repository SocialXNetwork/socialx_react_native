import * as Gun from 'gun/gun';
import 'gun/lib/path';

import { TABLE_ENUMS, TABLES } from '../types';

// Accounts
Gun.chain.currentAccountRecover = function() {
	return this.user().path(TABLE_ENUMS.RECOVER);
};

Gun.chain.accountByPub = function(pub: string) {
	return this.user(pub);
};

// Comments
Gun.chain.commentsByPostPath = function(postPath: string) {
	return this.path(`${TABLES.POSTS}.${postPath},${TABLE_ENUMS.COMMENTS}`);
};

Gun.chain.commentMetaById = function(commentId: string) {
	return this.path(`${TABLES.COMMENT_META_BY_ID}.${commentId}`);
};

Gun.chain.likesByCommentPath = function(commentPath: string) {
	return this.path(`${commentPath}.${TABLE_ENUMS.LIKES}`);
};

// Notifications
Gun.chain.notificationsByUsername = function(username: string) {
	return this.get(TABLES.NOTIFICATIONS).get(username);
};

Gun.chain.notifications = function() {
	return this.get(TABLES.NOTIFICATIONS).get(this.user().is.alias);
};

Gun.chain.notificationById = function(notificationId: string) {
	return this.get(TABLES.NOTIFICATIONS).get(notificationId);
};

// Profiles
Gun.chain.getUserProfile = function(username: string) {
	return this.get(TABLES.PROFILES).get(username);
};

Gun.chain.allProfiles = function() {
	this.get(TABLES.PROFILES);
};

Gun.chain.currentUserProfile = function() {
	return this.get(TABLES.PROFILES).get(this.user().is.alias);
};

Gun.chain.profileByUsername = function(username: string) {
	return this.get(TABLES.PROFILES).get(username);
};

Gun.chain.currentProfileFriends = function() {
	return this.get(TABLES.PROFILES)
		.get(this.user().is.alias)
		.get(TABLE_ENUMS.FRIENDS);
};

Gun.chain.profileFriendsByUsername = function(username: string) {
	return this.get(TABLES.PROFILES)
		.get(username)
		.get(TABLE_ENUMS.FRIENDS);
};

Gun.chain.currentProfileFriendship = function(friendshipId: string) {
	return this.get(TABLES.PROFILES)
		.get(this.user().is.alias)
		.get(TABLE_ENUMS.FRIENDS)
		.get(friendshipId);
};

Gun.chain.userProfileFriendship = function(
	username: string,
	friendshipId: string,
) {
	return this.get(TABLES.PROFILES)
		.get(username)
		.get(TABLE_ENUMS.FRIENDS)
		.get(friendshipId);
};

// Posts
Gun.chain.postMetaById = function(postId: string) {
	return this.get(TABLES.POST_META_BY_ID).get(postId);
};

Gun.chain.postMetasByUsername = function(username: string) {
	return this.get(TABLES.POST_METAS_BY_USER).get(username);
};

Gun.chain.postMetasByCurrentUser = function() {
	return this.get(TABLES.POST_METAS_BY_USER).get(this.user().is.alias);
};

Gun.chain.postMetasByPostIdOfCurrentAccount = function(postId: string) {
	return this.get(TABLES.POST_METAS_BY_USER)
		.get(this.user().is.alias)
		.get(postId);
};

Gun.chain.postByPath = function(postPath: string) {
	return this.get(TABLES.POSTS).path(postPath);
};

Gun.chain.postsByDate = function(datePath: string) {
	return this.path(`${TABLES.POSTS}.${datePath}.${TABLE_ENUMS.PUBLIC}`);
};

Gun.chain.likesByPostPath = function(postPath: string) {
	return this.get(TABLES.POSTS).path(`${postPath}.${TABLE_ENUMS.LIKES}`);
};

Gun.chain.postLikesByCurrentUser = function(postPath: string) {
	return this.path(
		`${TABLES.POSTS}.${postPath}.${TABLE_ENUMS.LIKES}.${this.user().is.alias}`,
	);
};
