import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IMediaProps, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';

const mock: IWithMediaViewerEnhancedProps = {
	data: {
		mediaObjects: [],
		startIndex: 1,
	},
	actions: {
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithMediaViewerEnhancedData {
	mediaObjects: IMediaProps[];
	startIndex: number;
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

export class WithMediaViewer extends React.Component<
	IWithMediaViewerProps,
	IWithMediaViewerState
> {
	render() {
		const { children } = this.props;
		return (
			<WithNavigationParams>
				{(navigationParamsProps) => (
					<WithI18n>
						{(i18nProps) =>
							children({
								data: {
									...mock.data,
									mediaObjects:
										navigationParamsProps.navigationParams[SCREENS.MediaViewer]
											.mediaObjects,
									startIndex:
										navigationParamsProps.navigationParams[SCREENS.MediaViewer]
											.startIndex,
								},
								actions: { ...mock.actions, getText: i18nProps.getText },
							})
						}
					</WithI18n>
				)}
			</WithNavigationParams>
		);
	}
}
