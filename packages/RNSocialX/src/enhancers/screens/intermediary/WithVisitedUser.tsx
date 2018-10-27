import * as React from 'react';

import { SCREENS, TABS } from '../../../environment/consts';
import { IVisitedUser, SearchResultKind } from '../../../types';

import { IProfileData } from '@socialx/api-data';
import { WithAggregations } from '../../connectors/aggregations/WithAggregations';
import { WithConfig } from '../../connectors/app/WithConfig';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithProfiles } from '../../connectors/data/WithProfiles';

interface IWithVisitedUserProps {
	children({ visitedUser }: { visitedUser: IVisitedUser | any }): JSX.Element;
}

interface IWithVisitedUserState {}

export class WithVisitedUser extends React.Component<IWithVisitedUserProps, IWithVisitedUserState> {
	render() {
		return (
			<WithNavigationParams>
				{(navigationProps) => (
					<WithConfig>
						{({ appConfig }) => (
							<WithProfiles>
								{({ profiles }) => (
									<WithAggregations>
										{({ searchResults }) => {
											const { navigationParams } = navigationProps;
											const { userId, origin } = navigationParams[SCREENS.UserProfile];

											let foundProfile: IProfileData | undefined;
											if (origin === TABS.Feed) {
												foundProfile = profiles.find((profile) => profile.alias === userId);
											} else if (origin === TABS.Search) {
												foundProfile = searchResults.find((profile) => profile.alias === userId);
											}
											// @Alex lets talk over this?
											// @Jake fixed this

											let visitedUser = {};
											if (foundProfile) {
												visitedUser = {
													userId: foundProfile!.alias,
													fullName: foundProfile.fullName,
													userName: foundProfile!.alias,
													avatarURL:
														foundProfile.avatar.length > 0
															? appConfig.ipfsConfig.ipfs_URL +
											  				  foundProfile.avatar // tslint:disable-line
															: '',
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
									</WithAggregations>
								)}
							</WithProfiles>
						)}
					</WithConfig>
				)}
			</WithNavigationParams>
		);
	}
}
