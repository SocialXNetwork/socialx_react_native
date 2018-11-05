import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import {
	IError,
	IMediaProps,
	INavigationParamsActions,
	ITranslatedProps,
	IWallPostData,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithActivities } from '../../connectors/ui/WithActivities';

export interface IWithMediaViewerEnhancedData {
	errors: IError[];
	mediaObjects: IMediaProps[];
	startIndex: number;
	post?: IWallPostData;
}

export interface IWithMediaViewerEnhancedActions extends ITranslatedProps {
	onLikePost: (likedByCurrentUser: boolean, postId: string) => void;
	onCommentsPress: (postId: IWallPostData, keyboardRaised: boolean) => void;
}

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
							<WithActivities>
								{({ errors }) =>
									this.props.children({
										data: {
											errors,
											mediaObjects: navigationParams[SCREENS.MediaViewer].mediaObjects,
											startIndex: navigationParams[SCREENS.MediaViewer].startIndex,
											post: navigationParams[SCREENS.MediaViewer].post,
										},
										actions: {
											getText,
										} as any,
									})
								}
							</WithActivities>
						)}
					</WithNavigationParams>
				)}
			</WithI18n>
		);
	}
}
