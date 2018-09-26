import React from 'react';

import { WithSearch } from '../../../enhancers/screens';
import { INavigationProps, SearchTabs } from '../../../types';
import { Screen } from './SearchScreen';

export const TagsTab = (navProps: INavigationProps) => (
	<WithSearch>
		{({ data, actions }) => (
			<Screen tab={SearchTabs.Tags} {...navProps} {...data} {...actions} />
		)}
	</WithSearch>
);
