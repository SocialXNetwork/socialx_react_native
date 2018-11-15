import * as React from 'react';

import { IApplicationConfig } from '../../../store/app/config/Types';
import { IGlobal, ITranslatedProps } from '../../../types';

import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';

export interface IWithManageCountriesEnhancedData {
	appConfig: IApplicationConfig;
}

export interface IWithManageCountriesEnhancedActions extends ITranslatedProps {
	onSaveCountries: (countriesList: string[]) => void;
}

interface IWithManageCountriesEnhancedProps {
	data: IWithManageCountriesEnhancedData;
	actions: IWithManageCountriesEnhancedActions;
}

interface IWithManageCountriesProps {
	children(props: IWithManageCountriesEnhancedProps): JSX.Element;
}

export class WithManageCountries extends React.Component<IWithManageCountriesProps> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithConfig>
						{({ appConfig }) =>
							this.props.children({
								data: {
									appConfig,
								},
								actions: {
									onSaveCountries: (countriesList) => undefined,
									getText,
								},
							})
						}
					</WithConfig>
				)}
			</WithI18n>
		);
	}
}
