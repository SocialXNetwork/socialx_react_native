import * as React from 'react';

import { IVisitedUser } from '../../../types';
import { extractMediaFromPosts, mapPostsForUI } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithVisitedUser } from './WithVisitedUser';

interface IWithVisitedUserContentProps {
	children({
		visitedUser,
	}: {
		visitedUser: IVisitedUser | undefined;
	}): JSX.Element;
}

interface IWithVisitedUserContentState {}

export class WithVisitedUserContent extends React.Component<
	IWithVisitedUserContentProps,
	IWithVisitedUserContentState
> {
	render() {
		return (
			<WithConfig>
				{({ appConfig }) => (
					<WithPosts>
						{({ posts }) => (
							<WithVisitedUser>
								{({ visitedUser }) => (
									<WithActivities>
										{({ activities }) => {
											const user = visitedUser;

											if (user) {
												const userPosts = posts.filter(
													(post) => post.owner.alias === user.userId,
												);

												const recentPosts = mapPostsForUI(
													userPosts,
													5,
													user,
													activities,
													ActionTypes.GET_POSTS_BY_USER,
													appConfig,
												);

												user.numberOfLikes = posts.reduce(
													(acc, post) => acc + post.likes.length,
													0,
												);

												user.numberOfPhotos = posts.reduce(
													(acc, post) =>
														post.media ? acc + post.media.length : 0,
													0,
												);

												user.numberOfComments = posts.reduce(
													(acc, post) => acc + post.comments.length,
													0,
												);

												user.mediaObjects = extractMediaFromPosts(
													posts,
													appConfig,
												);

												user.recentPosts = recentPosts;
											}

											return this.props.children({
												visitedUser: user,
											});
										}}
									</WithActivities>
								)}
							</WithVisitedUser>
						)}
					</WithPosts>
				)}
			</WithConfig>
		);
	}
}
