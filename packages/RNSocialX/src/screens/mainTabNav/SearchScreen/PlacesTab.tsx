import React from 'react';

import {WithSearch} from '../../../enhancers/screens';
import {INavigationProps, SearchTabs} from '../../../types';
import {Screen} from './SearchScreen';

export const PlacesTab = (navProps: INavigationProps) => (
	<WithSearch>
		{({data, actions}) => <Screen tab={SearchTabs.Places} {...navProps} {...data} {...actions} />}
	</WithSearch>
);
