/**
 * TODO list:
 * 1. LATER - Action props: onLikePress
 */

import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IMediaProps, INavigationParamsActions, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';

export interface IWithMediaViewerEnhancedData {
	mediaObjects: IMediaProps[];
	startIndex: number;
	postId?: string;
}

export interface IWithMediaViewerEnhancedActions
	extends ITranslatedProps,
		INavigationParamsActions {
	onLikePress: () => void;
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
		const { children } = this.props;
		return (
			<WithNavigationParams>
				{(navigationParamsProps) => (
					<WithI18n>
						{(i18nProps) =>
							children({
								data: {
									mediaObjects:
										navigationParamsProps.navigationParams[SCREENS.MediaViewer].mediaObjects,
									startIndex:
										navigationParamsProps.navigationParams[SCREENS.MediaViewer].startIndex,
									postId: navigationParamsProps.navigationParams[SCREENS.MediaViewer].postId,
								},
								actions: {
									onLikePress: () => undefined,
									setNavigationParams: navigationParamsProps.setNavigationParams,
									getText: i18nProps.getText,
								},
							})
						}
					</WithI18n>
				)}
			</WithNavigationParams>
		);
	}
}
