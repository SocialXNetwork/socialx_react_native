import * as React from 'react';

import { IVisitedUser } from '../../../types';
import { extractMediaFromPosts, mapPostsForUI } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithCurrentUser } from './WithCurrentUser';
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
							<WithProfiles>
								{({ profiles }) => (
									<WithCurrentUser>
										{({ currentUser }) => (
											<WithVisitedUser>
												{({ visitedUser }) => (
													<WithActivities>
														{({ activities }) => {
															if (visitedUser) {
																const userPosts = posts.filter(
																	(post) =>
																		post.owner.alias === visitedUser.userId,
																);

																const recentPosts = mapPostsForUI(
																	userPosts,
																	5,
																	currentUser,
																	profiles,
																	activities,
																	ActionTypes.GET_POSTS_BY_USER,
																	appConfig,
																);

																visitedUser.numberOfLikes = posts.reduce(
																	(acc, post) => acc + post.likes.length,
																	0,
																);

																visitedUser.numberOfPhotos = posts.reduce(
																	(acc, post) =>
																		post.media ? acc + post.media.length : 0,
																	0,
																);

																visitedUser.numberOfComments = posts.reduce(
																	(acc, post) => acc + post.comments.length,
																	0,
																);

																visitedUser.mediaObjects = extractMediaFromPosts(
																	posts,
																	appConfig,
																);

																visitedUser.mediaObjects = [];

																visitedUser.recentPosts = recentPosts;
															}

															return this.props.children({
																visitedUser,
															});
														}}
													</WithActivities>
												)}
											</WithVisitedUser>
										)}
									</WithCurrentUser>
								)}
							</WithProfiles>
						)}
					</WithPosts>
				)}
			</WithConfig>
		);
	}
}
