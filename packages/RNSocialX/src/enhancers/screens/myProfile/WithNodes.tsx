import * as React from 'react';

import { IApplicationConfig, ISetCustomGunSuperPeersInput } from '../../../store/app/config/Types';
import { IGlobal, ITranslatedProps } from '../../../types';

import { WithConfig } from '../../connectors/app/WithConfig';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithGlobals } from '../../connectors/ui/WithGlobals';

export interface IWithNodesEnhancedData {
	appConfig: IApplicationConfig;
}

export interface IWithNodesEnhancedActions extends ITranslatedProps {
	onSaveNodes: (nodes: string[]) => void;
}

interface IWithNodesEnhancedProps {
	data: IWithNodesEnhancedData;
	actions: IWithNodesEnhancedActions;
}

interface IWithNodesProps {
	children(props: IWithNodesEnhancedProps): JSX.Element;
}

interface IWithNodesState {}

export class WithNodes extends React.Component<IWithNodesProps, IWithNodesState> {
	render() {
		return (
			<WithI18n>
				{({ getText }) => (
					<WithConfig>
						{({ appConfig, setCustomGunSuperPeers }) =>
							this.props.children({
								data: {
									appConfig,
								},
								actions: {
									onSaveNodes: async (nodes) => {
										await setCustomGunSuperPeers({
											customGunSuperPeers: nodes,
										});
									},
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
