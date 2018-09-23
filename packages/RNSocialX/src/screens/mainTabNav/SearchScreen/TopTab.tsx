// TODO: @ionut @alex why is this getting mocks directly? and where is it being used anyway?
import React from 'react';

import {SuggestedUserCard} from '../../../components';
import {suggestedItems} from '../../../mocks';
import {ISuggestionCardItem} from '../../../types';

const mock = {
	data: {
		suggestedItems,
	},
};

interface ITopTabProps {
	items: ISuggestionCardItem[];
}

export const TopTab: React.SFC<ITopTabProps> = () => <SuggestedUserCard items={mock.data.suggestedItems} />;
