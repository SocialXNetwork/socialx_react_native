import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IMedia, ITranslatedProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithAuth } from '../../connectors/auth/WithAuth';
import { WithPosts } from '../../connectors/data/WithPosts';

export interface IWithMediaViewerEnhancedData {
	media: IMedia[];
	startIndex: number;
	likedByCurrentUser: boolean;
	postId?: string;
}

export interface IWithMediaViewerEnhancedActions extends ITranslatedProps {}

interface IWithMediaViewerEnhancedProps {
	data: IWithMediaViewerEnhancedData;
	actions: IWithMediaViewerEnhancedActions;
}

interface IWithMediaViewerProps {
	children(props: IWithMediaViewerEnhancedProps): JSX.Element;
}

interface IWithMediaViewerState {}

export class WithMediaViewer extends React.Component<IWithMediaViewerProps, IWithMediaViewerState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithNavigationParams>
						{({ navigationParams }) => (
							<WithAuth>
								{({ auth }) => (
									<WithPosts>
										{({ all }) => {
											const { media, startIndex, postId } = navigationParams[SCREENS.MediaViewer];

											let likedByCurrentUser = false;
											if (postId && auth && auth.alias) {
												const post = all[postId];
												likedByCurrentUser = !!post.likes.byId[auth.alias];
											}

											return this.props.children({
												data: {
													media,
													startIndex,
													likedByCurrentUser,
													postId,
												},
												actions: {
													getText,
												},
											});
										}}
									</WithPosts>
								)}
							</WithAuth>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
