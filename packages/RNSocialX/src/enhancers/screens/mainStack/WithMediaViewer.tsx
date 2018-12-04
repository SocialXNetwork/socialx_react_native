import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IMedia, ITranslatedProps, IWallPost } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithDataShape } from '../../intermediary';

export interface IWithMediaViewerEnhancedData {
	media: IMedia[];
	startIndex: number;
	post: IWallPost | null;
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
							<WithPosts>
								{({ all }) => {
									const { media, startIndex, postId } = navigationParams[SCREENS.MediaViewer];

									return (
										<WithDataShape post={all[postId]}>
											{({ shapedPost }) =>
												this.props.children({
													data: {
														media,
														startIndex,
														post: shapedPost,
													},
													actions: {
														getText,
													},
												})
											}
										</WithDataShape>
									);
								}}
							</WithPosts>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
