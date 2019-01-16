import * as React from 'react';
import { Keyboard } from 'react-native';

import { SCREENS } from '../../environment/consts';
import { IMedia, INavigationProps } from '../../types';

import { IProfile } from '../../store/data/profiles';
import { WithNavigationParams } from '../connectors/app/WithNavigationParams';
import { WithPosts } from '../connectors/data/WithPosts';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithCurrentUser } from '../intermediary';

export interface IWithNavigationHandlersEnhancedActions {
	onViewUserProfile: (alias: string) => void;
	onViewLikes: (likeIds: string[]) => void;
	onViewComments: (postId: string, keyboardRaised: boolean) => void;
	onViewImage: (media: IMedia[], startIndex: number, postId?: string) => void;
	onViewFriends: (alias: string) => void;
	onGoBack: () => void;
}

interface IWithNavigationHandlersEnhancedProps {
	actions: IWithNavigationHandlersEnhancedActions;
}

interface IWithNavigationHandlersProps extends INavigationProps {
	children(props: IWithNavigationHandlersEnhancedProps): JSX.Element;
}

export class WithNavigationHandlers extends React.Component<IWithNavigationHandlersProps> {
	private actions: {
		getUserPosts: (alias: string) => void;
		getUserFriends: (alias: string) => void;
		setNavigationParams: (input: any) => void;
	} = {
		getUserPosts: () => undefined,
		getUserFriends: () => undefined,
		setNavigationParams: () => undefined,
	};

	render() {
		return (
			<WithNavigationParams>
				{({ setNavigationParams }) => (
					<WithPosts>
						{({ getUserPosts }) => (
							<WithProfiles>
								{({ getProfileFriendsByAlias }) => (
									<WithCurrentUser>
										{({ currentUser }) => {
											this.actions = {
												getUserPosts,
												getUserFriends: getProfileFriendsByAlias,
												setNavigationParams,
											};

											return this.props.children({
												actions: {
													onViewUserProfile: (visitedUser) =>
														this.onViewUserProfileHandler(currentUser.alias, visitedUser),
													onViewLikes: this.onViewLikesHandler,
													onViewComments: this.onViewCommentsHandler,
													onViewImage: this.onViewImageHandler,
													onViewFriends: this.onViewFriendsHandler,
													onGoBack: this.onGoBackHandler,
												},
											});
										}}
									</WithCurrentUser>
								)}
							</WithProfiles>
						)}
					</WithPosts>
				)}
			</WithNavigationParams>
		);
	}

	private onGoBackHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};

	private onViewUserProfileHandler = (currentUser: string, visitedUser: string) => {
		if (visitedUser === currentUser) {
			this.props.navigation.navigate(SCREENS.MyProfile);
		} else {
			this.actions.setNavigationParams({
				screenName: SCREENS.UserProfile,
				params: { user: visitedUser },
			});
			this.props.navigation.navigate(SCREENS.UserProfile);
		}
	};

	private onViewLikesHandler = (likeIds: string[]) => {
		this.actions.setNavigationParams({
			screenName: SCREENS.Likes,
			params: { likeIds },
		});
		this.props.navigation.navigate(SCREENS.Likes);
	};

	private onViewCommentsHandler = (postId: string, keyboardRaised: boolean) => {
		if (postId) {
			this.actions.setNavigationParams({
				screenName: SCREENS.Comments,
				params: { postId, keyboardRaised },
			});
			this.props.navigation.navigate(SCREENS.Comments);
		}
	};

	private onViewImageHandler = (media: IMedia[], startIndex: number, postId?: string) => {
		this.actions.setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				media,
				startIndex,
				postId,
			},
		});
		this.props.navigation.navigate(SCREENS.MediaViewer);
	};

	private onViewFriendsHandler = (alias: string) => {
		this.actions.setNavigationParams({
			screenName: SCREENS.FriendsList,
			params: {
				alias,
			},
		});
		this.props.navigation.navigate(SCREENS.FriendsList);
	};
}
