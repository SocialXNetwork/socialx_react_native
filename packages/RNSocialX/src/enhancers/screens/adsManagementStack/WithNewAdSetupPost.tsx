import * as React from 'react';

import { IDotsMenuItem } from '../../../components';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithOverlays } from '../../connectors/ui/WithOverlays';

const mock: IWithNewAdSetupPostEnhancedProps = {
	data: {},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		showDotsMenuModal: (items: IDotsMenuItem[]) => {
			/**/
		},
	},
};

export interface IWithNewAdSetupPostEnhancedData {}

export interface IWithNewAdSetupPostEnhancedActions extends ITranslatedProps {
	showDotsMenuModal: (items: IDotsMenuItem[]) => void;
}

interface IWithNewAdSetupPostEnhancedProps {
	data: IWithNewAdSetupPostEnhancedData;
	actions: IWithNewAdSetupPostEnhancedActions;
}

interface IWithNewAdSetupPostProps {
	children(props: IWithNewAdSetupPostEnhancedProps): JSX.Element;
}

interface IWithNewAdSetupPostState {}

export class WithNewAdSetupPost extends React.Component<
	IWithNewAdSetupPostProps,
	IWithNewAdSetupPostState
> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithOverlays>
						{(overlayProps) =>
							children({
								data: {
									...mock.data,
								},
								actions: {
									...mock.actions,
									getText: i18nProps.getText,
									showDotsMenuModal: (items: IDotsMenuItem[]) =>
										overlayProps.showOptionsMenu({ items }),
								},
							})
						}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
