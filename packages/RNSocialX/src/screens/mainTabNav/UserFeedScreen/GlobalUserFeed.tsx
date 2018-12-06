import * as React from 'react';

import { WithUserFeed } from '../../../enhancers/screens';
import { FEED_TYPES } from '../../../environment/consts';
import { INavigationProps } from '../../../types';
import { Screen } from './UserFeedScreen';

export const GlobalUserFeed = ({ navigation }: INavigationProps) => (
	<WithUserFeed type={FEED_TYPES.GLOBAL}>
		{({ data, actions }) => (
			<Screen
				shareMessage="Share with the world what you think"
				feedType={FEED_TYPES.GLOBAL}
				navigation={navigation}
				{...data}
				{...actions}
			/>
		)}
	</WithUserFeed>
);
