import * as React from 'react';

import { ICurrentUser } from '../../types';
import { extractMediaFromPosts, mapPostsForUI } from '../helpers';

import { WithPosts } from '../connectors/data/WithPosts';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithCurrentUser } from './WithCurrentUser';

interface IWithCurrentUserContentProps {
	children({ currentUser }: { currentUser: ICurrentUser | undefined }): JSX.Element;
}

interface IWithCurrentUserContentState {}

export class WithCurrentUserContent extends React.Component<
	IWithCurrentUserContentProps,
	IWithCurrentUserContentState
> {
	render() {
		return (
			<WithPosts>
				{({ all }) => (
					<WithProfiles>
						{({ profiles }) => (
							<WithCurrentUser>
								{({ currentUser }) => {
									if (currentUser) {
										const postIds = profiles[currentUser.userId].posts;
										const posts = [];

										for (const id of postIds) {
											posts.push(all[id]);
										}

										const shapedPosts = mapPostsForUI(posts, currentUser, profiles);

										currentUser.numberOfLikes = posts.reduce(
											(acc, post) => acc + post.likes.ids.length,
											0,
										);

										currentUser.numberOfPhotos = posts.reduce(
											(acc, post) => (post.media ? acc + post.media.length : 0),
											0,
										);

										currentUser.numberOfComments = posts.reduce(
											(acc, post) => acc + post.comments.length,
											0,
										);

										currentUser.media = extractMediaFromPosts(posts);

										currentUser.posts = shapedPosts;
									}

									return this.props.children({
										currentUser,
									});
								}}
							</WithCurrentUser>
						)}
					</WithProfiles>
				)}
			</WithPosts>
		);
	}
}
