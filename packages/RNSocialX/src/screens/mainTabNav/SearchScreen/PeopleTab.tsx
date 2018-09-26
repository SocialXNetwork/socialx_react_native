import React from 'react';

import { WithSearch } from '../../../enhancers/screens';
import { INavigationProps, SearchTabs } from '../../../types';
import { Screen } from './SearchScreen';

export const PeopleTab = (navProps: INavigationProps) => (
	<WithSearch>
		{({ data, actions }) => (
			<Screen tab={SearchTabs.People} {...navProps} {...data} {...actions} />
		)}
	</WithSearch>
);
