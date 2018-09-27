import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithMaintenanceEnhancedProps = {
	data: {},
	actions: {
		// This is now implemented with the WithI18n connector enhancer
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

export class WithMaintenance extends React.Component<
	IWithMaintenanceProps,
	IWithMaintenanceState
> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{({ getText }) =>
					children({
						data: mock.data,
						actions: { ...mock.actions, getText },
					})
				}
			</WithI18n>
		);
	}
}
