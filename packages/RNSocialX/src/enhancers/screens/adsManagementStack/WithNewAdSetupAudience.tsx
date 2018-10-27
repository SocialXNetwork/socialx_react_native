import * as React from 'react';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithNewAdSetupAudienceEnhancedProps = {
	data: {},
	actions: {
		getText: (value, ...args) => value,
	},
};

export interface IWithNewAdSetupAudienceEnhancedData {}

export interface IWithNewAdSetupAudienceEnhancedActions extends ITranslatedProps {}

interface IWithNewAdSetupAudienceEnhancedProps {
	data: IWithNewAdSetupAudienceEnhancedData;
	actions: IWithNewAdSetupAudienceEnhancedActions;
}

interface IWithNewAdSetupAudienceProps {
	children(props: IWithNewAdSetupAudienceEnhancedProps): JSX.Element;
}

interface IWithNewAdSetupAudienceState {}

export class WithNewAdSetupAudience extends React.Component<
	IWithNewAdSetupAudienceProps,
	IWithNewAdSetupAudienceState
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
