import React from 'react';

import {WithSearch} from '../../../enhancers/screens';
import {INavigationProps, SearchTabs} from '../../../types';
import {Screen} from './SearchScreen';

export const TopTab = (navProps: INavigationProps) => (
	<WithSearch>{({data, actions}) => <Screen tab={SearchTabs.Top} {...navProps} {...data} {...actions} />}</WithSearch>
);
