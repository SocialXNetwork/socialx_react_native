import { Schema } from 'mongoose';

export const UserTypes = new Schema({
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },

	username: String,
	email: String,
	password: String,

	avatar: String,
	bio: String,
	phone: String,

	identity: {
		pub: String,
		epub: String,
	},

	// auth
	token: String,

	// data
	posts: { type: [Schema.Types.ObjectId], ref: 'posts' },
	comments: { type: [Schema.Types.ObjectId], ref: 'comments' },
	likes: { type: [Schema.Types.ObjectId], ref: 'likes' },

	friends: { type: [Schema.Types.ObjectId], ref: 'friends' },
});
