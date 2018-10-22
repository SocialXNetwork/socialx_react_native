import * as React from 'react';

import { ICurrentUser } from '../../../types';
import { extractMediaFromPosts, mapPostsForUI } from '../../helpers';

import { ActionTypes } from '../../../store/data/posts/Types';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithPosts } from '../../connectors/data/WithPosts';
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
					<WithPosts>
						{({ posts }) => (
							<WithProfiles>
								{({ profiles }) => (
									<WithCurrentUser>
										{({ currentUser }) => (
											<WithActivities>
												{({ activities }) => {
													if (currentUser && posts.length > 0) {
														const userPosts = posts.filter(
															(post) =>
																post.owner.alias === currentUser!.userId,
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

														currentUser.numberOfLikes = userPosts.reduce(
															(acc, post) => acc + post.likes.length,
															0,
														);

														currentUser.numberOfPhotos = userPosts.reduce(
															(acc, post) =>
																post.media ? acc + post.media.length : 0,
															0,
														);

														currentUser.numberOfComments = userPosts.reduce(
															(acc, post) => acc + post.comments.length,
															0,
														);

														currentUser.mediaObjects = extractMediaFromPosts(
															userPosts,
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
					</WithPosts>
				)}
			</WithConfig>
		);
	}
}
