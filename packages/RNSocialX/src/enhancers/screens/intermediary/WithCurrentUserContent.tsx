import * as React from 'react';

import { ICurrentUser } from '../../../types';
import { extractMediaFromPosts, mapPostsForUI } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithAggregations } from '../../connectors/aggregations/WithAggregations';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithProfiles } from '../../connectors/data/WithProfiles';
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
					<WithAggregations>
						{({ userPosts }) => (
							<WithProfiles>
								{({ profiles }) => (
									<WithCurrentUser>
										{({ currentUser }) => (
											<WithActivities>
												{({ activities }) => {
													if (currentUser) {
														const posts = userPosts[currentUser.userId];

														const recentPosts = mapPostsForUI(
															posts,
															5,
															currentUser,
															profiles,
															activities,
															ActionTypes.GET_POSTS_BY_USER,
															appConfig,
														);

														currentUser.numberOfLikes = posts.reduce(
															(acc, post) => acc + post.likes.length,
															0,
														);

														currentUser.numberOfPhotos = posts.reduce(
															(acc, post) =>
																post.media ? acc + post.media.length : 0,
															0,
														);

														currentUser.numberOfComments = posts.reduce(
															(acc, post) => acc + post.comments.length,
															0,
														);

														currentUser.mediaObjects = extractMediaFromPosts(
															posts,
															appConfig,
														);

														currentUser.recentPosts = recentPosts;
													}

													return this.props.children({
														currentUser,
													});
												}}
											</WithActivities>
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
