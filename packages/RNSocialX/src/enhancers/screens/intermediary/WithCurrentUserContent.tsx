import * as React from 'react';

import {
	ICurrentUser,
	IMediaProps,
	MediaTypeImage,
	MediaTypeVideo,
} from '../../../types';

import { WithConfig } from '../../connectors/app/WithConfig';
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
			<WithConfig>
				{(configProps) => (
					<WithPosts>
						{(postsProps) => (
							<WithCurrentUser>
								{(currentUserProps) => {
									const { posts } = postsProps;
									const user = currentUserProps.currentUser;

									const sortedPosts = posts.sort(
										(x: any, y: any) => y.timestamp - x.timestamp,
									);

									if (user) {
										user.numberOfLikes = posts.reduce(
											(acc, post) => acc + post.likes.length,
											0,
										);
										user.numberOfPhotos = posts.reduce(
											(acc, post) => (post.media ? acc + post.media.length : 0),
											0,
										);
										user.numberOfComments = posts.reduce(
											(acc, post) => acc + post.comments.length,
											0,
										);
										user.mediaObjects = posts.reduce(
											(acc: IMediaProps[], post) =>
												post.media
													? acc.concat(
															post.media.map((media) => ({
																url:
																	configProps.appConfig.ipfsConfig.ipfs_URL +
																	media.hash,
																hash: media.hash,
																type:
																	media.type.name === 'Photo'
																		? MediaTypeImage
																		: MediaTypeVideo,
																extension: media.extension,
																size: media.size,
																numberOfLikes: post.likes.length,
																numberOfComments: post.comments.length,
															})),
													  ) // tslint:disable-line indent (tslint bug!!!)
													: [...acc],
											[],
										);
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
				)}
			</WithConfig>
		);
	}
}
