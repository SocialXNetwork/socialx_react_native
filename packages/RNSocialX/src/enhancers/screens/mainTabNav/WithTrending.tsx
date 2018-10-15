/**
 * TODO list:
 * 1. Props data: trendingCategoriesItems, trendingContentItems
 * 2. Props actions:
 */

import * as React from 'react';

import { trendingCategoriesItems, trendingContentItems } from '../../../mocks';
import {
	ITranslatedProps,
	ITrendingCategoriesItem,
	ITrendingContentItem,
} from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';

const mock: IWithTrendingEnhancedProps = {
	data: {
		trendingCategoriesItems,
		trendingContentItems,
	},
	actions: {
		getText: (value: string, ...args: any[]) => value,
	},
};

export interface IWithTrendingEnhancedData {
	trendingCategoriesItems: ITrendingCategoriesItem[];
	trendingContentItems: ITrendingContentItem[];
}

export interface IWithTrendingEnhancedActions extends ITranslatedProps {}

interface IWithTrendingEnhancedProps {
	data: IWithTrendingEnhancedData;
	actions: IWithTrendingEnhancedActions;
}

interface IWithTrendingProps {
	children(props: IWithTrendingEnhancedProps): JSX.Element;
}

interface IWithTrendingState {}

export class WithTrending extends React.Component<
	IWithTrendingProps,
	IWithTrendingState
> {
	render() {
		return (
			<WithI18n>
				{({ getText }) =>
					this.props.children({
						data: mock.data,
						actions: {
							getText,
						},
					})
				}
			</WithI18n>
		);
	}
}
