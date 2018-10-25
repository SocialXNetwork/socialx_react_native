import * as React from 'react';

import { IConfirmation } from '../../../store/ui/overlays';
import { IDotsMenuProps, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithOverlays } from '../../connectors/ui/WithOverlays';

const mock: IWithNewAdSliderEnhancedProps = {
	data: {},
	actions: {
		getText: (value, ...args) => value,
		showDotsMenuModal: (items) => undefined,
		showConfirmation: (confirmation: IConfirmation) => undefined,
	},
};

export interface IWithNewAdSliderEnhancedData {}

export interface IWithNewAdSliderEnhancedActions
	extends ITranslatedProps,
		IDotsMenuProps {
	showConfirmation: (confirmation: IConfirmation) => void;
}

interface IWithNewAdSliderEnhancedProps {
	data: IWithNewAdSliderEnhancedData;
	actions: IWithNewAdSliderEnhancedActions;
}

interface IWithNewAdSliderProps {
	children(props: IWithNewAdSliderEnhancedProps): JSX.Element;
}

interface IWithNewAdSliderState {}

export class WithNewAdSlider extends React.Component<
	IWithNewAdSliderProps,
	IWithNewAdSliderState
> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{(i18nProps) => (
					<WithOverlays>
						{(overlayProps) =>
							children({
								data: { ...mock.data },
								actions: {
									...mock.actions,
									getText: i18nProps.getText,
									showDotsMenuModal: (items) =>
										overlayProps.showOptionsMenu({ items }),
									showConfirmation: overlayProps.showConfirmation,
								},
							})
						}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
