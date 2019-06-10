import { Schema } from 'mongoose';

export const PostTypes = new Schema({
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },

	owner: { type: Schema.Types.ObjectId, ref: 'owner', childPath: 'posts', autopopulate: true },

	images: [String],
	text: String,
	location: {
		long: String,
		lat: String,
		meta: String,
	},

	tags: { type: [Schema.Types.ObjectId], autopopulate: true },

	likes: { type: [Schema.Types.ObjectId], autopopulate: true },
	comments: { type: [Schema.Types.ObjectId], autopopulate: true },
});
