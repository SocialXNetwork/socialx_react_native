import * as React from 'react';

import { ICurrentUser } from '../../../types';

import { WithConfig } from '../../connectors/app/WithConfig';
import { WithAuth } from '../../connectors/auth/WithAuth';
import { WithProfiles } from '../../connectors/data/WithProfiles';

interface IWithCurrentUserProps {
	children({ currentUser }: { currentUser: ICurrentUser | any }): JSX.Element;
}

interface IWithCurrentUserState {}

export class WithCurrentUser extends React.Component<IWithCurrentUserProps, IWithCurrentUserState> {
	render() {
		return (
			<WithConfig>
				{({ appConfig }) => (
					<WithAuth>
						{({ auth }) => (
							<WithProfiles>
								{({ profiles }) => {
									let currentUser;
									if (auth && profiles.length > 0) {
										const foundProfile = profiles.find((profile) => profile.alias === auth.alias);

										if (foundProfile) {
											currentUser = {
												userId: foundProfile.alias,
												email: foundProfile.email,
												fullName: foundProfile.fullName,
												userName: foundProfile.alias,
												avatar:
													foundProfile.avatar.length > 0
														? appConfig.ipfsConfig.ipfs_URL +
													  foundProfile.avatar // tslint:disable-line
														: '',
												description: foundProfile.aboutMeText,
												numberOfFriends: foundProfile.numberOfFriends,
												numberOfLikes: 0,
												numberOfPhotos: 0,
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
					</WithAuth>
				)}
			</WithConfig>
		);
	}
}
