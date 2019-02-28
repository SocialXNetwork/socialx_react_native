import React from 'react';

import { ICurrentUser } from '../../types';

import { WithAuth } from '../connectors/auth/WithAuth';
import { WithProfiles } from '../connectors/data/WithProfiles';

interface IWithCurrentUserProps {
	children({ currentUser }: { currentUser: ICurrentUser }): JSX.Element;
}

interface IWithCurrentUserState {}

export class WithCurrentUser extends React.Component<IWithCurrentUserProps, IWithCurrentUserState> {
	render() {
		return (
			<WithAuth>
				{({ auth }) => (
					<WithProfiles>
						{({ profiles }) => {
							let currentUser: ICurrentUser;

							if (auth && Object.keys(profiles).length > 0) {
								const profile = profiles[auth.alias!];

								currentUser = {
									alias: profile.alias,
									email: profile.email,
									pub: profile.pub,
									fullName: profile.fullName,
									avatar: profile.avatar,
									description: profile.aboutMeText === 'about me text' ? '' : profile.aboutMeText,
									numberOfFriends: profile.numberOfFriends,
									numberOfLikes: 0,
									numberOfPhotos: 0,
									numberOfComments: 0,
									media: [],
									postIds: [],
									miningEnabled: profile.miningEnabled,
									shareDataEnabled: false,
								};
							} else {
								const profile = profiles.hackerman;

								currentUser = {
									alias: profile.alias,
									email: profile.email,
									pub: profile.pub,
									fullName: profile.fullName,
									avatar: profile.avatar,
									description: profile.aboutMeText === 'about me text' ? '' : profile.aboutMeText,
									numberOfFriends: profile.numberOfFriends,
									numberOfLikes: 0,
									numberOfPhotos: 0,
									numberOfComments: 0,
									media: [],
									postIds: [],
									miningEnabled: profile.miningEnabled,
									shareDataEnabled: false,
								};
							}

							return this.props.children({
								currentUser,
							});
						}}
					</WithProfiles>
				)}
			</WithAuth>
		);
	}
}
