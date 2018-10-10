import React from 'react';

import { WithSearch } from '../../../enhancers/screens';
import { ISearchTabResultsProps } from '../../../types';
import { SearchScreen } from './SearchScreen';

export const TopTab: React.SFC<ISearchTabResultsProps> = ({
	navigation,
	searchTermValue,
}) => (
	<WithSearch>
		{({ data, actions }) => (
			<SearchScreen
				searchTermValue={searchTermValue}
				navigation={navigation}
				{...data}
				{...actions}
			/>
		)}
	</WithSearch>
);
