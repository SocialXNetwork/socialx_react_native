/**
 * TODO list:
 * 1. Props actions: onCreateAdSetBudget, showConfirmation
 */

import * as React from 'react';

import { IConfirmation } from '../../../store/ui/overlays';
import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';
import { WithOverlays } from '../../connectors/ui/WithOverlays';

const mock: IWithAdsManagementConfigBudgetEnhancedProps = {
	data: {},
	actions: {
		getText: (value: string, ...args: any[]) => value,
		onCreateAdSetBudget: (budgetConfig: IBudgetConfigData) => {
			/*
			 */
		},
		showConfirmation: (confirmation: IConfirmation) => {
			/*
            */
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
	showConfirmation: (confirmation: IConfirmation) => void;
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
			<WithOverlays>
				{(overlayProps) => (
					<WithI18n>
						{(i18nProps) =>
							this.props.children({
								data: {
									...mock.data,
								},
								actions: {
									...mock.actions,
									getText: i18nProps.getText,
									showConfirmation: overlayProps.showConfirmation,
								},
							})
						}
					</WithI18n>
				)}
			</WithOverlays>
		);
	}
}
