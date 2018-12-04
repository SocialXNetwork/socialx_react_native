import * as React from 'react';

import { IVisitedUser } from '../../types';
import { extractMediaFromPosts, mapPostsForUI } from '../helpers';

import { IPost } from '../../store/data/posts';
import { WithAggregations } from '../connectors/aggregations/WithAggregations';
import { WithConfig } from '../connectors/app/WithConfig';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithActivities } from '../connectors/ui/WithActivities';
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
			<WithConfig>
				{({ appConfig }) => (
					<WithAggregations>
						{({ userPosts }) => (
							<WithProfiles>
								{({ profiles }) => (
									<WithCurrentUser>
										{({ currentUser }) => (
											<WithVisitedUser>
												{({ visitedUser }) => (
													<WithActivities>
														{({ activities }) => {
															if (visitedUser) {
																let posts: IPost[] = [];

																if (userPosts[visitedUser.userId]) {
																	posts = userPosts[visitedUser.userId];
																}

																const recentPosts = mapPostsForUI(
																	posts,
																	currentUser,
																	profiles,
																	activities,
																);

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

																// visitedUser.media = extractMediaFromPosts(
																// 	posts,
																// 	currentUser.userId,
																// 	appConfig,
																// );

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
					</WithAggregations>
				)}
			</WithConfig>
		);
	}
}