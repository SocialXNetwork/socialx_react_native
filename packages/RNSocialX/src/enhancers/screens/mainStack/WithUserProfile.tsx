/**
 * TODO list:
 * 1. Props actions: loadMorePhotos, blockUser, reportProblem
 */

import * as React from 'react';
import { posts } from '../../../mocks';
import {
	IDotsMenuProps,
	INavigationParamsActions,
	ITranslatedProps,
	IVisitedUser,
	MediaTypeImage,
	SearchResultKind,
} from '../../../types';
import { getActivity } from '../../helpers';

import { ActionTypes } from '../../../store/data/profiles/Types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithProfiles } from '../../connectors/data/WithProfiles';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { WithCurrentUser, WithVisitedUserContent } from '../intermediary';

const mock: IUserProfileEnhancedProps = {
	data: {
		currentUserAvatarURL:
			'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350',
		visitedUser: {
			userId: '999',
			avatarURL:
				'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&h=350',
			fullName: 'Alex Sirbu',
			userName: 'alexsirbu',
			aboutMeText: 'Lorem ipsum dolor sit amet',
			numberOfLikes: 25,
			numberOfPhotos: 1,
			numberOfFriends: 2,
			numberOfComments: 87,
			mediaObjects: [
				{
					url:
						'https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44f4aebbd1e1371d5bf7dc22016c5d29&w=1000&q=80',
					hash: '131289fsdf03yr9hehdiwb32',
					type: MediaTypeImage,
					extension: 'jpg',
					size: 512,
					numberOfLikes: 0,
					numberOfComments: 0,
				},
			],
			recentPosts: posts,
			relationship: SearchResultKind.NotFriend,
		},
		refreshingProfile: false,
	},
	actions: {
		addFriend: (userId: string) => {
			/**/
		},
		loadMorePosts: (userId: string) => {
			/**/
		},
		loadMorePhotos: (userId: string) => {
			/**/
		},
		likePost: (postId: string) => {
			/**/
		},
		unlikePost: (postId: string) => {
			/**/
		},
		postComment: (commentText: string, postId: string) => {
			/**/
		},
		blockUser: (userId: string) => {
			/**/
		},
		reportProblem: (reason: string, description: string) => {
			/**/
		},
		getText: (value: string, ...args: any[]) => value,
		setNavigationParams: () => {
			/**/
		},
		showDotsMenuModal: (items) => {
			/**/
		},
	},
};

export interface IWithUserProfileEnhancedData {
	currentUserAvatarURL: string;
	visitedUser: IVisitedUser;
	refreshingProfile: boolean;
}

export interface IWithUserProfileEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions,
		IDotsMenuProps {
	addFriend: (userId: string) => void;
	likePost: (postId: string) => void;
	unlikePost: (postId: string) => void;
	loadMorePosts: (userId: string) => void;
	loadMorePhotos: (userId: string) => void;
	postComment: (postId: string, commentText: string) => void;
	blockUser: (userId: string) => void;
	reportProblem: (reason: string, description: string) => void;
}

interface IUserProfileEnhancedProps {
	data: IWithUserProfileEnhancedData;
	actions: IWithUserProfileEnhancedActions;
}

interface IWithUserProfileProps {
	children(props: IUserProfileEnhancedProps): JSX.Element;
}

interface IWithUserProfileState {}

export class WithUserProfile extends React.Component<
	IWithUserProfileProps,
	IWithUserProfileState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithNavigationParams>
								{({ setNavigationParams }) => (
									<WithProfiles>
										{({ addFriend }) => (
											<WithPosts>
												{({
													likePost,
													unlikePost,
													createComment,
													loadMorePosts,
												}) => (
													<WithActivities>
														{({ activities }) => (
															<WithCurrentUser>
																{({ currentUser }) => (
																	<WithVisitedUserContent>
																		{({ visitedUser }) => {
																			return this.props.children({
																				data: {
																					currentUserAvatarURL: currentUser!
																						.avatarURL,
																					visitedUser: visitedUser!,
																					refreshingProfile: getActivity(
																						activities,
																						ActionTypes.SYNC_GET_CURRENT_PROFILE,
																					),
																				},
																				actions: {
																					...mock.actions,
																					addFriend: (username) =>
																						addFriend({
																							username,
																						}),
																					likePost: (postId) =>
																						likePost({ postId }),
																					unlikePost: (postId) =>
																						unlikePost({ postId }),
																					postComment: (text, postId) =>
																						createComment({
																							text,
																							postId,
																						}),
																					loadMorePosts,
																					setNavigationParams,
																					getText: i18nProps.getText,
																					showDotsMenuModal: (items) =>
																						showOptionsMenu({
																							items,
																						}),
																				},
																			});
																		}}
																	</WithVisitedUserContent>
																)}
															</WithCurrentUser>
														)}
													</WithActivities>
												)}
											</WithPosts>
										)}
									</WithProfiles>
								)}
							</WithNavigationParams>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
