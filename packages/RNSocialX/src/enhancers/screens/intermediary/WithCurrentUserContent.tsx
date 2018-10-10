import * as React from 'react';

import { ICurrentUser } from '../../../types';
import { extractMediaFromPosts, mapPostsForUI } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithCurrentUser } from './WithCurrentUser';

interface IWithCurrentUserContentProps {
	children({
		currentUser,
	}: {
		currentUser: ICurrentUser | undefined;
	}): JSX.Element;
}

interface IWithCurrentUserContentState {}

export class WithCurrentUserContent extends React.Component<
	IWithCurrentUserContentProps,
	IWithCurrentUserContentState
> {
	render() {
		return (
			<WithConfig>
				{({ appConfig }) => (
					<WithPosts>
						{(postsProps) => (
							<WithCurrentUser>
								{(currentUserProps) => (
									<WithActivities>
										{({ activities }) => {
											const user = currentUserProps.currentUser;

											if (user) {
												const userPosts = postsProps.posts.filter(
													(post) => post.owner.alias === user!.userId,
												);

												const recentPosts = mapPostsForUI(
													userPosts,
													5,
													user,
													activities,
													ActionTypes.GET_POSTS_BY_USER,
													appConfig,
												);

												user.numberOfLikes = postsProps.posts.reduce(
													(acc, post) => acc + post.likes.length,
													0,
												);

												user.numberOfPhotos = postsProps.posts.reduce(
													(acc, post) =>
														post.media ? acc + post.media.length : 0,
													0,
												);

												user.numberOfComments = postsProps.posts.reduce(
													(acc, post) => acc + post.comments.length,
													0,
												);

												user.mediaObjects = extractMediaFromPosts(
													postsProps.posts,
													appConfig,
												);

												user.recentPosts = recentPosts;
											}

											return this.props.children({
												currentUser: user,
											});
										}}
									</WithActivities>
								)}
							</WithCurrentUser>
						)}
					</WithPosts>
				)}
			</WithConfig>
		);
	}
}
