import * as React from 'react';

import { IVisitedUser } from '../../types';
import { extractMediaFromPosts, mapPostsForUI } from '../helpers';

import { WithPosts } from '../connectors/data/WithPosts';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithCurrentUser } from './WithCurrentUser';
import { WithVisitedUser } from './WithVisitedUser';

interface IWithVisitedUserContentProps {
	children({ visitedUser }: { visitedUser: IVisitedUser | undefined }): JSX.Element;
}

interface IWithVisitedUserContentState {}

export class WithVisitedUserContent extends React.Component<
	IWithVisitedUserContentProps,
	IWithVisitedUserContentState
> {
	render() {
		return (
			<WithPosts>
				{({ all }) => (
					<WithProfiles>
						{({ profiles }) => (
							<WithCurrentUser>
								{({ currentUser }) => (
									<WithVisitedUser>
										{({ visitedUser }) => {
											if (visitedUser) {
												const postIds = profiles[visitedUser.userId].posts;
												const posts = [];

												for (const id of postIds) {
													posts.push(all[id]);
												}

												const shapedPosts = mapPostsForUI(posts, currentUser, profiles);

												visitedUser.numberOfLikes = posts.reduce(
													(acc, post) => acc + post.likes.ids.length,
													0,
												);

												visitedUser.numberOfPhotos = posts.reduce(
													(acc, post) => (post.media ? acc + post.media.length : 0),
													0,
												);

												visitedUser.numberOfComments = posts.reduce(
													(acc, post) => acc + post.comments.length,
													0,
												);

												visitedUser.media = extractMediaFromPosts(posts);

												visitedUser.posts = shapedPosts;
											}

											return this.props.children({
												visitedUser,
											});
										}}
									</WithVisitedUser>
								)}
							</WithCurrentUser>
						)}
					</WithProfiles>
				)}
			</WithPosts>
		);
	}
}
