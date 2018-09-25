import React from 'react';

import {SuggestedSearches} from '../../../components';
import {suggestedItems} from '../../../mocks';
import {ISearchResultData} from '../../../types';

const mock = {
	data: {
		suggestedItems,
	},
};

interface ITopTabProps {
	items: ISearchResultData[];
}

export const TopTab: React.SFC<ITopTabProps> = () => <SuggestedSearches items={mock.data.suggestedItems} />;
