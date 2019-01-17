import * as React from 'react';
import { Keyboard } from 'react-native';
import uuid from 'uuid/v4';

import { SCREENS } from '../../environment/consts';
import { IMedia, INavigationProps } from '../../types';

import { IMediaInput } from '../../store/ui/overlays';
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
		showMedia: (input: IMediaInput) => void;
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
		Keyboard.dismiss();
		this.props.navigation.goBack();
	};

	private onViewUserProfileHandler = (currentUser: string, visitedUser: string) => {
		if (visitedUser === currentUser) {
			this.props.navigation.navigate(SCREENS.MyProfile);
		} else {
			const key = uuid();

			this.actions.setNavigationParams({
				screenName: SCREENS.UserProfile,
				params: { user: visitedUser },
				key,
			});
			this.props.navigation.navigate({ routeName: SCREENS.UserProfile, key });
		}
	};

	private onViewLikesHandler = (likeIds: string[]) => {
		const key = uuid();

		this.actions.setNavigationParams({
			screenName: SCREENS.Likes,
			params: { likeIds },
			key,
		});
		this.props.navigation.navigate({ routeName: SCREENS.Likes, key });
	};

	private onViewCommentsHandler = (postId: string, keyboardRaised: boolean) => {
		if (postId) {
			const key = uuid();
			this.actions.setNavigationParams({
				screenName: SCREENS.Comments,
				params: { postId, keyboardRaised },
				key,
			});
			this.props.navigation.navigate({ routeName: SCREENS.Comments, key });
		}
	};

	private onViewImageHandler = (items: IMedia[], startIndex?: number, postId?: string) => {
		this.actions.showMedia({ items, startIndex, postId });
		// this.actions.setNavigationParams({
		// 	screenName: SCREENS.MediaViewer,
		// 	params: {
		// 		media,
		// 		startIndex,
		// 		postId,
		// 	},
		// });
		// this.props.navigation.navigate(SCREENS.MediaViewer);
	};

	private onViewFriendsHandler = (alias: string) => {
		const key = uuid();

		this.actions.setNavigationParams({
			screenName: SCREENS.FriendsList,
			params: {
				alias,
			},
			key,
		});
		this.props.navigation.navigate({ routeName: SCREENS.FriendsList, key });
	};
}
