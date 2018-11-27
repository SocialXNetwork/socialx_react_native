import * as React from 'react';
import { Keyboard } from 'react-native';

import { SCREENS, TABS } from '../../environment/consts';
import { IMediaProps, INavigationProps, IWallPostData } from '../../types';

import { IPostReturnData } from '@socialx/api-data';
import { WithAggregations } from '../connectors/aggregations/WithAggregations';
import { WithNavigationParams } from '../connectors/app/WithNavigationParams';
import { WithCurrentUser } from '../intermediary';

export interface IWithNavigationHandlersEnhancedActions {
	onViewUserProfile: (visitedUserId: string, origin?: TABS) => void;
	onViewComments: (postId: string, keyboardRaised: boolean) => void;
	onViewImage: (media: IMediaProps[], index: number, post?: IWallPostData) => void;
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
		getUserPosts: (input: { username: string }) => void;
		setNavigationParams: (input: any) => void;
	} = {
		getUserPosts: () => undefined,
		setNavigationParams: () => undefined,
	};

	render() {
		return (
			<WithNavigationParams>
				{({ setNavigationParams }) => (
					<WithAggregations>
						{({ userPosts, getUserPosts }) => (
							<WithCurrentUser>
								{({ currentUser }) => {
									this.actions = {
										getUserPosts,
										setNavigationParams,
									};

									return this.props.children({
										actions: {
											onViewUserProfile: (visitedUserId, origin) =>
												this.onViewUserProfileHandler(
													currentUser.userId,
													userPosts,
													visitedUserId,
													origin,
												),
											onViewComments: this.onViewCommentsHandler,
											onViewImage: this.onViewImageHandler,
											onGoBack: this.onGoBackHandler,
										},
									});
								}}
							</WithCurrentUser>
						)}
					</WithAggregations>
				)}
			</WithNavigationParams>
		);
	}

	private onGoBackHandler = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack(null);
	};

	private onViewUserProfileHandler = (
		currentUserId: string,
		userPosts: { [owner: string]: IPostReturnData[] },
		visitedUserId: string,
		origin?: TABS,
	) => {
		if (visitedUserId === currentUserId) {
			this.props.navigation.navigate(SCREENS.MyProfile);
		} else {
			if (!userPosts[visitedUserId]) {
				this.actions.getUserPosts({ username: visitedUserId });
			}

			this.actions.setNavigationParams({
				screenName: SCREENS.UserProfile,
				params: { userId: visitedUserId, origin: origin ? origin : TABS.Feed },
			});
			this.props.navigation.navigate(SCREENS.UserProfile);
		}
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

	private onViewImageHandler = (media: IMediaProps[], index: number, post?: IWallPostData) => {
		this.actions.setNavigationParams({
			screenName: SCREENS.MediaViewer,
			params: {
				media,
				startIndex: index,
				post,
			},
		});
		this.props.navigation.navigate(SCREENS.MediaViewer);
	};
}
