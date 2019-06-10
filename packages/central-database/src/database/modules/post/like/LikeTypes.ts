import { Schema } from 'mongoose';

export const LikeTypes = new Schema({
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },

	owner: { type: Schema.Types.ObjectId, ref: 'owner', childPath: 'likes', autopopulate: true },

	type: String,
	target: String,
});
