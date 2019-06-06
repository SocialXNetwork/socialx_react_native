import autopopulate from 'mongoose-autopopulate';
import relation from 'mongoose-relationship';

import { IDbInstance } from '../../types/data-types';

import { CommentTypes, LikeTypes, PostTypes } from './post';
import { UserTypes } from './user';

// Plugins
PostTypes.plugin(relation, { relationshipPathName: 'owner' });
LikeTypes.plugin(relation, { relationshipPathName: 'owner' });
CommentTypes.plugin(relation, { relationshipPathName: 'owner' });

PostTypes.plugin(autopopulate);
LikeTypes.plugin(autopopulate);
CommentTypes.plugin(autopopulate);

// export models
export default (mongoose): IDbInstance => {
	const User = mongoose.model('User', UserTypes);

	const Post = mongoose.model('Post', PostTypes);
	const Like = mongoose.model('Like', LikeTypes);
	const Comment = mongoose.model('Comment', CommentTypes);

	// const File = mongoose.model('File', FileTypes);

	return { User, Post, Like, Comment };
};
