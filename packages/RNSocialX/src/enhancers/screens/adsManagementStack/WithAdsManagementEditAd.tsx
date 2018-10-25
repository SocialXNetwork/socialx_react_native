/**
 * TODO list:
 * 1. Props data: Selected Ad Data Object
 */

import moment from 'moment';
import * as React from 'react';

import { IAd, ITranslatedProps } from '../../../types';
import { WithI18n } from '../../connectors/app/WithI18n';

const adData = {
	url: 'https://placeimg.com/300/300/any',
	title: 'Lorem ipsum dolor 1',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipi. And some more text on first paragraph\n' +
		'Elit, sed do eiusmod tempor incididunt ut labore',
	id: '1',
};

const mock: IWithAdsManagementEditAdEnhancedProps = {
	data: { adData },
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
