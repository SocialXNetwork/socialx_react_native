/**
 * TODO list:
 * 1. Props data: latest 3 transactions, total amount of SOCX that user has, weeklyData and monthlyData regarding Spent till now section
 */

import moment from 'moment';
import * as React from 'react';

import { ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithAdsManagementEditAdEnhancedProps = {
	data: {},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithAdsManagementEditAdEnhancedData {}

export interface IWithAdsManagementEditAdEnhancedActions
	extends ITranslatedProps {}

interface IWithAdsManagementEditAdEnhancedProps {
	data: IWithAdsManagementEditAdEnhancedData;
	actions: IWithAdsManagementEditAdEnhancedActions;
}

interface IWithAdsManagementEditAdProps {
	children(props: IWithAdsManagementEditAdEnhancedProps): JSX.Element;
}

interface IWithAdsManagementEditAdState {}

export class WithAdsManagementEditAd extends React.Component<
	IWithAdsManagementEditAdProps,
	IWithAdsManagementEditAdState
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
