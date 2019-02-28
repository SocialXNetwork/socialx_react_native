import * as React from 'react';

import { IMediaOverlay } from '../../store/ui/overlays';
import { IDictionary } from '../../types';

import { WithI18n } from '../connectors/app/WithI18n';
import { WithAuth } from '../connectors/auth/WithAuth';
import { WithPosts } from '../connectors/data/WithPosts';
import { WithOverlays } from '../connectors/ui/WithOverlays';

export interface IWithMediaOverlayEnhancedData extends IDictionary {
	media: IMediaOverlay;
	likedByCurrentUser: boolean;
}

export interface IWithMediaOverlayEnhancedActions {
	hideMedia: () => void;
}

interface IWithMediaOverlayEnhancedProps {
	data: IWithMediaOverlayEnhancedData;
	actions: IWithMediaOverlayEnhancedActions;
}

interface IWithMediaOverlayProps {
	children(props: IWithMediaOverlayEnhancedProps): JSX.Element;
}

interface IWithMediaOverlayState {}

export class WithMediaOverlay extends React.Component<
	IWithMediaOverlayProps,
	IWithMediaOverlayState
> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithAuth>
						{({ auth }) => (
							<WithOverlays>
								{({ media, hideMedia }) => (
									<WithPosts>
										{({ all }) => {
											let likedByCurrentUser = false;

											if (media.postId && auth && auth.alias) {
												const post = all[media.postId];
												likedByCurrentUser = !!post.likes.byId[auth.alias];
											}

											return this.props.children({
												data: {
													media,
													likedByCurrentUser,
													dictionary,
												},
												actions: {
													hideMedia,
												},
											});
										}}
									</WithPosts>
								)}
							</WithOverlays>
						)}
					</WithAuth>
				)}
			</WithI18n>
		);
	}
}
