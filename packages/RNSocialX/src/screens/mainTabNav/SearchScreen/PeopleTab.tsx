// TODO: @ionut @alex why is this getting mocks directly? and where is it being used anyway?
import * as React from 'react';

import {SuggestedUserCard} from '../../../components';
import {suggestedItems} from '../../../mocks';
import {ISuggestionCardItem} from '../../../types';

const mock = {
	data: {
		suggestedItems,
	},
};

interface IPeopleTabProps {
	items: ISuggestionCardItem[];
}

export const PeopleTab: React.SFC<IPeopleTabProps> = () => <SuggestedUserCard items={mock.data.suggestedItems} />;
