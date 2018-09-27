import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithMediaViewerEnhancedProps = {
	data: {},
	actions: {
		// This is now implemented with the WithI18n connector enhancer
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithMediaViewerEnhancedData {}

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
			<WithI18n>
				{(i18nProps) =>
					children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
