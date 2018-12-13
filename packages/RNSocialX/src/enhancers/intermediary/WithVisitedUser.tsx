import * as React from 'react';

import { SCREENS } from '../../environment/consts';
import { IVisitedUser } from '../../types';

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
						{({ profiles }) => {
							const { user } = navigationParams[SCREENS.UserProfile];
							const profile = profiles[user];

							const visitedUser = {
								userId: profile.alias,
								fullName: profile.fullName,
								userName: profile.alias,
								avatar: profile.avatar,
								description: profile.aboutMeText,
								numberOfFriends: profile.numberOfFriends,
								numberOfLikes: 0,
								numberOfPhotos: 0,
								numberOfComments: 0,
								media: [],
								postIds: [],
								status: profile.status,
							};

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
