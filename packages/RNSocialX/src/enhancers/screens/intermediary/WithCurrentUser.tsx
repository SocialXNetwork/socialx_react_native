import * as React from 'react';

import { ICurrentUser } from '../../../types';

import { WithConfig } from '../../connectors/app/WithConfig';
import { WithAuth } from '../../connectors/auth/WithAuth';
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
			<WithConfig>
				{({ appConfig }) => (
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
														userId: auth.alias || '',
														email: foundProfile.email,
														fullName: foundProfile.fullName,
														userName: auth.alias || '',
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
				)}
			</WithConfig>
		);
	}
}
