import * as React from 'react';
import { Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import uuid from 'uuid/v4';

import { navigator } from '../../app/Navigation';
import { SCREENS } from '../../environment/consts';
import { IMedia } from '../../types';

import { IMediaOverlay } from '../../store/ui/overlays';
import { WithNavigationParams } from '../connectors/app/WithNavigationParams';
import { WithPosts } from '../connectors/data/WithPosts';
import { WithProfiles } from '../connectors/data/WithProfiles';
import { WithOverlays } from '../connectors/ui/WithOverlays';
import { WithCurrentUser } from '../intermediary';

export interface IWithNavigationHandlersEnhancedActions {
	onViewUserProfile: (alias: string) => void;
	onViewLikes: (likeIds: string[]) => void;
	onViewComments: (postId: string, keyboardRaised: boolean) => void;
	onViewImage: (items: IMedia[], startIndex?: number, postId?: string) => void;
	onViewFriends: (alias: string) => void;
	onOpenConversation: (alias: string) => void;
	onGoBack: () => void;
}

interface IWithNavigationHandlersEnhancedProps {
	actions: IWithNavigationHandlersEnhancedActions;
}

interface IWithNavigationHandlersProps {
	children(props: IWithNavigationHandlersEnhancedProps): JSX.Element;
}

export class WithNavigationHandlers extends React.Component<IWithNavigationHandlersProps> {
	private actions: {
		getUserPosts: (alias: string) => void;
		getUserFriends: (alias: string) => void;
		showMedia: (input: IMediaOverlay) => void;
		setNavigationParams: (input: any) => void;
	} = {
		getUserPosts: () => undefined,
		getUserFriends: () => undefined,
		showMedia: () => undefined,
		setNavigationParams: () => undefined,
	};

	render() {
		return (
			<WithNavigationParams>
				{({ setNavigationParams }) => (
					<WithOverlays>
						{({ showMedia }) => (
							<WithPosts>
								{({ getUserPosts }) => (
									<WithProfiles>
										{({ getProfileFriendsByAlias }) => (
											<WithCurrentUser>
												{({ currentUser }) => {
													this.actions = {
														getUserPosts,
														getUserFriends: getProfileFriendsByAlias,
														showMedia,
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
															onOpenConversation: this.onOpenConversationHandler,
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
					</WithOverlays>
				)}
			</WithNavigationParams>
		);
	}

	private onGoBackHandler = () => {
		if (navigator) {
			Keyboard.dismiss();
			const action = NavigationActions.back({ key: null });
			navigator.dispatch(action);
		}
	};

	private onViewUserProfileHandler = (currentUser: string, visitedUser: string) => {
		if (navigator) {
			Keyboard.dismiss();

			if (visitedUser === currentUser) {
				const action = NavigationActions.navigate({ routeName: SCREENS.MyProfile });
				navigator.dispatch(action);
			} else {
				const key = uuid();

				this.actions.setNavigationParams({
					screenName: SCREENS.UserProfile,
					params: { user: visitedUser },
					key,
				});
				const action = NavigationActions.navigate({ routeName: SCREENS.UserProfile, key });
				navigator.dispatch(action);
			}
		}
	};

	private onViewLikesHandler = (likeIds: string[]) => {
		if (navigator) {
			Keyboard.dismiss();
			const key = uuid();

			this.actions.setNavigationParams({
				screenName: SCREENS.Likes,
				params: { likeIds },
				key,
			});
			const action = NavigationActions.navigate({ routeName: SCREENS.Likes, key });
			navigator.dispatch(action);
		}
	};

	private onViewCommentsHandler = (postId: string, keyboardRaised: boolean) => {
		if (postId && navigator) {
			Keyboard.dismiss();
			const key = uuid();

			this.actions.setNavigationParams({
				screenName: SCREENS.Comments,
				params: { postId, keyboardRaised },
				key,
			});
			const action = NavigationActions.navigate({ routeName: SCREENS.Comments, key });
			navigator.dispatch(action);
		}
	};

	private onViewImageHandler = (items: IMedia[], startIndex?: number, postId?: string) => {
		Keyboard.dismiss();
		this.actions.showMedia({ items, startIndex, postId });
	};

	private onViewFriendsHandler = (alias: string) => {
		if (navigator) {
			Keyboard.dismiss();
			const key = uuid();

			this.actions.setNavigationParams({
				screenName: SCREENS.FriendsList,
				params: {
					alias,
				},
				key,
			});
			const action = NavigationActions.navigate({ routeName: SCREENS.FriendsList, key });
			navigator.dispatch(action);
		}
	};

	private onOpenConversationHandler = (alias: string) => {
		if (navigator) {
			Keyboard.dismiss();

			this.actions.setNavigationParams({
				screenName: SCREENS.Conversation,
				params: {
					alias,
				},
			});
			const action = NavigationActions.navigate({ routeName: SCREENS.Conversation });
			navigator.dispatch(action);
		}
	};
}
