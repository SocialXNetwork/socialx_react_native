import { Schema } from 'mongoose';

export const CommentTypes = new Schema({
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },

	owner: { type: Schema.Types.ObjectId, ref: 'owner', autopopulate: true },

	text: String,
	type: String,
	target: String,

	children: { type: [Schema.Types.ObjectId], ref: 'replies', autopopulate: true },

	likes: { type: [Schema.Types.ObjectId], ref: 'likes', autopopulate: true },
});
