import * as React from 'react';

import {
	IWithMaintenanceEnhancedActions,
	IWithMaintenanceEnhancedData,
	WithMaintenance,
} from '../../enhancers/screens';
import { MaintenanceScreenView } from './MaintenanceScreen.view';

type IMaintenanceScreenProps = IWithMaintenanceEnhancedData &
	IWithMaintenanceEnhancedActions;

const Screen: React.SFC<IMaintenanceScreenProps> = ({ getText }) => (
	<MaintenanceScreenView getText={getText} />
);

export const MaintenanceScreen = () => (
	<WithMaintenance>
		{({ data, actions }) => <Screen {...data} {...actions} />}
	</WithMaintenance>
);
