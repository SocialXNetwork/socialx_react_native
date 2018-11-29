import * as React from 'react';

import { SCREENS, TABS } from '../../environment/consts';
import { IVisitedUser } from '../../types';

import { WithAggregations } from '../connectors/aggregations/WithAggregations';
import { WithNavigationParams } from '../connectors/app/WithNavigationParams';
import { WithProfiles } from '../connectors/data/WithProfiles';

interface IWithVisitedUserProps {
	children({ visitedUser }: { visitedUser: IVisitedUser }): JSX.Element;
}

interface IWithVisitedUserState {}

export class WithVisitedUser extends React.Component<IWithVisitedUserProps, IWithVisitedUserState> {
	render() {
		return (
			<WithNavigationParams>
				{({ navigationParams }) => (
					<WithProfiles>
						{({ profiles }) => (
							<WithAggregations>
								{({ searchResults }) => {
									const { userId, origin } = navigationParams[SCREENS.UserProfile];

									let foundProfile;
									if (origin === TABS.Feed) {
										foundProfile = profiles[userId];
									} else if (origin === TABS.Search) {
										foundProfile = searchResults.find((profile) => profile.alias === userId);
									}

									let visitedUser: IVisitedUser;
									if (foundProfile) {
										visitedUser = {
											userId: foundProfile.alias,
											fullName: foundProfile.fullName,
											userName: foundProfile.alias,
											avatar: foundProfile.avatar,
											description: foundProfile.aboutMeText,
											numberOfFriends: foundProfile.numberOfFriends,
											numberOfLikes: 0,
											numberOfPhotos: 0,
											numberOfComments: 0,
											media: [],
											recentPosts: [],
											relationship: foundProfile.status,
										};
									}

									return this.props.children({
										visitedUser: visitedUser!,
									});
								}}
							</WithAggregations>
						)}
					</WithProfiles>
				)}
			</WithNavigationParams>
		);
	}
}
