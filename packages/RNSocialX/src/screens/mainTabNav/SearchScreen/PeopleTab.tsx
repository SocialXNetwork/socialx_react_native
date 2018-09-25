import * as React from 'react';

import {SuggestedSearches} from '../../../components';
import {suggestedItems} from '../../../mocks';
import {ISearchResultData} from '../../../types';

const mock = {
	data: {
		suggestedItems,
	},
};

interface IPeopleTabProps {
	items: ISearchResultData[];
}

export const PeopleTab: React.SFC<IPeopleTabProps> = () => <SuggestedSearches items={mock.data.suggestedItems} />;
