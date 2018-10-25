import * as React from 'react';

import { IVisitedUser } from '../../../types';
import { extractMediaFromPosts, mapPostsForUI } from '../../helpers';

import { IPostReturnData } from '../../../store/data/posts';
import { ActionTypes } from '../../../store/data/posts/Types';
import { WithAggregations } from '../../connectors/aggregations/WithAggregations';
import { WithConfig } from '../../connectors/app/WithConfig';
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
																let posts: IPostReturnData[] = [];
																if (userPosts[visitedUser.userId]) {
																	posts = userPosts[visitedUser.userId];
																}

																const recentPosts = mapPostsForUI(
																	posts,
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
