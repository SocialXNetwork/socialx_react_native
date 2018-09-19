/**
 * TODO list:
 * 1. Props data: none :)
 * 2. Props actions: getText
 */

import * as React from 'react';

import {ITranslatedProps} from '../../../types';

const mock: IWithMaintenanceEnhancedProps = {
	data: {},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithMaintenanceEnhancedData {}

export interface IWithMaintenanceEnhancedActions extends ITranslatedProps {}

interface IWithMaintenanceEnhancedProps {
	data: IWithMaintenanceEnhancedData;
	actions: IWithMaintenanceEnhancedActions;
}

interface IWithMaintenanceProps {
	children(props: IWithMaintenanceEnhancedProps): JSX.Element;
}

interface IWithMaintenanceState {}

export class WithMaintenance extends React.Component<IWithMaintenanceProps, IWithMaintenanceState> {
	render() {
		const {children} = this.props;
		return children({data: mock.data, actions: mock.actions});
	}
}
