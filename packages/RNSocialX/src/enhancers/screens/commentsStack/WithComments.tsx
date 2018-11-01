import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IWallPostComment, IWallPostData } from '../../../types';

import { WithConfig } from '../../connectors/app/WithConfig';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { getComments } from '../../helpers';
import { WithCurrentUser } from '../intermediary';

export interface IWithCommentsEnhancedData {
	post: IWallPostData;
	comments: IWallPostComment[];
	keyboardRaised: boolean;
}

export interface IWithCommentsEnhancedActions {}

interface IWithCommentsEnhancedProps {
	data: IWithCommentsEnhancedData;
	actions: IWithCommentsEnhancedActions;
}

interface IWithCommentsProps {
	children(props: IWithCommentsEnhancedProps): JSX.Element;
}

interface IWithCommentsState {}

export class WithComments extends React.Component<IWithCommentsProps, IWithCommentsState> {
	render() {
		return (
			<WithConfig>
				{({ appConfig }) => (
					<WithNavigationParams>
						{({ navigationParams }) => (
							<WithPosts>
								{(postProps) => (
									<WithProfiles>
										{({ profiles }) => (
											<WithCurrentUser>
												{({ currentUser }) => {
													const currentPost = navigationParams[SCREENS.Comments].post;
													const post = postProps.posts.find((p) => p.postId === currentPost.postId);

													return this.props.children({
														data: {
															post: currentPost,
															comments: getComments(
																post!.comments,
																profiles,
																currentUser.userId,
																appConfig,
															),
															keyboardRaised: navigationParams[SCREENS.Comments].keyboardRaised,
														},
														actions: {},
													});
												}}
											</WithCurrentUser>
										)}
									</WithProfiles>
								)}
							</WithPosts>
						)}
					</WithNavigationParams>
				)}
			</WithConfig>
		);
	}
}
