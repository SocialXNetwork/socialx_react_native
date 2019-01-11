import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

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
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) =>
					children({
						data: {},
						actions: { getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
