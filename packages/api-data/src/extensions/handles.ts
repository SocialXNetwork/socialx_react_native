// tslint:disable
import * as Gun from 'gun/gun';
import { TABLES, TABLE_ENUMS } from '../types';

Gun.chain.getUserProfile = function(
  username: string,
) {
  return this.get(TABLES.PROFILES).get(username);
};

Gun.chain.allProfiles = function () {
	this.get(TABLES.PROFILES);
}

Gun.chain.currentUserProfile = function () {
	return this.get(TABLES.PROFILES).get(this.user().is.alias);
};

Gun.chain.profileByUsername = function(username: string) {
	return this.get(TABLES.PROFILES).get(username);
};

Gun.chain.currentProfileFriends = function () {
	return this
		.get(TABLES.PROFILES)
		.get(this.user().is.alias)
		.get(TABLE_ENUMS.FRIENDS);
};

Gun.chain.profileFriendsByUsername = function (
	username: string,
) {
	return this
		.get(TABLES.PROFILES)
		.get(username)
		.get(TABLE_ENUMS.FRIENDS);
};

Gun.chain.currentProfileFriendship = function (
	friendshipId: string,
) {
	return this
		.get(TABLES.PROFILES)
		.get(this.user().is.alias)
		.get(TABLE_ENUMS.FRIENDS)
		.get(friendshipId);
};

Gun.chain.userProfileFriendship = function(
	username: string,
	friendshipId: string,
) {
	return this
		.get(TABLES.PROFILES)
		.get(username)
		.get(TABLE_ENUMS.FRIENDS)
		.get(friendshipId);
};
