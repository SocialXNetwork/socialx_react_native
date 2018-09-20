import * as React from 'react';

import {SuggestedUserCard} from '../../../components';
import {suggestedItems} from '../../../mocks';

interface IPeopleTabProps {
	items: object[];
}

export const PeopleTab: React.SFC<IPeopleTabProps> = () => <SuggestedUserCard items={suggestedItems} />;
