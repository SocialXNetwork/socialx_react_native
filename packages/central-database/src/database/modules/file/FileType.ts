import { Schema } from 'mongoose';

export const FileTypes = new Schema({
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },

	filename: String,
	mimetype: String,
	encoding: String,
	url: String,
});
