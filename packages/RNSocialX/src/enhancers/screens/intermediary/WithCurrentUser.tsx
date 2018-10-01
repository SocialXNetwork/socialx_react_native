import * as React from 'react';

import { ICurrentUser } from '../../../types';

import { WithAuth } from '../../connectors/app/WithAuth';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithProfiles } from '../../connectors/data/WithProfiles';

interface IWithCurrentUserProps {
	children({
		currentUser,
	}: {
		currentUser: ICurrentUser | undefined;
	}): JSX.Element;
}

interface IWithCurrentUserState {}

export class WithCurrentUser extends React.Component<
	IWithCurrentUserProps,
	IWithCurrentUserState
> {
	render() {
		return (
			<WithAuth>
				{(authProps) => (
					<WithAccounts>
						{(accountsProps) => (
							<WithProfiles>
								{(profilesProps) => {
									const { auth } = authProps;
									const { profiles } = profilesProps;

									let currentUser;
									if (auth) {
										const foundProfile = profiles.find(
											(profile) => profile.pub === auth.pub,
										);

										if (foundProfile) {
											currentUser = {
												userId: auth.alias,
												email: foundProfile.email,
												fullName: foundProfile.fullName,
												userName: auth.alias,
												avatarURL: foundProfile.avatar,
												aboutMeText: foundProfile.aboutMeText,
												numberOfLikes: 0,
												numberOfPhotos: 0,
												numberOfFriends: foundProfile.friends.length,
												numberOfComments: 0,
												mediaObjects: [],
												recentPosts: [],
												miningEnabled: foundProfile.miningEnabled,
												pub: foundProfile.pub,
											};
										}
									}

									return this.props.children({
										currentUser,
									});
								}}
							</WithProfiles>
						)}
					</WithAccounts>
				)}
			</WithAuth>
		);
	}
}
