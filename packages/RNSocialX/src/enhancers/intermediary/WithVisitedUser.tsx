import * as React from 'react';

import { SCREENS } from '../../environment/consts';
import { INavigationProps, IVisitedUser } from '../../types';
import { extractMediaFromPosts } from '../helpers';

import { WithNavigationParams } from '../connectors/app/WithNavigationParams';
import { WithPosts } from '../connectors/data/WithPosts';
import { WithProfiles } from '../connectors/data/WithProfiles';

interface IWithVisitedUserProps extends INavigationProps {
	children({ visitedUser }: { visitedUser: IVisitedUser }): JSX.Element;
}

interface IWithVisitedUserState {}

export class WithVisitedUser extends React.Component<IWithVisitedUserProps, IWithVisitedUserState> {
	render() {
		return (
			<WithNavigationParams>
				{({ navigationParams }) => (
					<WithPosts>
						{({ all }) => (
							<WithProfiles>
								{({ profiles }) => {
									const { key } = this.props.navigation.state;
									const { user } = navigationParams[SCREENS.UserProfile][key];
									const profile = profiles[user];

									const postIds = profiles[user].posts;
									const posts = [];
									for (const id of postIds) {
										posts.push(all[id]);
									}

									const numberOfLikes: number = posts.reduce(
										(acc, post) => acc + post.likes.ids.length,
										0,
									);

									const numberOfPhotos: number = posts.reduce(
										(acc, post) => (post.media ? acc + post.media.length : 0),
										0,
									);

									const numberOfComments: number = posts.reduce(
										(acc, post) => acc + post.comments.length,
										0,
									);

									const visitedUser = {
										alias: profile.alias,
										fullName: profile.fullName,
										avatar: profile.avatar,
										description: profile.aboutMeText === 'about me text' ? '' : profile.aboutMeText,
										numberOfFriends: profile.numberOfFriends,
										numberOfLikes,
										numberOfPhotos,
										numberOfComments,
										media: extractMediaFromPosts(posts),
										postIds,
										status: profile.status,
									};

									return this.props.children({
										visitedUser,
									});
								}}
							</WithProfiles>
						)}
					</WithPosts>
				)}
			</WithNavigationParams>
		);
	}
}
