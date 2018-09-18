import * as React from 'react';

import {ITranslatedProps} from '../../types';
import {MaintenanceScreenView} from './MaintenanceScreen.view';

interface IMaintenanceScreenProps extends ITranslatedProps {}

export const MaintenanceScreen: React.SFC<IMaintenanceScreenProps> = ({getText}) => (
	<MaintenanceScreenView getText={getText} />
);
