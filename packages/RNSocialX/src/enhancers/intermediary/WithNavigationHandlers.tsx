import * as React from 'react';
import { Keyboard, StatusBar } from 'react-native';

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
		setNavigationParams: (input: any) => void;
	} = {
		getUserPosts: () => undefined,
		setNavigationParams: () => undefined,
	};

	render() {
		return (
			<WithNavigationParams>
				{({ setNavigationParams }) => (
					<WithPosts>
						{({ getUserPosts }) => (
							<WithProfiles>
								{({ profiles }) => (
									<WithCurrentUser>
										{({ currentUser }) => {
											this.actions = {
												getUserPosts,
												setNavigationParams,
											};

											return this.props.children({
												actions: {
													onViewUserProfile: (visitedUser) =>
														this.onViewUserProfileHandler(
															currentUser.userId,
															profiles,
															visitedUser,
														),
													onViewLikes: this.onViewLikesHandler,
													onViewComments: this.onViewCommentsHandler,
													onViewImage: this.onViewImageHandler,
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
		if (this.props.navigation.state.routeName === SCREENS.Comments) {
			StatusBar.setBarStyle('light-content', true);
		} else if (this.props.navigation.state.routeName === SCREENS.UserProfile) {
			StatusBar.setBarStyle('dark-content', true);
		}

		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};

	private onViewUserProfileHandler = (
		currentUser: string,
		profiles: { [alias: string]: IProfile },
		visitedUser: string,
	) => {
		if (this.props.navigation.state.routeName === SCREENS.Comments) {
			StatusBar.setBarStyle('light-content', true);
		}

		if (visitedUser === currentUser) {
			this.props.navigation.navigate(SCREENS.MyProfile);
		} else {
			if (profiles[visitedUser].posts.length === 0) {
				this.actions.getUserPosts(visitedUser);
			}

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
			StatusBar.setBarStyle('dark-content', true);
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
}
