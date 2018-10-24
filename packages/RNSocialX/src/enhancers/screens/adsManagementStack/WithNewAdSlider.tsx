import * as React from 'react';

import { IDotsMenuProps, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithNewAdSliderEnhancedProps = {
	data: {},
	actions: {
		getText: (value, ...args) => value,
		showDotsMenuModal: (items) => undefined,
	},
};

export interface IWithNewAdSliderEnhancedData {}

export interface IWithNewAdSliderEnhancedActions
	extends ITranslatedProps,
		IDotsMenuProps {}

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
				{(i18nProps) =>
					children({
						data: mock.data,
						actions: { ...mock.actions, getText: i18nProps.getText },
					})
				}
			</WithI18n>
		);
	}
}
