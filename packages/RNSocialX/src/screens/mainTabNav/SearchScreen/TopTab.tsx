import React from 'react';

import {SuggestedUserCard} from '../../../components';
import {suggestedItems} from '../../../mocks';

interface ITopTabProps {
	items: object[];
}

export const TopTab: React.SFC<ITopTabProps> = () => <SuggestedUserCard items={suggestedItems} />;
