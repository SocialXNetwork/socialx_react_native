import * as React from 'react';

import { ICurrentUser } from '../../../types';

import { WithPosts } from '../../connectors/data/WithPosts';
import { WithCurrentUser } from './WithCurrentUser';

interface IWithCurrentUserContentProps {
	children({
		currentUser,
	}: {
		currentUser: ICurrentUser | undefined;
	}): JSX.Element;
}

interface IWithCurrentUserContentState {}

export class WithCurrentUserContent extends React.Component<
	IWithCurrentUserContentProps,
	IWithCurrentUserContentState
> {
	render() {
		return (
			<WithPosts>
				{(postsProp) => (
					<WithCurrentUser>
						{(currentUserProps) => {
							const { posts } = postsProp;
							const user = currentUserProps.currentUser;

							const sortedPosts = posts.sort(
								(x: any, y: any) => y.timestamp - x.timestamp,
							);

							if (user) {
								user.numberOfLikes = posts.likes.length;
								user.numberOfPhotos = posts.media.length;
								user.numberOfComments = posts.comments.length;
								user.mediaObjects = posts.media;
								user.recentPosts = sortedPosts.slice(0, 5);
								// user.recentsPosts =
							}

							return this.props.children({
								currentUser: user,
							});
						}}
					</WithCurrentUser>
				)}
			</WithPosts>
		);
	}
}
