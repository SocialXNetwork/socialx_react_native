import * as React from 'react';

import { WithUserFeed } from '../../../enhancers/screens';
import { FEED_TYPES } from '../../../environment/consts';
import { INavigationProps, Screen } from './UserFeedScreen';

export const GlobalUserFeed = ({ navigation }: INavigationProps) => (
	<WithUserFeed>
		{({ data, actions }) => (
			<Screen
				shareSectionPlaceholder={'Share with the world what you think'}
				feedType={FEED_TYPES.GLOBAL}
				navigation={navigation}
				{...data}
				{...actions}
			/>
		)}
	</WithUserFeed>
);
