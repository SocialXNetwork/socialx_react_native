/**
 * TODO list:
 * 1. Props actions: createAd
 */

import * as React from 'react';

import {
	IAdSetupAudienceData,
	IAdSetupBudgetData,
	IAdSetupPostData,
	IOptionsMenuProps,
	ITranslatedProps,
} from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithOverlays } from '../../connectors/ui/WithOverlays';

const mock: IWithNewAdSliderEnhancedProps = {
	data: {},
	actions: {
		getText: (value, ...args) => value,
		showOptionsMenu: () => undefined,
		showConfirmation: () => undefined,
		createAd: (
			postData: IAdSetupPostData,
			audienceData: IAdSetupAudienceData,
			budgetData: IAdSetupBudgetData,
		) => {
			console.log('postData', postData);
			console.log('audienceData', audienceData);
			console.log('budgetData', budgetData);
		},
	},
};

export interface IWithNewAdSliderEnhancedData {}

export interface IWithNewAdSliderEnhancedActions extends ITranslatedProps, IOptionsMenuProps {
	showConfirmation: () => void;
	createAd: (
		postData: IAdSetupPostData,
		audienceData: IAdSetupAudienceData,
		budgetData: IAdSetupBudgetData,
	) => void;
}

interface IWithNewAdSliderEnhancedProps {
	data: IWithNewAdSliderEnhancedData;
	actions: IWithNewAdSliderEnhancedActions;
}

interface IWithNewAdSliderProps {
	children(props: IWithNewAdSliderEnhancedProps): JSX.Element;
}

interface IWithNewAdSliderState {}

export class WithNewAdSlider extends React.Component<IWithNewAdSliderProps, IWithNewAdSliderState> {
	render() {
		const { children } = this.props;
		return (
			<WithI18n>
				{({ getText }) => (
					<WithOverlays>
						{({ showOptionsMenu }) =>
							children({
								data: {},
								actions: {
									...mock.actions,
									showOptionsMenu,
									showConfirmation: () => undefined,
									getText,
								},
							})
						}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
