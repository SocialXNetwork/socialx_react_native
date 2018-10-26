/**
 * TODO list:
 * 1. Props data: Ad Data Object
 */

import * as React from 'react';

import { IAd, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithAdsManagementEditAdEnhancedProps = {
	data: {
		adData: {
			name: 'Any',
			url: 'https://placeimg.com/300/300/any',
			title: 'Lorem ipsum dolor 1',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipi. And some more text on first paragraph\n' +
				'Elit, sed do eiusmod tempor incididunt ut labore',
			id: '1',
			startDate: 'Mar 10, 2018',
			endDate: 'Apr 16, 2018',
			amount: '100',
			currency: 'SOCX',
			numberOfAds: '1',
		},
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithAdsManagementEditAdEnhancedData {
	adData: IAd;
}

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
