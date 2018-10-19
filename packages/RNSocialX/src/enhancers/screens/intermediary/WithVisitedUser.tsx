import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { Images } from '../../../environment/theme';
import { IVisitedUser, SearchResultKind } from '../../../types';

import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithProfiles } from '../../connectors/data/WithProfiles';

const USER_AVATAR_PLACEHOLDER = Images.user_avatar_placeholder;

interface IWithVisitedUserProps {
	children({
		visitedUser,
	}: {
		visitedUser: IVisitedUser | undefined;
	}): JSX.Element;
}

interface IWithVisitedUserState {}

export class WithVisitedUser extends React.Component<
	IWithVisitedUserProps,
	IWithVisitedUserState
> {
	render() {
		return (
			<WithNavigationParams>
				{(navigationProps) => (
					<WithProfiles>
						{({ profiles }) => {
							const { navigationParams } = navigationProps;
							const { userId } = navigationParams[SCREENS.UserProfile];

							const foundProfile = profiles.find(
								(profile) => profile.alias === userId,
							);

							let visitedUser;
							if (foundProfile) {
								visitedUser = {
									userId: foundProfile!.alias,
									fullName: foundProfile.fullName,
									userName: foundProfile!.alias,
									avatarURL:
										foundProfile.avatar.length > 0
											? foundProfile.avatar
											: USER_AVATAR_PLACEHOLDER,
									aboutMeText: foundProfile.aboutMeText,
									numberOfLikes: 0,
									numberOfPhotos: 0,
									numberOfFriends: foundProfile.friends.length,
									numberOfComments: 0,
									mediaObjects: [],
									recentPosts: [],
									relationship: SearchResultKind.NotFriend,
								};
							}

							return this.props.children({
								visitedUser,
							});
						}}
					</WithProfiles>
				)}
			</WithNavigationParams>
		);
	}
}
