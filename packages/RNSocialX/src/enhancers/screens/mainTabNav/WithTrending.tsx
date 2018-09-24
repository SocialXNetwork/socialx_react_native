/**
 * TODO list:
 * 1. Props data: trendingCategoriesItems, trendingContentItems
 * 2. Props actions:
 */

import * as React from 'react';

import {trendingCategoriesItems, trendingContentItems} from '../../../mocks';
import {ITrendingCategoriesItem, ITrendingContentItem} from '../../../types';

const mock: IWithTrendingEnhancedProps = {
	data: {
		trendingCategoriesItems,
		trendingContentItems,
	},
};

export interface IWithTrendingEnhancedData {
	trendingCategoriesItems: ITrendingCategoriesItem[];
	trendingContentItems: ITrendingContentItem[];
}

interface IWithTrendingEnhancedProps {
	data: IWithTrendingEnhancedData;
}

interface IWithTrendingProps {
	children(props: IWithTrendingEnhancedProps): JSX.Element;
}

interface IWithTrendingState {}

export class WithTrending extends React.Component<IWithTrendingProps, IWithTrendingState> {
	render() {
		const {children} = this.props;
		return children({data: mock.data});
	}
}
