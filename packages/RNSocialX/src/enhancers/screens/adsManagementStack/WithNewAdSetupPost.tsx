import * as React from 'react';

import { IDotsMenuProps, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithOverlays } from '../../connectors/ui/WithOverlays';

const mock: IWithNewAdSetupPostEnhancedProps = {
	data: {},
	actions: {
		getText: (value, ...args) => value,
		showDotsMenuModal: (items) => {
			/**/
		},
	},
};

export interface IWithNewAdSetupPostEnhancedData {}

export interface IWithNewAdSetupPostEnhancedActions extends ITranslatedProps, IDotsMenuProps {}

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
									showDotsMenuModal: (items) => overlayProps.showOptionsMenu({ items }),
								},
							})
						}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
