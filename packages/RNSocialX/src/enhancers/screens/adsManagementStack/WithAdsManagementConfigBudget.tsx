import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithAdsManagementConfigBudgetEnhancedProps = {
	data: {},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		onCreateAdSetBudget: (budgetConfig: IBudgetConfigData) => {
			/* */
		},
	},
};

interface IBudgetConfigData {
	currency: string;
	budget: number;
	perDay: boolean;
	lifetime: boolean;
	runAdContinuously: boolean;
	start: string;
	stop: string;
}

export interface IWithAdsManagementConfigBudgetEnhancedData {}

export interface IWithAdsManagementConfigBudgetEnhancedActions
	extends ITranslatedProps {
	onCreateAdSetBudget: (budgetConfig: IBudgetConfigData) => void;
}

interface IWithAdsManagementConfigBudgetEnhancedProps {
	data: IWithAdsManagementConfigBudgetEnhancedData;
	actions: IWithAdsManagementConfigBudgetEnhancedActions;
}

interface IWithAdsManagementConfigBudgetProps {
	children(props: IWithAdsManagementConfigBudgetEnhancedProps): JSX.Element;
}

interface IWithAdsManagementConfigBudgetState {}

export class WithAdsManagementConfigBudget extends React.Component<
	IWithAdsManagementConfigBudgetProps,
	IWithAdsManagementConfigBudgetState
> {
	render() {
		return (
			<WithI18n>
				{(i18nProps) =>
					this.props.children({
						data: {
							...mock.data,
						},
						actions: {
							...mock.actions,
							getText: i18nProps.getText,
						},
					})
				}
			</WithI18n>
		);
	}
}
