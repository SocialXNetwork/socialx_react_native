import * as React from 'react';

import {
	IMediaProps,
	IVisitedUser,
	MediaTypeImage,
	MediaTypeVideo,
} from '../../../types';

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
				{(configProps) => (
					<WithPosts>
						{(postsProps) => (
							<WithVisitedUser>
								{({ visitedUser }) => (
									<WithActivities>
										{(activitiesProps) => {
											const user = visitedUser;
											const { activities } = activitiesProps;

											const posts = postsProps.posts.filter(
												(post) => post.owner.alias === user!.userId,
											);

											const recentPosts = posts
												.sort((x: any, y: any) => y.timestamp - x.timestamp)
												.slice(0, 5)
												.map((post) => {
													const foundLike = post.likes.find(
														(like) => like.owner.alias === user!.userId,
													);

													return {
														id: post.postId,
														postText: post.postText,
														location: post.location,
														taggedFriends: post.taggedFriends,
														timestamp: new Date(post.timestamp * 1000),
														owner: {
															userId: post.owner.alias,
															fullName: user!.fullName,
															avatarURL: user!.avatarURL,
														},
														governanceVersion: post.governanceVersion,
														// TODO: add this later when data is available
														numberOfSuperLikes: 0,
														numberOfComments: post.comments.length,
														// TODO: add this later when data is available
														numberOfWalletCoins: 0,
														likedByMe: !!foundLike,
														canDelete: true,
														media: post.media!.map((media) => ({
															url:
																configProps.appConfig.ipfsConfig.ipfs_URL +
																media.hash,
															hash: media.hash,
															type:
																media.type.name === 'Photo'
																	? MediaTypeImage
																	: MediaTypeVideo,
															extension: media.extension,
															size: media.size,
															numberOfLikes: post.likes.length,
															numberOfComments: post.comments.length,
														})),
														likes: post.likes.map((like) => {
															return {
																userId: like.owner.alias,
																userName: like.owner.alias,
															};
														}),
														bestComments: post.comments
															.slice(0, 2)
															.map((comment) => {
																return {
																	id: String(comment.timestamp),
																	text: comment.text,

																	likes: Object.keys(comment.likes).map(
																		(key) => {
																			const like = comment.likes[key];
																			return {
																				userId: like.owner.alias,
																				userName: like.owner.alias,
																			};
																		},
																	),
																	owner: {
																		userId: comment.owner.alias,
																		userName: comment.owner.alias,
																	},
																};
															}),
														listLoading:
															activities.filter(
																(activity) =>
																	activity.type ===
																	ActionTypes.GET_POSTS_BY_USER,
															).length > 0,
														suggested: undefined,
														noInput: true,
														contentOffensive: false,
														marginBottom: 0,
													};
												});

											if (user) {
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

												user.mediaObjects = posts.reduce(
													(acc: IMediaProps[], post) =>
														post.media
															? acc.concat(
																	post.media.map((media) => ({
																		url:
																			configProps.appConfig.ipfsConfig
																				.ipfs_URL + media.hash,
																		hash: media.hash,
																		type:
																			media.type.name === 'Photo'
																				? MediaTypeImage
																				: MediaTypeVideo,
																		extension: media.extension,
																		size: media.size,
																		numberOfLikes: post.likes.length,
																		numberOfComments: post.comments.length,
																	})),
															  ) // tslint:disable-line indent (tslint bug!!!)
															: [...acc],
													[],
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
