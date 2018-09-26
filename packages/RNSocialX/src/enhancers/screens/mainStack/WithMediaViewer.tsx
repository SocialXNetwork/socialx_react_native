/**
 * TODO list:
 * 1. Props data: none :)
 * 2. Props actions: getText
 */

import * as React from 'react';

import { ITranslatedProps } from '../../../types';

const mock: IWithMediaViewerEnhancedProps = {
	data: {},
	actions: {
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
		return children({ data: mock.data, actions: mock.actions });
	}
}
